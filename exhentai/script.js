$(document).ready(function() {
    function ajax_progress(type, url, responseType, progress, success){
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                if(progress){
                    xhr.addEventListener("progress", progress, false);
                }
                if(responseType){
                    xhr.responseType = responseType;
                }
                return xhr;
            },
            type: type,
            url: url,
            success: success
        });
    }
    $("div#f1 div.filename").text("tags.json");
    $("div#f2 div.filename").text("kks.json");
    $("div#f3 div.filename").text("cache2.zip");
    $("div#f1 div.parse").text("0%");
    $("div#f2 div.parse").text("0%");
    $("div#f3 div.parse").text("0%");
    function tofs(size) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }
    ajax_progress("GET", "tags.json", null, function(e) {
        if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            if(percentComplete===1)$("div#f1 div.parse").text("50%");
            $("div#f1 div.download").text((percentComplete*100).toFixed(0)+"%");
            !$("div#f1 div.filesize").text()&&$("div#f1 div.filesize").text(tofs(e.total));
            $("div#f1").css({"background-position-y": (1-percentComplete)*-$("div#f1").height()});
        }
    }, function(tags){
        $("div#f1").css({"background-position-y": 0});
        $("div#f1 div.download").text("100%");
        $("div#f1 div.parse").text("100%");
        ajax_progress("GET", "kks.json", null, function(e) {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                if(percentComplete===1)$("div#f2 div.parse").text("50%");
                $("div#f2 div.download").text((percentComplete*100).toFixed(0)+"%");
                !$("div#f2 div.filesize").text()&&$("div#f2 div.filesize").text(tofs(e.total));
                $("div#f2").css({"background-position-y": (1-percentComplete)*-$("div#f2").height()});
            }
        }, function(kks){
            $("div#f2").css({"background-position-y": 0});
            $("div#f2 div.download").text("100%");
            $("div#f2 div.parse").text("100%");
            ajax_progress("GET", "cache2.zip", "arraybuffer", function(e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    if(percentComplete===1)$("div#f3 div.parse").text("25%");
                    $("div#f3 div.download").text((percentComplete*100).toFixed(0)+"%");
                    !$("div#f3 div.filesize").text()&&$("div#f3 div.filesize").text(tofs(e.total));
                    $("div#f3").css({"background-position-y": (1-percentComplete)*-$("div#f3").height()});
                }
            }, function(cache2){
                JSZip.loadAsync(cache2).then(function(zip){
                    zip.file("cache2.json").async("string").then(function(r){
                        $("div#f3 div.parse").text("50%");
                        let cache = JSON.parse(r);
                        $("div#f3 div.parse").text("75%");
                        let cache2 = {};
                        for(let fid of (window.location.search.indexOf("test")!==-1?Object.keys(cache).slice(0, 100):Object.keys(cache))){
                            let item = cache[fid];
                            let nitem = {};
                            for(let kk in item){
                                let vv = item[kk];
                                nitem[kks[kk]] = vv;
                            }
                            let ntags = [];
                            for(let tag of nitem["tags"]){
                                let t = tags[tag];
                                let tp = t.split(":");
                                if(tp[0]==="temp"){
                                    let nt = (nitem["category"]==="959"?"cosplayer":"artist")
                                    t = nt+t.slice(4);
                                    // tp[0] = nt;
                                }
                                ntags.push(t);
                            }
                            nitem["tags"] = ntags;
                            cache2[fid] = nitem;
                        }
                        // window.tagsp = tagsp;
                        tags = kks = cache = null;
                        $("div#f3 div.parse").text("100%");
                        $("div.progress[id]").remove();
                        main(cache2);
                    });
                });
            });
        });
    });
});
function main(r) {
    $(window).on("keydown", function(e){
        if(e.key === "Enter"){
            if($("#f_search").is(":focus")){
                e.preventDefault();
                e.stopPropagation();
                search_presubmit2();
            }
        }
    });
    let to;
    $("#f_search").on("blur", function(){
        $("#search_hint").hide();
    }).on("keyup", function(){
        clearTimeout(to);
        let _this = $(this);
        to = setTimeout(function(){
            let v = _this.val();
            let m = [];
            v = v.replace(/"(.*?)"/g, function(a,b,c,d){
                return b.replace(/ /g, "\u00a0");
            });
            v = v.replace(/[a-z]:"([^"]+)$/, function(a){
                return a.replace(/ /g, "\u00a0");
            });
            // console.log(encodeURI(v));
            let last = v.split(/ /g).pop().replace(/\u00a0/g, " ").split(":");
            if(last.length===2){
                let pv = last[0];
                let v2 = last.pop().split('"').pop();
                // console.log(pv, v2, tags_hint[pv]);
                if(pv in tags_hint){
                    for(let kw of tags_hint[pv]){
                        if(!v2||kw.indexOf(v2)===0){
                            m.push(kw);
                        }
                        if(m.length>20) break;
                    }
                }
            }
            else{
                if(v.match(/ $/)||!v){
                    m = kks.concat(kks2);
                }
            }
            // console.log(m);
            $("#search_hint").css({"top": _this.offset().top+_this.outerHeight(), "left": _this.offset().left}).empty()[m.length?"show":"hide"]();
            for(let kw of m){
                $("#search_hint").append("<div>"+kw+"</div>");
            }
        }, 500);
    });
    let kks = [
        "uploader",
        "expunged",
        "disowned",
        "removed"
    ];
    let kks2 = [
        "parody",
        "character",
        "female",
        "other",
        "cosplayer",
        "male",
        "group",
        "mixed",
        "artist",
        "language"
    ];
    let tags_hint2 = new Map();
    let tags_hint = {};
    for(let kk of kks.concat(kks2)){
        tags_hint[kk] = [];
    }
    for(let fid in r){
        let v = r[fid];
        let attr = "";
        v["title"] = $.unescape(v["title"]);
        for(let kk of kks){
            if(attr)
                attr += " ";
            let t = kk+":"+v[kk];
            attr += t;
            if(!tags_hint2.has(t)){
                tags_hint2.set(t, null);
                tags_hint[kk].push(v[kk]);
            }
        }
        for(let t of v["tags"]){
            if(attr)
                attr += " ";
            attr += t;
            tp = t.split(":");
            if(!tags_hint2.has(t)){
                tags_hint2.set(t, null);
                tags_hint[tp[0]].push(tp[1]);
            }
        }
        let id = Math.floor(parseInt(fid.split("/")[0])/1000);
        v["save_path"] = "hive/"+id+"/"+fid.replace("/", "_")+".zip";
        v["attr"] = attr;
        items.push(v);
    }
    tags_hint2.clear();
    window.tags_hint = tags_hint;
    init();
}
function init(){
    $("#f_search, #f_spf, #f_spt, #f_srdd").each(function(){
        this.removeAttribute("disabled");
    });
    $("div.itg.gld").empty();
    if(!("f_cats" in $.GET)){
        $.GET["f_cats"] = ["958"];
    }
    if(!("page" in $.GET)){
        $.GET["page"] = ["0"];
    }
    if(!("f_search" in $.GET)){
        $.GET["f_search"] = [""];
    }
    if(!("sort" in $.GET)){
        $.GET["sort"] = ["gid"];
    }
    if(!("order" in $.GET)){
        $.GET["order"] = ["desc"];
    }
    let [results, length] = do_search(25);
    do_show(results, length);
}
function do_search(ps){
    let kk_cfgs = [
        "gid",
        // "token",
        "first_gid",
        // "first_key",
        // "parent_gid",
        // "parent_key",
        // "category",
        "filecount",
        // "tags",
        "parody",
        "character",
        "female",
        "other",
        "cosplayer",
        "male",
        "group",
        "mixed",
        "artist",
        "language",
        // "title",
        // "title_jpn",
        "posted",
        "uploader",
        // "thumb",
        "filesize",
        "expunged",
        "rating",
        "disowned",
        "removed",
        // "dumped"
    ];
    let f_cats = parseInt($.GET["f_cats"][0])^1023;
    let en_cats = {};
    $(".itc div[id][data-disabled]").trigger("click");
    for(let cat in cat_map){
        let v = ((f_cats&(cat^1023))!==0?1:0);
        en_cats[cat] = v;
        if(!v) $("#cat_"+(cat^1023)).trigger("click");
    }
    let f_search;
    let conditions = [];
    let raw = $.GET["f_search"][0];
    let search_case = "search_case" in $.GET;
    $("input[name='search_case']").prop("checked", search_case);
    try{
        $("#f_search").val(raw);
        if(raw){
            raw = raw.replace(/"(.*?)"/g, function(a,b,c,d){
                return b.replace(/ /g, "\u00a0");
            });
            let has_cond = 0;
            for(let kk of kk_cfgs){
                if(raw.indexOf(kk+":")!==-1){
                    has_cond = 1;
                    break;
                }
            }
            if(has_cond){
                raw = raw.split(/ /g).map(function(e){return e.replace(/\u00a0/g, " ")});
                remain = [];
                for(let part of raw){
                    let m = 0;
                    for(let kk of kk_cfgs){
                        if(part.indexOf(kk+":")===0){
                            conditions.push(part);
                            m = 1;
                            break;
                        }
                    }
                    if(!m){
                        remain.push(part);
                    }
                }
                raw = remain.join("");
            }
            if(raw){
                if(search_case){
                    f_search = new RegExp(raw, "i");
                }
                else{
                    f_search = new RegExp(raw);
                }
            }
        }
    }
    catch(e){
        if(search_case){
            f_search = new RegExp(RegExp.escape(raw), "i");
        }
        else{
            f_search = new RegExp(RegExp.escape(raw));
        }
    }
    let page = parseInt($.GET["page"][0]);
    let results = [];
    console.log(conditions, f_search)
    for(let item of items){
        let matched = 0;
        for(let cat in en_cats){
            if(en_cats[cat]&&cat==item["category"]){
                matched = 1;
                break;
            }
        }
        if(!matched) continue;
        if(!conditions.every(function(e){
            return item["attr"].indexOf(e)!==-1;
        })) continue;
        if(f_search&&!f_search.test(item["title"])) continue;
        results.push(item);
    }
    let sort = $.GET["sort"][0];
    $("select#sort").val(sort);
    sort = sort==="gid"?0:1;
    let order = $.GET["order"][0];
    $("select#order").val(order);
    order = order==="asc"?0:1;
    let sorts = [[function(a, b){
        return a["gid"] - b["gid"];
    }, function(a, b){
        return b["gid"] - a["gid"];
    }], [function(a, b){
        return a["rating"] - b["rating"];
    }, function(a, b){
        return b["rating"] - a["rating"];
    }]];
    results.sort(sorts[sort][order]);
    return [results.slice(ps*page, ps*(page+1)), results.length];
}
function do_show(results, length){
    let last_page = Math.ceil(length/25);
    let cur_page = parseInt($.GET["page"][0]);
    let pages = [];
    for(let i=0;i<7;i++){
        if(cur_page+i<last_page-1){
            pages.push(cur_page+i);
        }
    }
    pages.push(last_page-1);
    let pagination_htmls = "";
    let get2 = JSON.parse(JSON.stringify($.GET));
    get2["page"][0] = cur_page-1;
    let href = $.param(get2);
    pagination_htmls += '<td'+(cur_page-1<0?' class="ptdd"':'')+'>'+(cur_page-1<0?'':'<a href="./?'+href+'">')+'&lt;'+(cur_page-1<0?'':'</a>')+'</td>';
    for(let page of pages){
        if(page===pages.slice(-1)[0]){
            pagination_htmls += pagination.replace(/<lastpage>/g, last_page).replace(/<lastpage_1>/g, last_page-1);
        }
        get2["page"][0] = page;
        href = $.param(get2);
        if(href) href = "?"+href;
        let is_cur_page = cur_page===page;
        pagination_htmls += '<td'+(is_cur_page?' class="ptds"':'')+'><a href="./'+href+'">'+(page+1)+'</a></td>';
    }
    get2["page"][0] = cur_page+1;
    href = $.param(get2);
    pagination_htmls += '<td'+(cur_page+1>=last_page?' class="ptdd"':'')+'>'+(cur_page+1>=last_page?'':'<a href="./?'+href+'">')+'&gt;'+(cur_page+1>=last_page?'':'</a>')+'</td>';
    $(".ptt tbody tr, .ptb tbody tr").html(pagination_htmls);
    let tds = $(".ptt tbody tr, .ptb tbody tr").find("td:not([onclick]):not([class])");
    tds = tds.add(tds.find("a"));
    tds.on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        window.history.pushState("./", "./", $(this).attr("href")?$(this).attr("href"):$(this).find("a").attr("href"));
    });
    $("p.ip").text(shownresults.replace(/<length>/g, length.toLocaleString()));
    let htmls = "";
    for(let r of results){
        let d = new Date(r["posted"]*1000);
        let dtstr = ("0" + d.getFullYear()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getDate() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        let ratingposx = 0;
        let ratingposy = -1;
        let ratinginit = 5;
        let rating10 = Math.round(r["rating"]/0.5);
        if(rating10%2===1){
            ratingposy -= 20;
            ratinginit = 4.5;
        }
        ratingposx = (rating10*0.5-ratinginit)*16;
        let catname = cat_map[r["category"]];
        let catcss = $(".itc div.cs:contains('"+catname+"')")[0].classList[1];
        htmls += template
            .replace(/<gid>/g, r["gid"])
            .replace(/<token>/g, r["token"])
            .replace(/<title>/g, r["title"])
            .replace(/<thumb>/g, r["thumb"])
            .replace(/<cat>/g, r["category"])
            .replace(/<catname>/g, catname)
            .replace(/<catcss>/g, catcss)
            .replace(/<posted>/g, dtstr)
            .replace(/<ratingposx>/g, ratingposx)
            .replace(/<ratingposy>/g, ratingposy)
        ;
    }
    $("div.itg.gld").html(htmls);
}
window.onpopstate = function(event) {
    $.init_GET();
    init();
}
window.history.pushState = (function(pushState){
    return function(a,b,c){
        pushState.apply(window.history, [a,b,c&&c.replace(/&(page=0|f_search=$|sort=gid|order=desc)/g, "").replace(/\?(page=0|f_search=&|f_search=$)/g, "?").replace(/&(page=0|f_search=)&/g, "&").replace(/&(page=0|f_search=$|sort=gid|order=desc)/g, "").replace(/\?(page=0|f_search=&|f_search=$)/g, "?").replace(/&(page=0|f_search=)&/g, "&")]);
        $.init_GET();
        init();
    }
})(window.history.pushState);
function search_presubmit2(){
    search_presubmit();
    let href = $("#searchbox form").serialize();
    if(href) href = "?"+href;
    window.history.pushState("./", "./", "./"+href);
}

