window.item_js = (function (app) {
    delete window.item_js;
    var mfcid = window.location.href.split("/item/").slice(-1)[0];
    var item_sku;
    var quantity_changed = true;
    var sku_active;
    var quantity_active;
    $.get("/common.html", function (response) {
        $(response).filter("div#stock").appendTo("body");
        $("div#for_item").hide();
        $("div#stock div.bg").click(function () {
            $("div#stock").fadeOut();
            $("div#stock > div.content").effect("slide", {mode: "hide", direction: "down"});
        });
        $("div#quantity_plus").click(function () {
            if (!sku_active || !quantity_changed) {
                return;
            }
            if (quantity_active+1 > 9) {
                return;
            }
            var sku_stock;
            for (var i=0; i<item_sku.length; i++) {
                if (item_sku[i]["sku"] === sku_active) {
                    sku_stock = item_sku[i]["quantity"]-item_sku[i]["ordered"];
                    break;
                }
            }
            if (quantity_active+1 > sku_stock) {
                return;
            }
            quantity_changed = false;
            quantity_active++;
            $("div#quantity div.selected").removeClass("selected").next().addClass("selected");
            $("div#quantity_wrapper div#unit").animate({top: "-="+$("div#quantity_wrapper div#unit").height()/9+"px"}, function(){
                quantity_changed = true;
            });
        });
        $("div#quantity_minus").click(function () {
            if (!sku_active || !quantity_changed) {
                return;
            }
            if (quantity_active-1 <= 0) {
                return;
            }
            quantity_changed = false;
            quantity_active--;
            $("div#quantity div.selected").removeClass("selected").prev().addClass("selected");
            $("div#quantity_wrapper div#unit").animate({top: "+="+$("div#quantity_wrapper div#unit").height()/9+"px"}, function(){
                quantity_changed = true;
            });
        });
        $("div#add_to_cart_descriptor").click(function () {
            if (!sku_active || quantity_active === 0) {
                return alert(app.dialog_resource.alert_sku_select);
            }
            var skus = "&sku="+sku_active;
            skus = skus.repeat(quantity_active);
            app.api_post("request=cart&op=add"+skus, function (form, response) {
                success(app.dialog_resource.success_sku_select);
            });
        });
        $("div#select_sku").click(function () {
            app.api_post("request=item_sku&mfcid="+mfcid, function(form, response){
                item_sku = response;
                console.log(item_sku)
                $("div#stock div#skus select").html("");
                for (var i=0; i<item_sku.length; i++) {
                    var kind = item_sku[i]["kind"];
                    var option = $("<option/>").data("text", kind).text(kind);
                    var deadline = item_sku[i]["late_po"] || item_sku[i]["deadline"];
                    if (item_sku[i]["status"][0][0] === 0 && deadline) {
                        deadline = str2epoch(deadline);
                        // deadline = epoch()-1;
                        if (deadline <= epoch()) {
                            option.addClass("disabled");
                        }
                    }
                    if (item_sku[i]["quantity"] === item_sku[i]["ordered"]) {
                        option.addClass("disabled");
                    }
                    $("div#stock div#skus select").append(option);
                }
                app.setup_dropdown();
                $("div#stock div#skus select").unbind("change").change(function () {
                    var sku_info;
                    for (var i=0; i<item_sku.length; i++) {
                        if ($(this).val() === item_sku[i]["kind"]) {
                            sku_info = item_sku[i];
                            break;
                        }
                    }
                    sku_active = sku_info["sku"];
                    quantity_active = 1;
                    var deadline = sku_info["late_po"] || sku_info["deadline"];
                    if (sku_info["status"][0][0] === 0 && deadline) {
                        deadline = str2epoch(deadline);
                        // deadline = epoch()-1;
                        if (deadline <= epoch()) {
                            sku_active = null;
                            alert(app.dialog_resource.alert_sku_deadline.replace(
                                /<kind>/g,
                                sku_info["kind"]
                            ));
                        }
                    }
                    if (sku_info["quantity"] === sku_info["ordered"]) {
                        sku_active = null;
                        alert(app.dialog_resource.alert_sku_stock.replace(
                            /<kind>/g,
                            sku_info["kind"]
                        ));
                    }
                    for (var j=0; j<Object.keys(sku_info).length; j++) {
                        var key = Object.keys(sku_info)[j];
                        if (key === "image") {
                            continue;
                        }
                        var target = $("div#stock div#sku_info div#"+key+" span");
                        if (target.length === 0) {
                            continue;
                        }
                        var value = sku_info[key];
                        if (value === null || value === "") {
                            continue;
                        }
                        target.text(value);
                    }
                    $("div#stock div#quantity div#unit").animate({top: "-" + $("div#stock div#quantity div#unit").height() / 9 * ((quantity_active) - 1) + "px"});
                });
                $("div#stock").fadeIn();
                $("div#stock > div.content").hide().effect("slide", {mode: "show", direction: "down"}, function () {
                    $("div#stock div#skus select").trigger("change");
                });
            });
        });
        app.api_post("request=views&mfcid="+mfcid, undefined, undefined, false);
    });
    app.api_post("request=item_info&mfcid="+mfcid, function(form, response){console.log(response)
        for (var i=0; i<Object.keys(response).length; i++) {
            var key = Object.keys(response)[i];
            if (key === "image") {
                continue;
            }
            var target = $("div#item div#item_info div#"+key+" span");
            if (target.length === 0) {
                continue;
            }
            var value = response[key];
            if (Array.isArray(value)) {
                var new_value = "";
                for (var j=0; j<value.length; j++) {
                    if (new_value) {
                        new_value += "・"
                    }
                    new_value += item_info_a
                        .replace(/<text>/g, value[j][1])
                        .replace(/<k>/g, key)
                        .replace(/<v>/g, value[j][0]);
                }
                value = new_value;
            }
            if (value === null) {
                continue;
            }
            target.html(value);
        }
        function glider_click_event(e){
            app.image_preview_e(e, false);
            var mode = !!e.target;
            e = e.target || e;
            index = slides.index(e);
            $("div#preview div.description").html((index+1)+" / "+slides.length);
            if (mode) {
                $("div#preview").fadeIn();
            }
            else {
                $("div#preview").show();
            }
            $("div#preview div.preview_next, div#preview div.preview_prev").css({"display": "flex"});
        }
        var img = app.dialog_resource.img_src_mfcid.replace(/<mfcid>/g, mfcid);
        if (response["image"].length>0) {
            response["image"].unshift(img);
        }
        else {
            response["image"] = [img];
        }
        (new Slideshow()).setup(response["image"], glider_click_event);
        var slides = $("div.glider-track div.glider-slide");
        var index = 0;
        function preview_nav(dir) {
            return function(e){
                e.preventDefault();
                e.stopPropagation();
                if (dir > 0 && index+1 <= slides.length-1) {
                    glider_click_event(slides[index+1]);
                }
                else if (dir < 0 && index-1 >= 0) {
                    glider_click_event(slides[index-1]);
                }
            }
        }
        $("div#preview div.preview_next").click(preview_nav(1));
        $("div#preview div.preview_prev").click(preview_nav(-1));
        if (response["castoff"] === 1&&document.cookie.indexOf("off_blur")===-1) {
            $("#slideshow img").addClass("blur");
            warn(
                "<div>"+
                "本網頁可能含有令人反感、十六歲以上、成人內容。\n"+
                "未滿十六歲人士必須在成人陪同下瀏覽本網頁。\n"+
                "本網域嚴禁虛報年齡或違法進入等行為。"+
                "</div>",
                {
                    cancel: "離開",
                    confirm: "同意並進入"
                },
                function (_) {
                    if (!_) {
                        $("#slideshow img").parent().off("mousedown");
                        window.history.back();
                    }
                    else {
                        $("#slideshow img").removeClass("blur");
                    }
                }
            );
        }
        var title = $("div#item_info div#name");
        title.click(function(){
            dialog(undefined, "商品名稱", $(this).text().replace(/・/g,"<br/>"));
        });
        function loop_title(){
            title[0].scrollTo(0, 0);
            setTimeout(function(){
                var cw = title.children().outerWidth();
                var tw = title.width();
                if (cw > tw) {
                    title.animate({scrollLeft: cw-tw}, cw*9, "linear", function(){
                        setTimeout(loop_title, 1000);
                    });
                }
                else {
                    setTimeout(loop_title, 1000);
                }
            }, 1000);
        }
        loop_title();
    });
    app.api_post("request=review&op=get&mfcid="+mfcid, function (form, response) {
        if (response.length === 0) {
            return;
        }
        $("div#review #no_review").hide();
        $("div#review span#amount_review").text(response.length);
        for (var i=0; i<response.length; i++) {
            $("div#review div.table div.tbody").append(review_tr
                .replace(/<timestamp>/g, response[i]["timestamp"])
                .replace(/<buyer>/g, response[i]["buyer"])
                .replace(/<comment>/g, $("<div/>").text(response[i]["comment"]).html())
                .replace(/<image>/g, response[i]["image"]||"")
            )
        }
        $("div#review div.image").click(app.image_preview_e);
    });
    app.api_post("request=wishlist&op=is_wished&mfcid="+mfcid, function(form, response){
        if (response) {
            $("div#add2wish").addClass("wished").text($("div#add2wish").data("wished"));
        }
    }, undefined, false);
    $("div#review").appendTo("body");
    $("div#open_review").click(function () {
        $("div#review").fadeIn();
    });
    $("div#close_popup").click(function () {
        $("div#review").fadeOut().each(function () {
            $(this).children("div.content")[0].scrollTop = 0;
        });
    });
    $("div#add2wish").click(function(){
        app.api_post("request=wishlist&op=toggle&mfcid="+mfcid, function(form, response){
            if (response) {
                $("div#add2wish").addClass("wished").text($("div#add2wish").data("wished"));
            }
            else {
                $("div#add2wish").removeClass("wished").text($("div#add2wish").data("ori"));
            }
        });
    });
    $("div#open_more_action").click(function () {
        $("div#more_action").fadeToggle();
    });
    $("div#more_action div#user div[id]").click(function () {
        $("div#open_more_action").click();
        var target = $("div#cs_page div#cs_info div.row.header");
        if ($(this).attr("id") === "report"){
            target = target.eq(0);
        }
        else if ($(this).attr("id") === "feedback"){
            target = target.eq(1);
        }
        dialog(undefined, $(this).text(), target.html());
    });
    $("div#more_action div#admin div[id]").click(function () {
        window.open("http://admin.foxe6.kozow.com/shop?"+$(this).text()+"&mfcid="+mfcid, "_blank");
    });
    $(window).keyup(function(e){
        if (e.key === "`") {
            $("div#more_action div#admin").show();
        }
    });
})
