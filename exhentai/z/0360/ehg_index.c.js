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