function enable_jump_mode(a) {
    document.getElementById(a + "jumpbox").innerHTML = '<input type="text" name="jump" id="' + a + 'jump" size="10" maxlength="10" placeholder="date or offset" title="Enter a year or date in YYYY, (YY)YY-MM or (YY)YY-MM-DD format to seek to, or the number of days to jump backwards or forwards, or a number followed by w, m and y to jump weeks, months or years respectively." onchange="update_jump_mode(\'' + a + "')\" onkeyup=\"update_jump_mode('" + a + "')\" />";
    document.getElementById(a + "jump").focus();
    document.getElementById(a + "jumpbox").insertAdjacentHTML("beforeend", '\n<div class="jumppop stuffbox">\n\t<div>\n\t\t<button class="jumpdate">Use Date Selector</button>\n\t</div>\n\t<div>\n\t\t<input type="button" value="1d"/>\n\t\t<input type="button" value="3d"/>\n\t\t<input type="button" value="1w"/>\n\t\t<input type="button" value="2w"/>\n\t</div>\n\t<div>\n\t\t<input type="button" value="1m"/>\n\t\t<input type="button" value="6m"/>\n\t\t<input type="button" value="1y"/>\n\t\t<input type="button" value="2y"/>\n\t</div>\n\t<div>\n\t\t<button class="jumpclose">Close</button> &nbsp; <button class="jumpcancel">Cancel</button>\n\t</div>\n</div>');
    const b = document.querySelectorAll("#" + a + "jumpbox .jumppop input")
      , c = d=>{
        const e = document.querySelector("#" + a + "jump");
        d = d.target.getAttribute("value");
        e.value = d;
        e.dispatchEvent(new Event("change"))
    }
    ;
    Array.from(b).forEach(d=>d.addEventListener("click", c));
    document.querySelector("#" + a + "jumpbox .jumpdate").addEventListener("click", ()=>{
        const d = document.querySelector("#" + a + "jump");
        d.setAttribute("type", "date");
        d.setAttribute("title", "Set the date to seek from or to.");
        d.setAttribute("max", maxdate);
        d.setAttribute("min", mindate);
        Array.from(b).forEach(e=>e.setAttribute("disabled", ""));
        d.focus()
    }
    );
    document.querySelector("#" + a + "jumpbox .jumpclose").addEventListener("click", ()=>{
        document.querySelector("#" + a + "jumpbox .jumppop").style.display = "none"
    }
    );
    document.querySelector("#" + a + "jumpbox .jumpcancel").addEventListener("click", ()=>{
        document.querySelector("#" + a + "jumpbox").innerHTML = '<a id="' + a + 'jump" href="javascript:enable_jump_mode(\'' + a + "')\">Jump/Seek</a>";
        update_jump_mode(a)
    }
    )
}
const matchyear = /^\d{4}$/
  , matchseek = /^\d{2,4}-\d{1,2}/
  , matchjump = /^\d+($|d$|w$|m$|y$|-$)/;
