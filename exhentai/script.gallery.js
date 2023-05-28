$(document).ready(function(){
    let d = new Date(_item["posted"]*1000);
    let dtstr = isNaN(d.getTime())?"YYYY-MM-DD HH:MM":("0" + d.getFullYear()).slice(-4) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getDate() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    function humanFileSize(size) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "KB", "MB", "GB", "TB"][i];
    }
    let fid = _item["fid"];
    let _fs;
    let save_path;
    if(_item["token"]==="null"){
        let thumb = _item["thumb"].split("/");
        save_path = "../wnacg/src/"+thumb[5]+thumb[6]+".zip";
    }
    else{
        save_path = "../exhentai/hive/"+Math.floor(parseInt(fid.split("/")[0])/1000)+"/"+fid.replace("/", "_")+".zip";
    }
    if(window.location.pathname.indexOf("_test")!==-1){
        $.ajax({
            type: "HEAD",
            url: save_path,
            success: function(a,b,r){
                _fs = parseInt(r.getResponseHeader("Content-Length"));
                $("#gdd tbody tr:nth-child(5) .gdt2").text(humanFileSize(_fs));
            }
        });
    }
    else{
        $("#gdd tbody tr:nth-child(5) .gdt2").text(humanFileSize(_item["filesize"]));
    }
    $("#gdc div").text(cat_map[_item["category"]]).addClass(cat_map2[_item["category"]]).attr("onclick", $("#gdc div").attr("onclick").replace("category", _item["category"]));
    $("title").text(_item["title"]+$("title").text());
    $("#gn").text(_item["title"]);
    $("#gj").text(_item["title_jpn"]);
    $("#gd1 img").attr("src", _item["thumb"].replace("g_l.", "g_250."));
    $("#gdd tbody tr:nth-child(1) .gdt2").text(dtstr);
    $("#gdd tbody tr:nth-child(6) .gdt2").text(_item["filecount"]+" pages");
    $("#rating_count").text("");
    $("#grt2").text(_item["rating"]);
    $("#gdn a").text(_item["uploader"]);
    $("#gd5 p:nth-child(3) a").text($("#gd5 p:nth-child(3) a").text().replace("tc", _item["torrentcount"])).attr("href", "gallerytorrents.html"+window.location.search);
    $("#gdn a").attr("href", $("#gdn a").attr("href")+_item["uploader"]);
    _item["tags"].sort();
    let tag = "";
    let ctag = "";
    let tagvv = "";
    for(let t of _item["tags"]){
        let [pv, vv] = t.split(":");
        if(pv !== ctag){
            ctag = pv;
            if(tagvv){
                tag = tag.replace(/<v>/g, tagvv);
                tagvv = "";
            }
            tag += taglist_template.replace(/<pv>/g, ctag);
        }
        tagvv += taglist_v_template.replace(/<tag>/g, t).replace(/<vv>/g, vv).replace(/<tag_search>/g, pv+":"+(vv.indexOf(" ")===-1?vv:$.encodeURIComponent('"'+vv+'"')));
    }
    if(_item["token"]==="null"){
        tag = "<h2>This gallery is not a standard entry.</h2><h3>Some information is missing.</h3><h3>You can only view or download this gallery.</h3>";
        _item["filecount"] = "null";
    }
    if(tagvv){
        tag = tag.replace(/<v>/g, tagvv);
    }
    $("#taglist table tbody").html(tag);
    let gdtm = "";
    let gidpage = 0;
    function set_css_var_height(i, h){
        document.querySelector(":root").style.setProperty("--height"+i, h+"px");
    }
    for(let i=0;i<parseInt(_item["filecount"]);i++){
        let gid_k = ("000000"+_item["gid"].toString().slice(0, -3)).slice(-6);
        let gidpage2 = ("00"+Math.floor(gidpage/20)).slice(-2);
        let img = new Image();
        img.onload = function(){
            set_css_var_height(gidpage2, img.naturalHeight);
        }
        img.src = "https://ehgt.org/m/"+gid_k+"/"+_item["gid"]+"-"+gidpage2+".jpg";
        gdtm += gdtm_template
            .replace(/--height/g, "--height"+gidpage2)
            .replace(/<offsetx>/g, (i%20)*-100)
            .replace(/<pagealt>/g, ("00000"+(i+1)).slice(-4))
            .replace(/<page>/g, i+1)
            .replace(/<gid>/g, _item["gid"])
            .replace(/<gid_k>/g, gid_k)
            .replace(/<gidpage>/g, gidpage2)
        ;
        gidpage++;
    }
    $("#gdt").prepend(gdtm);
    if(window.location.pathname.indexOf("_test")!==-1){
        $("#gd5 #view").on("click", function(){
            function open(){
                (_item["token"]==="null"?open_zip2:open_zip)(_item["title"], save_path);
            }
            if(_fs>=100*1024*1024){
                if(confirm("The current archive size is too large ("+humanFileSize(_fs)+").\nPlease consider to download instead.\n\nAre you sure to continue?")){
                    open();
                }
            }
            else{
                open();
            }
        });
        $("#gd5 #download").on("click", function(){
            window.location = save_path;
        });
    }
});
function open_zip(title, href){
    JSZipUtils.getBinaryContent(href, function(err, data) {
        if (!err) {
            JSZip.loadAsync(data).then(function(zip){
                let files=Object.keys(zip.files);
                let metadata = {};
                let imgs=[];
                let fs = [];
                function next(){
                    let name=files.shift();
                    if(!name){
                        $.new_gallery_page("gallery", imgs, [], fs);
                        return;
                    }
                    function _next(r){
                        console.debug("processed", name, "size", r.byteLength, "remaining", files.length);
                        next();
                    }
                    zip.file(name).async("arraybuffer").then(function(r){
                        let dname = metadata[name.split(".")[0]].split("-").pop()+"."+name.split(".").pop();
                        if(r.byteLength>=1.5*1024*1024){
                            let blob = new Blob([new Uint8Array(r)]);
                            let url = URL.createObjectURL(blob);
                            let img = new Image();
                            img.onload = function(){
                                let canvas = document.createElement("canvas");
                                let ctx = canvas.getContext("2d");
                                let width = img.naturalWidth;
                                let height = img.naturalHeight;
                                canvas.width = width;
                                canvas.height = height;
                                ctx.drawImage(img, 0, 0, width, height);
                                img = canvas.toDataURL("image/jpeg",0.7)+"#"+title+" ["+dname+"]";
                                URL.revokeObjectURL(url);
                                imgs.push(img);
                                fs.push(0);
                                _next(r);
                            }
                            img.src = url;
                        }
                        else{
                            let blob = new Blob([new Uint8Array(r)]);
                            let url = URL.createObjectURL(blob)+"#"+title+" ["+dname+"]";
                            imgs.push(url);
                            fs.push(0);
                            _next(r);
                        }
                    });
                }
                $.get(href+".meta", function(r){
                    r = r.split(/\n/g);
                    for(let rr of r){
                        let rrr = rr.split("/");
                        metadata[rrr[0]] = rr;
                    }
                    files.sort(function(a,b){
                        a = a.split(".")[0];
                        b = b.split(".")[0];
                        a = parseInt(metadata[a].split("-").pop());
                        b = parseInt(metadata[b].split("-").pop());
                        return a-b;
                    });
                    // console.log(metadata, files);
                    next();
                });
            })
        }
    });
}
function open_zip2(title, href){
    JSZipUtils.getBinaryContent(href, function(err, data) {
        if (!err) {
            JSZip.loadAsync(data).then(function(zip){
                let files=Object.keys(zip.files);
                let metadata = {};
                let imgs=[];
                let fs = [];
                function next(){
                    let name=files.shift();
                    if(!name){
                        $.new_gallery_page("gallery", imgs, [], fs);
                        return;
                    }
                    function _next(r){
                        console.debug("processed", name, "size", r.byteLength, "remaining", files.length);
                        next();
                    }
                    zip.file(name).async("arraybuffer").then(function(r){
                        if(r.byteLength>=1.5*1024*1024){
                            let blob = new Blob([new Uint8Array(r)]);
                            let url = URL.createObjectURL(blob);
                            let img = new Image();
                            img.onload = function(){
                                let canvas = document.createElement("canvas");
                                let ctx = canvas.getContext("2d");
                                let width = img.naturalWidth;
                                let height = img.naturalHeight;
                                canvas.width = width;
                                canvas.height = height;
                                ctx.drawImage(img, 0, 0, width, height);
                                img = canvas.toDataURL("image/jpeg",0.7)+"#"+title+" ["+name+"]";
                                URL.revokeObjectURL(url);
                                imgs.push(img);
                                fs.push(0);
                                _next(r);
                            }
                            img.src = url;
                        }
                        else{
                            let blob = new Blob([new Uint8Array(r)]);
                            let url = URL.createObjectURL(blob)+"#"+title+" ["+name+"]";
                            imgs.push(url);
                            fs.push(0);
                            _next(r);
                        }
                    });
                }
                files.sort(function(a,b){
                    a = a.split(".")[0];
                    b = b.split(".")[0];
                    a = parseInt(a);
                    b = parseInt(b);
                    return a-b;
                });
                next();
            })
        }
    });
}