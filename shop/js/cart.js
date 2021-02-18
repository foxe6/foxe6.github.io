window.cart_js = (function (app) {
    delete window.cart_js;
    var item_sku;
    var quantity_changed = true;
    var sku_active;
    var quantity_active;
    var cart_items;
    var current_sku_change;
    var old_skus = {};
    $.get("/common.html", function (response) {
        $(response).filter("div#stock").appendTo("body");
        $("div#for_cart").hide();
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
        $("div#stock div#add_to_cart_descriptor").click(function () {
            if (!sku_active || quantity_active === 0) {
                return alert(app.dialog_resource.alert_sku_select);
            }
            var new_sku = sku_active;
            var old_sku = current_sku_change;
            var old_quantity = old_skus[old_sku];
            var new_quantity = quantity_active;
            if (new_sku === old_sku && new_quantity === old_quantity) {
                $("div#stock div.bg").click();
                return;
            }
            for (var i=0; i<item_sku.length; i++) {
                if (item_sku[i]["sku"] === new_sku && new_sku !== old_sku) {
                    return alert(app.dialog_resource.alert_cart_exist);
                }
            }
            old_skus = "&old_sku=" + old_sku;
            old_skus = old_skus.repeat(old_quantity);
            var new_skus = "&new_sku="+new_sku;
            new_skus = new_skus.repeat(new_quantity);
            app.api_post("request=cart&op=update"+old_skus+new_skus, function (form, response) {
                window.location.href = "/cart#"+new_sku;
                window.location.reload(true);
            });
        });
    });
    app.api_post("request=cart&op=get", function (form, response) {
        if (response.length === 0) {
            return;
        }
        cart_items = response;
        $("div#cart_info").html("");
        for (var i=0; i<cart_items.length; i++) {
            var current_sku = cart_items[i]["sku"];
            var mfcid = cart_items[i]["mfcid"];
            var name = cart_items[i]["name"];
            var castoff = cart_items[i]["castoff"];
            var kind = cart_items[i]["kind"];
            var price = cart_items[i]["final"];
            var quantity = cart_items[i]["quantity"];
            var rows = cart_item
                .replace(/<src>/g, app.dialog_resource.img_src_mfcid.replace(
                    /<mfcid>/g,
                    mfcid
                ))
                .replace(/<castoff>/g, (castoff&&document.cookie.indexOf("off_blur")===-1?" class='blur'":""))
                .replace(/<quantity>/g, quantity)
                .replace(/<mfcid>/g, mfcid)
                .replace(/<name>/g, name)
                .replace(/<kind>/g, kind)
                .replace(/<price>/g, price)
                .replace(/<total>/g, quantity*price);
            rows = $(rows);
            rows.find("div.edit").click((function(mfcid, current_sku, quantity) {
                return function () {
                    current_sku_change = current_sku;
                    old_skus[current_sku] = quantity;
                    app.api_post("request=item_sku&mfcid=" + mfcid, function (form, response) {
                        item_sku = response;
                        $("div#stock div#skus select").html("");
                        for (var i = 0; i < item_sku.length; i++) {
                            var kind = item_sku[i]["kind"];
                            var option = $("<option/>").data("value", kind).text(kind);
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
                        $("div#stock div#skus select").off("change").change(function () {
                            var sku_info;
                            for (var i=0; i<item_sku.length; i++) {
                                if ($(this).val() === item_sku[i]["kind"]) {
                                    sku_info = item_sku[i];
                                    break;
                                }
                            }
                            sku_active = sku_info["sku"];
                            quantity_active = sku_active===current_sku?quantity:1;
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
                            var max_quantity = sku_info["quantity"]-sku_info["ordered"];
                            if (quantity_active > max_quantity) {
                                quantity_active = max_quantity;
                                alert(app.dialog_resource.alert_sku_max_quantity
                                    .replace(
                                        /<kind>/g,
                                        sku_info["kind"]
                                    ).replace(
                                        /<max_quantity>/g,
                                        max_quantity
                                    )
                                );
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
                                target.html(value);
                            }
                            $("div#stock div#quantity div#unit").animate({top: "-" + $("div#stock div#quantity div#unit").height() / 9 * ((quantity_active) - 1) + "px"});
                        });
                        $("div#stock").fadeIn();
                        $("div#stock > div.content").hide().effect("slide", {mode: "show", direction: "down"}, function () {
                            var i = item_sku.findIndex(function (el) {
                                return el["sku"] === current_sku;
                            });
                            var val = $("div#stock div#skus select option").eq(i).data("text");
                            $("div#stock div#skus select").val(val).trigger("change");
                        });
                    });
                }
            })(mfcid, current_sku, quantity));
            rows.find("div.image").click(app.image_preview_e);
            rows.find("div.checkbox").click(function () {
                if ($(this).children().hasClass("active")) {
                    $(this).children().removeClass("active");
                }
                else {
                    $(this).children().addClass("active");
                }
                var subtotal = $("div.checkbox div.dot.active").map(function(j, el){
                    var _index = $("div.item div.checkbox div.dot").index(el);
                    var price = cart_items[_index]["final"];
                    var quantity = cart_items[_index]["quantity"];
                    return price*quantity;
                }).get().reduce(function(a, b) {
                    return a + b;
                }, 0);
                $("div#place_order div#subtotal span").text(subtotal);
            });
            $("div#cart_info").append(rows);
        }
        $(window).trigger("resize");
        var hash = window.location.hash.slice(1);
        if (hash.length > 0) {
            window.location.hash = "";
            var target = $("div[data-sku='" + hash + "']");
            if (target.length !== 1) {
                return;
            }
            $("div#cart_info").animate({
                scrollTop: target.offset().top-$(window).height()*(20+0.6)/100
            });
        }
    }, undefined, false);
    $("div#select_all").click(function () {
        if ($("div.dot").length === $("div.dot.active").length) {
            $("div.dot").click();
        }
        else {
            $("div.dot:not(.active)").click();
        }
    });
    $("div#delete_selected").click(function () {
        if ($("div.item div.checkbox div.dot.active").length === 0) {
            return alert(app.dialog_resource.alert_item_select);
        }
        confirm(app.dialog_resource.confirm_cart_delete, function(_){
            if (!_) {
                return;
            }
            var skus = "";
            $("div.item div.checkbox div.dot").each(function(){
                if (!$(this).hasClass("active")) {
                    return;
                }
                var _index = $("div.item div.checkbox div.dot").index(this);
                var sku = "&sku="+cart_items[_index]["sku"];
                var quantity = cart_items[_index]["quantity"];
                skus += sku.repeat(quantity);
            });
            app.api_post("request=cart&op=delete"+skus, function (form, response) {
                success(app.dialog_resource.success_cart_delete, function (_) {
                    window.location.reload(true);
                });
            });
        });
    });
    $("div#checkout").click(function () {
        if ($("div.item div.checkbox div.dot.active").length === 0) {
            return alert(app.dialog_resource.alert_item_select);
        }
        var skus = "";
        $("div.item div.checkbox div.dot").each(function(){
            if (!$(this).hasClass("active")) {
                return;
            }
            var _index = $("div.item div.checkbox div.dot").index(this);
            var sku = "&sku="+cart_items[_index]["sku"];
            var quantity = cart_items[_index]["quantity"];
            skus += sku.repeat(quantity);
        });
        app.api_post("request=checkout&op=reserve_order" + skus, function (form, response) {
            window.location.href = "/checkout/" + btoa(response["key"]);
        });
    });
    $(window).resize(function () {
        $("div#cart_info div.item div.name").each(function () {
            $(this).next().removeAttr("style").parent().removeClass("valign");
            if ($(this).height()+$(this).next().height() - $(this).parent().prev().outerHeight(true) > 10) {
                $(this).next().css({clear: "both", marginLeft: "1vh"});
            }
            else {
                $(this).parent().addClass("valign");
            }
        });
    });
})
