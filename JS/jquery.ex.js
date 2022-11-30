if(!RegExp.escape){
    RegExp.escape = function(s){
      return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    };
}
!function() {
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true;
        } else {
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    $.is_mobile = hasTouchScreen;
}();
$.ajaxSetup({
    traditional: true,
    crossDomain: true,
    xhrFields: {withCredentials: true},
    beforeSend: function(jqxhr, settings) {
        function replace_nbsp(v){
            if (typeof v === "string") {
                var en = /(%[0-9]{2})+/g.test(v);
                if(!en){
                    v = $.encodeURIComponent(v);
                }
                if (v.indexOf("%C2%A0") !== -1){
                    v = v.replace(/%C2%A0/g, "%20");
                }
                if(!en){
                    v = $.decodeURIComponent(v);
                }
                return v;
            }
            else {
                for (var _k in v) {
                    v[_k] = replace_nbsp(v[_k]);
                }
                return v;
            }
        }
        settings.data = replace_nbsp(settings.data);
        return true;
    }
});
$.extend(jQuery.expr[":"], {
    "attrStartswith": function (el, _, b) {
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
            if(atts[i].nodeName.toLowerCase().indexOf(b[3].toLowerCase()) === 0) {
                return true; 
            }
        }
        return false;
    }
});
$.extend(jQuery.expr[":"], {
    "attrEndswith": function (el, _, b) {
        for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
          var att = atts[i].nodeName.toLowerCase(),
              str = b[3].toLowerCase();
            if(att.length >= str.length && att.substr(att.length - str.length) === str) {
                return true; 
            }
        }
        return false;
    }
});
window.localStorage.setItem = (function(_setItem){
    return function(key, value){
        try{
            _setItem.apply(window.localStorage, [key, JSON.stringify(value)]);
        }
        catch(e){
            console.warn("window.localStorage.setItem() fallback to default behaviour")
            _setItem.apply(window.localStorage, [key, value]);
        }
    }
})(window.localStorage.setItem);
window.localStorage.getItem = (function(_getItem){
    return function(key){
        try{
            return JSON.parse(_getItem.apply(window.localStorage, [key]));
        }
        catch(e){
            console.warn("window.localStorage.getItem() fallback to default behaviour")
            return _getItem.apply(window.localStorage, [key]);
        }
    }
})(window.localStorage.getItem);
$.min = function(obj, key){
    if (!key) return Math.min.apply(null, obj);
    var min = Math.min.apply(null, obj.map(key));
    return obj.filter(function(){
        return key.apply(window, arguments) === min;
    })
}
$.max = function(obj, key){
    if (!key) return Math.max.apply(null, obj);
    var max = Math.max.apply(null, obj.map(key));
    return obj.filter(function(){
        return key.apply(window, arguments) === max;
    })
}
$.fn.pass = function(){
    return $(this);
}
$.crc32=function(r){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return((-1^n)>>>0).toString(16)};
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop+$(this).outerHeight();
    var viewportTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var viewportBottom = viewportTop+window.innerHeight;
    return elementBottom>viewportTop && elementTop<viewportBottom;
};
$.encodeURIComponent=function(s){return encodeURIComponent(s).replace(/[')(!~]/g, escape)};
$.decodeURIComponent=function(s){return decodeURIComponent(s)};
$.encodeURI=function(s){
    if(/^blob:http/.test(s)){
        return s;
    }
    var start = 0;
    if (/^https?:\/\//.test(s)){
        start = 2;
    }
    s = s.split("/");
    for (var i=start; i<s.length; i++) {
        s[i] = $.encodeURIComponent(s[i]);
    }
    return s.join("/");
}
$.decodeURI=function(s){
    s = s.split(/%2[Ff]/);
    for (var i=0; i<s.length; i++) {
        s[i] = $.decodeURIComponent(s[i]);
    }
    return s.join("%2F");
}
$.escape=function(s){
    return $("<p/>").text(s).html().replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/ /g, "&nbsp;");
}
$.unescape=function(s){
    return $("<p/>").html(s.replace(/&nbsp;/g, " ")).text();
}
$.getStyle = function(url){
    $("head").append("<link rel='stylesheet' type='text/css' href='"+url+"'>");
}
$.randint = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
$.loadUI = function(version, theme){
    version = version||"1.12.1";
    theme = theme||"base";
    var cdn = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/";
    $.getScript({url: cdn+version+"/jquery-ui.min.js", cache: true});
    $.getStyle(cdn+version+"/jquery-ui.min.css");
    $.getStyle(cdn+version+"/jquery-ui.structure.min.css");
    $.getStyle(cdn+version+"/jquery-ui.theme.min.css");
    $.getStyle(cdn+version+"/themes/"+theme+"/jquery-ui.min.css");
    $.getStyle(cdn+version+"/themes/"+theme+"/theme.min.css");
}
$.fn.click_copy = function(filter, cb){
    $(this).click(function(e){
        var temp = $("<input>");
        $("body").append(temp);
        temp.val(filter(e, $(this))).select();
        document.execCommand("copy");
        temp.remove();
        typeof cb==="function"&&cb();
    });
}
$.js_download = function(url, name){
    let a = document.createElement("a");
    a.href = url;
    a.download = name||url.split("/").slice(-1)[0];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
$.js_download_text = function(text, name){
    let a = document.createElement("a");
    a.href = "data:application/octet-stream;charset=utf-8;base64,"+btoa(text);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
$.new_gallery_page = function(title, imgs, dirs, fs, cb){
    window.location.hash = "";
    $("link[href='style.css']").remove();
    $.get("/404.css", function(css){
        $.get("/404.js", function(js){
            $.get("/?require=gallery_template", function(r){
                r = r.replace("<imgs>", JSON.stringify(imgs));
                r = r.replace("<dirs>", JSON.stringify(dirs));
                r = r.replace("<fs>", JSON.stringify(fs));
                // let w = window.open("", "_blank", "popup=1");
                // if(w){
                    // document.open();
                    js = js.split(/\n/g);
                    js = js.slice(1,-1);
                    js = js.join("\n");
                    r = r.replace("<body>", "<body><style>"+css+"</style>").replace("</body>", "<script>"+js+"</script></body>");
                    // document.write(r);
                    // console.log(r.match(/<body>(.*>)<\/body>/s));
                    $("body").empty().append(r.match(/<body>(.*)<\/body>/s)[1]);
                    document.title = title;
                    // document.close();
                    cb&&cb();
                // }
            });
        });
    });
}
$.COOKIE = {
    "set": function(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + ((exdays||365)*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    "get": function(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
$.param = (function(_param){
    return function(obj){
        return _param(obj, true);
    }
})($.param);
$.init_GET = function(){
    var tmp = {};
    var m = window.location.search.matchAll(/(\?|\&)([^=]+)\=([^&]+)/g);
    for (var ma of m){
        if(!(ma[2] in tmp)){
            tmp[ma[2]] = [];
        }
        tmp[ma[2]].push($.decodeURIComponent(ma[3]));
    }
    $.GET = tmp;
};
$.init_GET();
$.getStyle("/JS/loading-polyfill.css");