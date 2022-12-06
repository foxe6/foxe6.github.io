$(document).ready(function () {
    function mode1(){
        $("div.file > a").slice(5).click(function(e){
            var href = $(this).attr("href").toString();
            if (href.match(/\.(png|jpe?g|bmp)$/)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
    		else if (href.indexOf("%5BOP%3A") === 0) {
                e.preventDefault();
                e.stopPropagation();
    			if (!confirm("Are you sure?")) return;
    			open("/?m="+location.pathname);
    			setTimeout(function(){window.location.reload()}, 2000);
    			return;
    		}
            // window.location = href;
        });
    	var imgs = $("div.file > a");
    	for (var i=0; i<imgs.length; i++) {
    	    var url = imgs.eq(i).data("preview");
    	    if (!url) continue;
    	    var img = new Image();
    	    img.src = url;
    	}
        $("a.op").click(function(e){
            e.stopPropagation();
            e.preventDefault();
            if (!confirm("Are you sure?")) return;
            $.get($(this).attr("href"));
        });
        var preview_imgs = "*[data-preview], a[href$='jpg'], a[href$='jpg'], a[href$='bmp'], a[href$='png']";
        $("div.file").on("mouseenter touchstart", function(){
            var _this = $(this).find(preview_imgs);
            if (!_this.length) {
                return;
            }
            var src = $(_this).data("preview")||$(_this).attr("href");
            $("div#img").html("<div><img src='"+src+"' referrerpolicy='no-referrer' /></div>").show();
        }).on("mouseleave touchend", function(e){
            $("div#img").html("").hide();
        }).click(function () {
            var _this = $(this).find(preview_imgs);
            if (!_this.length) {
                return;
            }
    		_this = $(this);
            setTimeout(function () {
                $("div.file").trigger("mouseleave");
    			setTimeout(function(){
    				_this.trigger("mouseenter");
    			}, 100);
            }, 100);
        });
        var temp = document.cookie.split("; ");
        var cookie = {};
        for (var i=0; i<temp.length; i++) {
            var _ = temp[i].split("="), k = _[0], v = _[1];
            v = decodeURIComponent(v);
            if (v.indexOf('\\"') >= 0) {
                v = v.slice(1, -1);
            }
            v = v.replace(/\\"/g, '"');
            cookie[k] = v;
        }
        // if (!("sort" in cookie) || !("order" in cookie)) {
            // cookie["sort"] = {};
            // cookie["order"] = {};
        // }
        // else {
            // cookie["sort"] = JSON.parse(cookie["sort"]);
            // cookie["order"] = JSON.parse(cookie["order"]);
        // }
        if (!("sort" in cookie)) {
            cookie["sort"] = {};
        }
        else {
            cookie["sort"] = JSON.parse(cookie["sort"]);
        }
        if (!("order" in cookie)) {
            cookie["order"] = {};
        }
        else {
            cookie["order"] = JSON.parse(cookie["order"]);
        }
        if (!("size" in cookie)) {
            cookie["size"] = {};
        }
        else {
            cookie["size"] = JSON.parse(cookie["size"]);
        }
        var path = $.crc32(window.location.pathname.toUpperCase());
        var sort = cookie["sort"][path], order = cookie["order"][path], size = cookie["size"][path];
        if (sort == undefined) {
            sort = "name";
        }
        if (order == undefined) {
            order = "asc";
        }
        if (size == undefined) {
            size = "asc";
        }
        $("div#sort div#"+sort).css({"backgroundColor": "#800080"});
        $("div#order div#"+order).css({"backgroundColor": "#800080"});
        $("div#size div#"+size).css({"backgroundColor": "#800080"});
        $("div#sort div, div#order div, div#size div").click(function(){
            var k = $(this).parent().attr("id");
            var _v = $(this).attr("id");
            if (_v == "name" || _v == "asc") {
                delete cookie[k][path];
            }
            else {
                cookie[k][path] = _v;
            }
            var v = JSON.stringify(cookie[k]);
            if (v.indexOf('"') >= 0) {
                v = '"'+v.replace(/"/g, '\\"')+'"';
            }
            var _cookie = "<k>=<v>; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;";
            document.cookie = _cookie.replace("<k>", k).replace("<v>", v).replace("<p>", path);
            window.location.reload();
        });
        var list = ["l", "r"];
        for (var k=0; k<list.length; k++){
            var ascroll_item = $("div[data-"+list[k]+"-id]");
            if (!ascroll_item.length) continue;
            var ascroll_name = "div#ascroll_"+list[k];
            var ascroll_html = "<div id='ascroll_"+list[k]+"'>";
            var exist = [];
            for (var i=0; i<ascroll_item.length; i++) {
                var dataid = ascroll_item.eq(i).data(list[k]+"-id");
                if (exist.indexOf(dataid) !== -1) continue;
                exist.push(dataid);
                ascroll_html += "<div data-id='"+dataid+"'>"+dataid+"</div>";
            }
            ascroll_html += "</div>";
            $("body").append(ascroll_html);
            $(ascroll_name).css({"top": $("nav").outerHeight()+"px"});
            $(ascroll_name+" > div").mouseenter((function(list_k){
                return function(){
                    window.scrollTo(0, $("div.files > div[data-"+list_k+"-id='"+$(this).data("id")+"']").eq(0).offset().top-$("nav").outerHeight());
                }
            })(list[k]));
            var font_size = 1;
            $(ascroll_name).css({"fontSize": font_size+"em"});
            while (font_size >= 0) {
                if ($(ascroll_name).height() > window.innerHeight - $("nav").outerHeight()) {
                    $(ascroll_name).css({"fontSize": font_size+"em"});
                }
                else {
                    break;
                }
                font_size -= 0.01;
            }
            $(ascroll_name).show();
        }
    	var highlighted_i = -1;
        var files = $("div.files div[data-l-id] a:not([class]), div.files div[data-r-id] a:not([class])");
    	if (location.hash.slice(1)) {
            let _h = decodeURIComponent(location.hash.slice(1));
    		files.each(function(i){
    			if (decodeURIComponent(encodeURIComponent($(this).clone().children().remove().end().text()).replace(/%C2%A0/g, "%20")) !== _h) return;
    			$(this).parent().addClass("highlighted")[0].scrollIntoView();
        		highlighted_i = i;
    		});
    		if(highlighted_i===-1){
    		    $("div#cwd").append("<span id='_h'> ("+_h+")</span>");
    		}
    	}
    	var keypressed = "";
    	$(document).keydown(function(e){
    	    if (e.key === "`") {
    	        ;
    	    }
    	    else if (e.key === " "){
    	        e.preventDefault();
    	        e.stopPropagation();
    	    }
    	    else if (e.key === "Enter") {
    	        if (highlighted_i !== -1) {
        	        e.preventDefault();
        	        e.stopPropagation();
    	            window.location = files.eq(highlighted_i).attr("href");
    	        }
    	    }
    	    else if (e.key === "ArrowUp") {
    	        e.preventDefault();
    	        e.stopPropagation();
	            files.parent().removeClass("highlighted");
    	        if (highlighted_i === -1) {
    	            highlighted_i = files.length-1;
    	            files.eq(highlighted_i).parent().addClass("highlighted")[0].scrollIntoView();
    	        }
    	        else {
    	            if (highlighted_i-1 < 0) {
    	                highlighted_i = files.length-1;
    	            }
    	            else {
    	                highlighted_i -= 1;
    	            }
    	            files.eq(highlighted_i).parent().addClass("highlighted")[0].scrollIntoView();
    	        }
    	    }
    	    else if (e.key === "ArrowDown") {
    	        e.preventDefault();
    	        e.stopPropagation();
	            files.parent().removeClass("highlighted");
    	        if (highlighted_i === -1) {
    	            highlighted_i = 0;
    	            files.eq(highlighted_i).parent().addClass("highlighted")[0].scrollIntoView();
    	        }
    	        else {
    	            highlighted_i = (highlighted_i+1)%files.length;
    	            files.eq(highlighted_i).parent().addClass("highlighted")[0].scrollIntoView();
    	        }
    	    }
    	});
    	$(document).keyup(function(e){
    	    let update=0;
    	    if (e.key === "`") {
    	        ;
    	    }
    	    else if (e.key === "Backspace") {
    	        keypressed = keypressed.slice(0, -1);
    	        update=1;
    	    }
    	    else if (e.key === "Escape") {
    	        keypressed = "";
    	        update=1;
    	    }
    	    else if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || "~`!@#$%^&*()-_=+[{]}\|;:'\",<.>/? ".indexOf(e.key) !== -1) {
    	        if (e.ctrlKey) return;
    	        keypressed += e.key;
    	        update=1;
    	    }
    	    else{
    	        update=0;
    	    }
    	    if(update){
        	    $("div#filter input").val(keypressed);
        	    if (keypressed) {
        	        files.parent().removeClass("not_match");
        	        for (var i=0; i<files.length; i++) {
        	            if (decodeURIComponent(encodeURIComponent(files.eq(i).text()).replace(/%C2%A0/g, "%20")).toLowerCase().indexOf(keypressed.toLowerCase()) === -1) {
        	                files.eq(i).parent().addClass("not_match");
        	            }
        	        }
        	        $("div#filter").show();
        	    }
        	    else {
        	        $("div.files div[data-l-id] a, div.files div[data-r-id] a").parent().removeClass("not_match");
        	        $("div#filter").hide();
        	    }
        	    files.parent().removeClass("highlighted");
        	    files = $("div.files div[data-l-id]:not(.not_match) a, div.files div[data-r-id]:not(.not_match) a");
        	    highlighted_i = -1;
    	    }
    	});
    }
    function mode2(){
        let img = $("div.img img")[0];
        let purl;
        let cti = setInterval(function(){
            if(purl!==img.src){
                $(img).removeClass("w").removeClass("h").removeAttr("style");
            }
            if(purl!==img.src||img.complete&&img.naturalWidth){
                if(!($(img).hasClass("w")||$(img).hasClass("h"))){
                    if(img.naturalWidth>img.naturalHeight){
                        $(img).addClass("w");//.css({"min-width": $(img).parent().width()});
                    }
                    else{
                        $(img).addClass("h");//.css({"min-height": $(img).parent().height()});
                    }
                }
            }
            else{
                $(img).removeClass("w").removeClass("h").removeAttr("style");
            }
            purl = img.src;
        }, 200);
        if(dirs.length){
            let file = "<div class='file'><a href='<dir1>/'><dir2></a></div>";
            let html = "";
            for(let i=0;i<dirs.length;i++){
                let dir = dirs[i];
                html += file.replace(/<dir1>/g, $.encodeURIComponent(dir)).replace(/<dir2>/g, $.escape(dir));
            }
            html = "<div class='files'>"+
            "<div class='file'><a href=''></a></div>"+
            "<div class='file'><a href=''></a></div>"+
            "<div class='file'><a href=''></a></div>"+
            "<div class='file'><a href=''></a></div>"+
            "<div class='file'><a href=''></a></div>"+
            html+
            "</div>";
            $("body script").after(html);
        }
        function minify(src){
            return "http://boomv3.xxx.kozow.com/MINIFY/?w=1600&fp="+$.encodeURIComponent(window.location.pathname+src);
        }
        function next_img(i){
            let img = imgs[i];
            if(!img){
                return;
            }
            let fsize = fs[i];
            if(fsize<=1.5*1024*1024){
                return setTimeout(function(){next_img(i+1)});
            }
            var tmp = new Image();
            tmp.src = minify(imgs[i]);
            let ti = setInterval(function(){
                if(!tmp.complete){
                    return;
                }
                clearInterval(ti);
                setTimeout(function(){next_img(i+1)});
            });
        }
        next_img(img_index===1?2:1);
        function onhashchange(){
            img_index = parseInt(window.location.hash.slice(1));
            var src = imgs[img_index-1];
            let fsize = fs[img_index-1];
            let src2;
            if(fsize>1.5*1024*1024){
                src2 = minify(src.split("#")[0]);
            }
            else{
                src2 = $.encodeURI(src.split("#")[0]);
            }
            $("div.img img").attr("src", src2);
            $("div#title div").html(src.split("#").pop());
        }
        $(window).on("hashchange", onhashchange);
        var img_index = window.location.hash.slice(1);
        if(img_index==="random"){
            window.location.hash = "#"+$.randint(1, imgs.length);
        }
        else{
            img_index = parseInt(img_index);
            if (isNaN(img_index)) {
                window.location.hash = "#1";
            }
            else {
                onhashchange();
            }
        }
        function _loop() {
            if(gallery_stop){
                return;
            }
            img_index = gallery_seq.shift();
            img_index++;
            window.location.hash = "#"+img_index;
            for(let i=0;i<10;i++){
                let src = imgs[gallery_seq[i]];
                if(src){
                    let fsize = fs[gallery_seq[i]];
                    let src2;
                    if(fsize>1.5*1024*1024){
                        src2 = minify(src.split("#")[0]);
                    }
                    else{
                        src2 = $.encodeURI(src.split("#")[0]);
                    }
                    let im = new Image();
                    im.src = src2;
                }
            }
            setTimeout(_loop, $.randint(2000, 3000));
        }
        let gallery_stop = 1;
        let gallery_seq = [];
        $("div#controls span").click(function(){
            img_index--;
            var pos = $(this).attr("class");
            if (pos === "left") {
                if (--img_index < 0) {
                    img_index++;
                }
            }
            else if (pos === "right") {
                if (++img_index > imgs.length-1) {
                    img_index--;
                }
            }
            else if (pos === "random") {
                var min = 0, max = imgs.length-1;
                img_index = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            else if (pos === "start") {
                img_index = 0;
            }
            else if (pos === "end") {
                img_index = imgs.length-1;
            }
            else if (pos === "back") {
                window.location = window.location.pathname+"..";
                return;
            }
            else if(pos === "gallery"){
                gallery_seq = [];
                var min = 0, max = imgs.length-1;
                for(let i=0;i<imgs.length-1;i++){
                    while(true){
                        let j = Math.floor(Math.random() * (max - min + 1)) + min;
                        if(gallery_seq.indexOf(j)===-1){
                            gallery_seq.push(j);
                            break;
                        }
                    }
                }
                gallery_stop = !gallery_stop;
                let text = $(this).data("text").split(",");
                $(this).text(gallery_stop?text[0]:text[1]);
                if(!gallery_stop) {
                    _loop();
                }
                else{
                    loop_start = 0;
                }
            }
            img_index++;
            window.location.hash = "#"+img_index;
        });
    }
    try{
        if ($("div#controls").length) {
            mode2();
        }
        else {
            mode1();
        }
    }
    catch(e){
        console.log(e.stack);
        alert(e.stack);
    }
});