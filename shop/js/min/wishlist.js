var _location=$("meta[name='description']").attr("content"),wishlist_row='<div class="row">    <div class="image flex pointer<castoff>"><img src="<src>" /></div>    <a href="/item/<mfcid>"><name></a></div>';
window.wishlist_js=function(c){delete window.wishlist_js;c.api_post("request=wishlist&op=get",function(a,b){0<b.length&&$("div#no_wishlist").hide();for(a=0;a<b.length;a++)$("div#wishlist_item").append(wishlist_row.replace(/<src>/g,c.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,b[a][0])).replace(/<castoff>/g,-1===document.cookie.indexOf("off_blur=")&&b[a][2]?" blur":"").replace(/<mfcid>/g,b[a][0]).replace(/<name>/g,b[a][1]));$("div#wishlist_item div.row").click(function(){$(this).toggleClass("selected")});
$("div#wishlist_item").trigger("scroll");$(window).trigger("resize")});$("div#delete_selected").click(function(){if(0===$("div#wishlist_item div.row.selected").length)return alert(c.dialog_resource.alert_item_select);confirm(c.dialog_resource.confirm_cart_delete,function(a){if(a){var b="";$("div#wishlist_item div.row.selected").each(function(){b+="&mfcid="+$(this).find("div.image img").attr("src").split("/").slice(-1)[0].split(".")[0]});c.api_post("request=wishlist&op=remove"+b,function(e,f){$("div#wishlist_item div.row.selected").remove();
0===$("div#wishlist_item div.row").length&&$("div#no_wishlist").show();success(c.dialog_resource.success_cart_delete)})}})});$("div#select_all").click(function(){$("div#wishlist_item div.row").length===$("div#wishlist_item div.row.selected").length?$("div#wishlist_item div.row").click():$("div#wishlist_item div.row:not(.selected)").click()});var d=$("div#wishlist_item");c.setup_scroll_hints(d,!0);d.trigger("scroll");$(window).resize(function(){$("div#wishlist_item.rows .row div.image").each(function(){$(this).css({height:$(this).width()+
"px"})})})};