function update_jump_mode(a) {
    console.log("updating jump");
    var b = document.getElementById(a + "jump").value
      , c = document.getElementById(a + "prev");
    a = document.getElementById(a + "next");
    var d = !1;
    void 0 != b && "" != b && (matchseek.test(b) || matchyear.test(b) && 2006 < parseInt(b) && 2100 > parseInt(b) ? (c.innerHTML = "&lt; Seek",
    a.innerHTML = "Seek &gt;",
    c.href = prevurl + "&seek=" + b,
    a.href = nexturl + "&seek=" + b,
    d = !0) : matchjump.test(b) && (c.innerHTML = "&lt; Jump",
    a.innerHTML = "Jump &gt;",
    c.href = prevurl + "&jump=" + b,
    a.href = nexturl + "&jump=" + b,
    d = !0));
    d || (c.innerHTML = "&lt; Prev",
    a.innerHTML = "Next &gt;",
    c.href = prevurl,
    a.href = nexturl)
}
function toggle_advsearch_pane(a) {
    "Hide Advanced Options" == a.innerHTML ? hide_advsearch_pane(a) : show_advsearch_pane(a)
}
function show_advsearch_pane(a) {
    var b = document.getElementById("advdiv");
    a.innerHTML = "Hide Advanced Options";
    b.style.display = "";
    b.innerHTML = '\n<input type="hidden" id="advsearch" name="advsearch" value="1" />\n<div class="searchadv">\n\t<div>\n\t\t<div><label class="lc"><input type="checkbox" name="f_sh" /><span></span> Browse Expunged Galleries</label></div>\n\t\t<div><label class="lc"><input type="checkbox" name="f_sto" /><span></span> Require Gallery Torrent</label></div>\n\t</div>\n\t<div>\n\t\t<div>Between <input type="text" id="f_spf" name="f_spf" size="4" maxlength="4" style="width:30px" /> and <input type="text" id="f_spt" name="f_spt" size="4" maxlength="4" style="width:30px" /> pages</div>\n\t\t<div>Minimum Rating: <select id="f_srdd" name="f_srdd"><option value="0">Any Rating</option><option value="2">2 Stars</option><option value="3">3 Stars</option><option value="4">4 Stars</option><option value="5">5 Stars</option></select></div>\n\t</div>\n\t<div>\n\t\t<div>Disable custom filters for:</div>\n\t\t<div><label class="lc"><input type="checkbox" name="f_sfl" /><span></span> Language</label></div>\n\t\t<div><label class="lc"><input type="checkbox" name="f_sfu" /><span></span> Uploader</label></div>\n\t\t<div><label class="lc"><input type="checkbox" name="f_sft" /><span></span> Tags</label></div>\n\t</div>\n</div>'
}
function hide_advsearch_pane(a) {
    var b = document.getElementById("advdiv");
    a.innerHTML = "Show Advanced Options";
    b.style.display = "none";
    b.innerHTML = ""
}
function toggle_filesearch_pane(a) {
    "Hide File Search" == a.innerHTML ? hide_filesearch_pane(a) : show_filesearch_pane(a)
}
function show_filesearch_pane(a) {
    var b = document.getElementById("fsdiv");
    a.innerHTML = "Hide File Search";
    b.style.display = "";
    b.innerHTML = '<form action="' + ulhost + 'image_lookup.php" method="post" enctype="multipart/form-data">\t<div>Select a file to upload, then hit File Search. All public galleries containing this exact file will be displayed.</div>\t<div><input type="file" name="sfile" size="40" /> <input type="submit" name="f_sfile" value="File Search" /></div>\t<div>For color images, the system can also perform a similarity lookup to find resampled images.</div>\t<div class="searchadv">\t\t<div>\t\t\t<div><label class="lc"><input type="checkbox" name="fs_similar" checked="checked" /><span></span> Use Similarity Scan</label></div>\t\t\t<div><label class="lc"><input type="checkbox" name="fs_covers" /><span></span> Only Search Covers</label></div>\t\t</div>\t</div></form>'
}
function hide_filesearch_pane(a) {
    var b = document.getElementById("fsdiv");
    a.innerHTML = "Show File Search";
    b.style.display = "none";
    b.innerHTML = ""
}
function load_pane_image(a) {
    if (void 0 != a) {
        a = a.childNodes[0].childNodes[0];
        var b = a.getAttribute("data-src");
        void 0 != b && (a.src = b,
        a.removeAttribute("data-src"))
    }
}
function preload_pane_image(a, b) {
    setTimeout(function() {
        0 < a && load_pane_image(document.getElementById("it" + a));
        0 < b && load_pane_image(document.getElementById("it" + b))
    }, 100)
}
var visible_pane = 0;
function show_image_pane(a) {
    0 < visible_pane && hide_image_pane(visible_pane);
    var b = document.getElementById("it" + a);
    load_pane_image(b);
    b.style.visibility = "visible";
    document.getElementById("ic" + a).style.visibility = "visible";
    visible_pane = a
}
function hide_image_pane(a) {
    document.getElementById("it" + a).style.visibility = "hidden";
    document.getElementById("ic" + a).style.visibility = "hidden";
    visible_pane = 0
}
function toggle_category(a) {
    var b = document.getElementById("f_cats")
      , c = document.getElementById("cat_" + a);
    b.getAttribute("disabled") && b.removeAttribute("disabled");
    c.getAttribute("data-disabled") ? (c.removeAttribute("data-disabled"),
    b.value = parseInt(b.value) & (1023 ^ a)) : (c.setAttribute("data-disabled", 1),
    b.value = parseInt(b.value) | a)
}
function search_presubmit() {
    var a = document.getElementById("f_search");
    a.value || a.setAttribute("disabled", 1);
    if (void 0 != document.getElementById("advsearch")) {
        a = document.getElementById("f_spf");
        var b = document.getElementById("f_spt")
          , c = document.getElementById("f_srdd");
        a.value && "0" != a.value || a.setAttribute("disabled", 1);
        b.value && "0" != b.value || b.setAttribute("disabled", 1);
        c.value && "0" != c.value || c.setAttribute("disabled", 1)
    }
}
function cancel_event(a) {
    a = a ? a : window.event;
    a.stopPropagation && a.stopPropagation();
    a.preventDefault && a.preventDefault();
    a.cancelBubble = !0;
    a.cancel = !0;
    return a.returnValue = !1
}
;
