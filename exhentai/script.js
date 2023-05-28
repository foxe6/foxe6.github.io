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
    $("body").css({"pointer-events":"none"});
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
    let base = "";"https://foxe6.github.io/exhentai/";
    let version = "?beta=0.0.1";
    ajax_progress("GET", base+"tags.json"+version, null, function(e) {
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
        ajax_progress("GET", base+"kks.json"+version, null, function(e) {
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
            ajax_progress("GET", base+"cache2.zip"+version, "arraybuffer", function(e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    if(percentComplete===1)$("div#f3 div.parse").text("50%");
                    $("div#f3 div.download").text((percentComplete*100).toFixed(0)+"%");
                    !$("div#f3 div.filesize").text()&&$("div#f3 div.filesize").text(tofs(e.total));
                    $("div#f3").css({"background-position-y": (1-percentComplete)*-$("div#f3").height()});
                }
            }, function(cache2){
                $("div.progress[id]").remove();
                let htmls = "";
                for(let i=0;i<25;i++)
                    htmls += template
                        .replace(/<fid>/g, "")
                        .replace(/<gid>/g, "")
                        .replace(/<token>/g, "")
                        .replace(/<title>/g, "Title")
                        .replace(/<thumb>/g, "")
                        .replace(/<cat>/g, "")
                        .replace(/<pages>/g, "?")
                        .replace(/<catname>/g, "Category")
                        .replace(/<catcss>/g, "ct1")
                        .replace(/<posted>/g, "YYYY-MM-DD HH:MM")
                        .replace(/<ratingposx>/g, "0")
                        .replace(/<ratingposy>/g, "0")
                    ;
                $("div.itg.gld").html(htmls);
                JSZip.loadAsync(cache2).then(function(zip){
                    zip.file("cache2.json").async("string").then(function(r){
                        let cache = JSON.parse(r);
                        main(cache, tags, kks);
                    });
                });
            });
        });
    });
});
function main(cache0, tags0, kks0) {
    $(window).on("keydown", function(e){
        if(e.key === "Enter"){
            if($("#f_search").is(":focus")||$("#exclude").is(":focus")){
                e.preventDefault();
                e.stopPropagation();
                search_presubmit2();
            }
        }
    });
    $("#slideshow").on("click", function(){
        let fs = [];
        let imgs = (window.current_r||[]).map(function(e){
            fs.push(0);
            return e["thumb"].replace("g_l.", "g_250.");
        });
        window.onpopstate=null;
        $.new_gallery_page("exhentai gallery", imgs, [], fs, null, window.location.pathname.indexOf("_test")===-1);
    });
    window.to=null;
    let mouseleave_e;
    $("#search_hint").on("mouseenter", function(){
        mouseleave_e = $(this);
        $("#f_search, #exclude").off("blur");
    }).on("mouseleave", function(){
        $("#f_search, #exclude").on("blur", function(){
            $("#search_hint").hide();
        });
        mouseleave_e.focus();
    });
    $("#f_search, #exclude").on("blur", function(){
        $("#search_hint").hide();
    }).on("keyup", function(e){
        if(e.key==="Enter")return;
        clearTimeout(window.to);
        let _this = $(this);
        window.to = setTimeout(function(){
            let parody;
            let v = _this.val();
            let r = v;
            let m = [];
            v = v.replace(/"(.*?)"/g, function(a,b,c,d){
                return b.replace(/ /g, "\u00a0");
            });
            v = v.replace(/[a-z]:"([^"]+)$/, function(a){
                return a.replace(/ /g, "\u00a0");
            });
            let word;
            // console.log(encodeURI(v));
            let last = v.split(/ /g);
            if(v.indexOf("parody:")!==-1&&v.indexOf("character:")!==-1){
                for(let llast of last){
                    if(llast.indexOf("parody:")===0){
                        let p = llast.replace(/\u00a0/g, " ").split(":").pop();
                        if(p in parody_character_relationship){
                            parody = p;
                            break;
                        }
                    }
                }
            }
            last = last.pop().replace(/\u00a0/g, " ").split(":");
            if(last.length===2){
                let pv = last[0];
                let v2 = last.pop().split('"').pop();
                word = v2;
                // console.log(pv, v2, tags_hint[pv]);
                if(pv in tags_hint){
                    for(let kw in tags_hint[pv]){
                        if(parody&&pv==="character"&&parody_character_relationship[parody].indexOf(kw)===-1){
                            continue;
                        }
                        if(!v2||kw.indexOf(v2)===0){
                            m.push([kw, tags_hint[pv][kw]]);
                        }
                    }
                    m = m.sort(function(a, b){
                        let r = b[1]-a[1];
                        if(r) return r;
                        return a[0].localeCompare(b[0]);
                    });//.slice(0, 20);
                }
            }
            else{
                if(v.match(/ $/)||!v){
                    m = kks.concat(kks2).sort(function(a, b){
                        return a[0].localeCompare(b[0]);
                    }).map(function(e){
                        return [e+":", 0];
                    });
                    word = v;
                }
                else{
                    let last = v.split(/ /g).pop();
                    for(let kk of kks.concat(kks2)){
                        if(kk.indexOf(last)===0){
                            m.push([kk+":", 0]);
                        }
                    }
                    word = last;
                }
            }
            $("#search_hint").css({"top": _this.offset().top+_this.outerHeight(), "left": _this.offset().left}).empty()[m.length?"show":"hide"]();
            if(m.length){
                for(let [kw, ct] of m){
                    $("#search_hint").append("<div data-kw='"+kw+"'>"+kw+(ct?" ("+ct+")":"")+"</div>");
                }
                $("#search_hint div").on("click", function(){
                    if(word){
                        let i=r.lastIndexOf(word);
                        if(i!==-1){
                            r = r.substring(0, i);
                        }
                    }
                    let kw = $(this).data("kw");
                    r = r.replace(/"$/,"");
                    if(kw.indexOf(" ")===-1){
                        r += kw;
                    }
                    else{
                        r += '"'+kw+'"';
                    }
                    // console.log(r);
                    _this.val(r).trigger("keyup");
                });
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
    let parody_character_relationship = {};
    window.temp_r = {};
    for(let kk of kks.concat(kks2)){
        tags_hint[kk] = {};
    }
    let fids = (window.location.search.indexOf("test")!==-1?Object.keys(cache0).slice(0, 100):Object.keys(cache0));
    let size = 1250;
    function job(i){
        let targets = fids.slice(i, i+size);
        if(!targets.length){
            next();
            return;
        }
        for(let fid of targets){
            let item = cache0[fid];
            let v = {};
            for(let kk in item){
                let vv = item[kk];
                v[kks0[kk]] = vv;
            }
            let ntags = [];
            for(let tag of v["tags"]){
                let t = tags0[tag];
                let tp = t.split(":");
                if(tp[0]==="temp"){
                    let nt = (v["category"]==="959"?"cosplayer":"artist")
                    t = nt+t.slice(4);
                    // tp[0] = nt;
                }
                ntags.push(t);
            }
            v["tags"] = ntags;
            let attr = "";
            if(v["title"].indexOf("&")!==-1){
                v["title"] = $.unescape(v["title"]);
            }
            v["title_jpn"] = v["title_jpn"]||"";
            if(v["title_jpn"].indexOf("&")!==-1){
                v["title_jpn"] = $.unescape(v["title_jpn"]);
            }
            for(let kk of kks){
                if(!(kk in v)){
                    continue;
                }
                if(attr)
                    attr += " ";
                let vv = v[kk];
                let t = kk+":"+vv;
                attr += t;
                if(!tags_hint2.has(t)){
                    tags_hint2.set(t, null);
                    tags_hint[kk][vv] = 0;
                }
                tags_hint[kk][vv] += 1;
            }
            let parody = [];
            let character = [];
            for(let t of v["tags"]){
                if(attr)
                    attr += " ";
                attr += t;
                tp = t.split(":");
                if(!tags_hint2.has(t)){
                    tags_hint2.set(t, null);
                    if(!(tp[0] in tags_hint))
                        tags_hint[tp[0]] = {};
                    tags_hint[tp[0]][tp[1]] = 0;
                }
                tags_hint[tp[0]][tp[1]] += 1;
                if(tp[0]==="parody"){
                    if(!(tp[1] in parody_character_relationship)){
                        parody_character_relationship[tp[1]] = new Map();
                    }
                    parody.push(tp[1]);
                }
                else if(tp[0]==="character"){
                    character.push(tp[1]);
                }
            }
            if(parody.length===1){
                for(let p of parody){
                    for(let c of character){
                        if(!parody_character_relationship[p].has(c)){
                            parody_character_relationship[p].set(c, null);
                        }
                    }
                }
            }
            v["attr"] = attr;
            v["fid"] = fid;
            items.push(v);
            window.temp_r[fid] = v;
        }
        setTimeout(function(){job(i+size)}, 1);
    }
    job(0);
    function next(){
        items.sort(function(a, b){
            return b["gid"]-a["gid"];
        });
        for(let i=items.length-1;i>=0;i--){
            if(items[i]["posted"]==="null"){
                if(i===items.length-1){
                    continue;
                }
                items[i]["posted"] = parseFloat(items[i+1]["posted"])+0.1;
            }
        }
        for(let k in parody_character_relationship){
            parody_character_relationship[k] = Array.from(parody_character_relationship[k].keys());
        }
        // console.debug(tags_hint);
        // console.debug(parody_character_relationship);
        tags_hint2.clear();
        init();
    }
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
    if(!("exclude" in $.GET)){
        $.GET["exclude"] = [""];
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
    let f_search, exclude;
    let conditions = [];
    let conditions_exclude = [];
    let raw = $.GET["f_search"][0];
    let raw_exclude = $.GET["exclude"][0];
    let search_case = "search_case" in $.GET;
    let match_any = "match_any" in $.GET;
    $("input[name='search_case']").prop("checked", search_case);
    $("input[name='match_any']").prop("checked", match_any);
    $("#f_search").val(raw);
    $("#exclude").val(raw_exclude);
    function parse(raw){
        let _regex;
        let _conds = [];
        try{
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
                                _conds.push(part);
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
                        _regex = new RegExp(raw, "i");
                    }
                    else{
                        _regex = new RegExp(raw);
                    }
                }
            }
        }
        catch(e){
            if(search_case){
                _regex = new RegExp(RegExp.escape(raw), "i");
            }
            else{
                _regex = new RegExp(RegExp.escape(raw));
            }
        }
        return [raw, _regex, _conds];
    }
    [raw, f_search, conditions] = parse(raw);
    [raw_exclude, exclude, conditions_exclude] = parse(raw_exclude);
    let page = parseInt($.GET["page"][0]);
    let results = [];
    console.log(conditions, f_search)
    console.log(conditions_exclude, exclude)
    let search = JSON.dumps($.GET).replace(/page":\["[0-9]+"\]/, 'page":["x"]');
    let dsearch = '{"f_cats":["958"],"page":["x"],"f_search":[""],"exclude":[""],"sort":["gid"],"order":["desc"]}';
    if(search===dsearch){
        results = items;
    }
    else if(window.psearch===search){
        results = window.current_r;
    }
    else{
        for(let item of items){
            let matched = 0;
            for(let cat in en_cats){
                if(en_cats[cat]&&cat==item["category"]){
                    matched = 1;
                    break;
                }
            }
            if(!matched) continue;
            if(conditions_exclude.length&&conditions_exclude[!match_any?"every":"some"](function(e){
                return item["attr"].indexOf(e)!==-1;
            })) continue;
            if(exclude&&(exclude.test(item["title"])||(item["title_jpn"].length?exclude.test(item["title_jpn"]):false))) continue;
            if(conditions.length&&!conditions[!match_any?"every":"some"](function(e){
                return item["attr"].indexOf(e)!==-1;
            })) continue;
            if(f_search&&(!f_search.test(item["title"])&&(item["title_jpn"].length?!f_search.test(item["title_jpn"]):true))) continue;
            results.push(item);
        }
    }
    let sort = $.GET["sort"][0];
    $("select#sort").val(sort);
    switch(sort){
        case "gid":
            sort = 0;
            break;
        case "rating":
            sort = 1;
            break;
        case "filecount":
            sort = 2;
            break;
        case "filesize":
            sort = 3;
            break;
        default:
            sort = 0;
            break;
    }
    let order = $.GET["order"][0];
    $("select#order").val(order);
    order = order==="asc"?0:1;
    let sorts = [[function(a, b){
        return a["gid"] - b["gid"];
    }, null], [function(a, b){
        return a["rating"] - b["rating"];
    }, function(a, b){
        return b["rating"] - a["rating"];
    }], [function(a, b){
        return a["filecount"] - b["filecount"];
    }, function(a, b){
        return b["filecount"] - a["filecount"];
    }], [function(a, b){
        return a["filesize"] - b["filesize"];
    }, function(a, b){
        return b["filesize"] - a["filesize"];
    }]];
    let f = sorts[sort][order];
    f&&results.sort(f);
    window.current_r = results;
    window.psearch = search;
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
    let get2 = JSON.parse(JSON.dumps($.GET));
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
    for(let i=0;i<results.length;i++){
        let r = results[i];
        let d = new Date(r["posted"]*1000);
        let dtstr = isNaN(d.getTime())?"YYYY-MM-DD HH:MM":("0" + d.getFullYear()).slice(-4) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getDate() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
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
            .replace(/<fid>/g, r["fid"])
            .replace(/<gid>/g, r["gid"])
            .replace(/<token>/g, r["token"])
            .replace(/<title>/g, r["title"])
            .replace(/<thumb>/g, r["thumb"])
            .replace(/<cat>/g, r["category"])
            .replace(/<pages>/g, r["filecount"])
            .replace(/<catname>/g, catname)
            .replace(/<catcss>/g, catcss)
            .replace(/<posted>/g, dtstr)
            .replace(/<ratingposx>/g, ratingposx)
            .replace(/<ratingposy>/g, ratingposy)
        ;
    }
    $("div.itg.gld").html(htmls);
    $(".itg.gld .gl3t a").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        let r = window.temp_r[$(this).closest(".gl1t").data("fid")];
        let _item = {};
        for(let kk of [
            "fid",
            "gid",
            "token",
            "category",
            "filecount",
            "tags",
            "title",
            "title_jpn",
            "posted",
            "uploader",
            "thumb",
            "filesize",
            "torrents",
            "torrentcount",
            "first_gid",
            "rating"
        ]){
            _item[kk] = r[kk];
        }
        window.open("./gallery.html?"+btoa(JSON.dumps(_item)));
    });
    $("body").css({"pointer-events":"all"});
}
window.onpopstate = function(event) {
    $.init_GET();
    init();
}
window.history.pushState = (function(pushState){
    function d(c){
        return c.replace(/(search_case|match_any)=on/g, "$1=1").replace(/&(page=0|(f_search|exclude)=$|sort=gid|order=desc)/g, "").replace(/\?(page=0|(f_search|exclude)=&|(f_search|exclude)=$)/g, "?").replace(/&(f_search|exclude)=&/g, "&").replace(/\?$/g, "").replace(/^\.\/\?&/g, "?");
    }
    return function(a,b,c){
        pushState.apply(window.history, [a,b,c&&d(d(c))]);
        $.init_GET();
        init();
    }
})(window.history.pushState);
function search_presubmit2(){
    search_presubmit();
    clearTimeout(window.to);
    $("#search_hint").hide();
    let href = $("#searchbox form").serialize();
    if(href) href = "?"+href;
    window.history.pushState("./", "./", "./"+href);
}