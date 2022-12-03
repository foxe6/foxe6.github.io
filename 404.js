$(document).ready(function () {
    function mode2(){
        let img = $("div.img img")[0];
        let cti = setInterval(function(){
            if(img.complete&&img.naturalWidth){
                if(!($(img).hasClass("w")||$(img).hasClass("h"))){
                    if(img.naturalWidth>img.naturalHeight){
                        $(img).addClass("w");
                    }
                    else{
                        $(img).addClass("h");
                    }
                }
            }
            else{
                $(img).removeClass("w");
                $(img).removeClass("h");
            }
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
    mode2();
});
