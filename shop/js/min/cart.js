var _location=$("meta[name='description']").attr("content"),cart_item='<div class="row">    <div class="checkbox"><div class="dot pointer"></div></div>    <div style="width: calc(100% - calc(7 * var(--vh)));">        <div class="image flex pointer">            <img<castoff> src="<src>" />            <div class="quantity">×<quantity></div>        </div>        <div class="item_info">            <div class="name"><a href="/item/<mfcid>"><name></a></div>            <div class="extra_info">                <div>                    <div class="kind"><b>款式</b> <span><kind></span></div>                    <div class="price"><b>價格</b> <span>＄<price>／個</span></div>                    <div class="total"><b>共</b> <span>＄<total></span></div>                </div>                <div class="edit pointer">&#x270E;</div>            </div>        </div>    </div></div>',
cart_item_padding='<div class="row" style="min-height: calc(8 * var(--vh));"></div>';
window.cart_js=function(f){delete window.cart_js;var c,q,r,b={item_sku:null,quantity_changed:!0,sku_active:null,quantity_active:null,app:f};b=$.extend({},b,window.common_js());$.get("/common.html",function(a){b.append_stock(a,"div#for_cart");$("div#quantity_plus").click(b.quantity_plus_e(b));$("div#quantity_minus").click(b.quantity_minus_e(b));$("div#stock div#add_to_cart_descriptor").click(function(){if(!b.sku_active||0===b.quantity_active)return alert(f.dialog_resource.alert_sku_select);var d=b.sku_active,
e=q,n=r,g=b.quantity_active;if(d===e&&g===n)$("div#stock div.bg").click();else{for(var h=0;h<c.length;h++)if(c[h][5]===d&&d!==e)return alert(f.dialog_resource.alert_cart_exist);e=("&old_sku="+e).repeat(n);g=("&new_sku="+d).repeat(g);f.api_post("request=cart&op=update"+e+g,function(t,u){window.location.href="/cart#"+d;window.location.reload(!0)})}})});f.api_post("request=cart&op=get",function(a,d){function e(){$("div#place_order div#subtotal span").text(n)}if(0!==d.length){c=d;var n=0;e();setInterval(e,
1E3);$("div#cart_info").html("");for(a=0;a<c.length;a++){d=c[a][0];var g=c[a][1],h=c[a][2],t=c[a][4],u=c[a][5],x=c[a][6],v=c[a][7];h=$(cart_item.replace(/<src>/g,c[a][8]||f.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,g)).replace(/<castoff>/g,t&&-1===document.cookie.indexOf("off_blur")?" class='blur'":"").replace(/<quantity>/g,d).replace(/<mfcid>/g,g).replace(/<name>/g,h).replace(/<kind>/g,x).replace(/<price>/g,v).replace(/<total>/g,d*v));h.find("div.edit").click(function(k,l,w){return function(){q=
l;r=w;b.setup_sku_select(b,k,function(){return b.sku_active===l?w:1},function(m){var p=b.item_sku[m][5]-b.item_sku[m][10];b.quantity_active>p&&(b.quantity_active=p,alert(f.dialog_resource.alert_sku_max_quantity.replace(/<kind>/g,b.item_sku[m][3]).replace(/<max_quantity>/g,p)))},function(){var m=b.item_sku.findIndex(function(p){return p[0]===l});m=$("div#stock div#skus select option").eq(m).attr("value");$("div#stock div#skus select").val(m).trigger("change")})}}(g,u,d));$("div#cart_info").append(h)}c.length&&
$("div#cart_info").prepend(cart_item_padding).append(cart_item_padding);$("div#cart_info div.image").click(f.image_preview_e);$("div#cart_info div.checkbox").click(function(){$(this).children().hasClass("active")?($(this).children().removeClass("active"),$(this).parent().addClass("normal")):($(this).children().addClass("active"),$(this).parent().removeClass("normal"));n=$("div.checkbox div.dot.active").map(function(k,l){k=$("div.row div.checkbox div.dot").index(l);return c[k][7]*c[k][0]}).get().reduce(function(k,
l){return k+l},0);e()}).parent().addClass("normal");$(window).trigger("resize");a=window.location.hash.slice(1);0<a.length&&(window.location.hash="",a=$("div[data-sku='"+a+"']"),1===a.length&&$("div#cart_info").animate({scrollTop:a.offset().top-20.6*$(window).height()/100}))}});$("div#select_all").click(function(){$("div.dot").length===$("div.dot.active").length?$("div.dot").click():$("div.dot:not(.active)").click()});$("div#delete_selected").click(function(){if(0===$("div.row div.checkbox div.dot.active").length)return alert(f.dialog_resource.alert_item_select);
confirm(f.dialog_resource.confirm_cart_delete,function(a){if(a){var d="";$("div.row div.checkbox div.dot").each(function(){if($(this).hasClass("active")){var e=$("div.row div.checkbox div.dot").index(this);d+=("&sku="+c[e][5]).repeat(c[e][0])}});f.api_post("request=cart&op=delete"+d,function(e,n){success(f.dialog_resource.success_cart_delete,function(g){window.location.reload(!0)})})}})});$("div#checkout").click(function(){if(0===$("div.row div.checkbox div.dot.active").length)return alert(f.dialog_resource.alert_item_select);
var a="";$("div.row div.checkbox div.dot").each(function(){if($(this).hasClass("active")){var d=$("div.row div.checkbox div.dot").index(this);a+=("&sku="+c[d][5]).repeat(c[d][0])}});f.api_post("request=checkout&op=reserve_order"+a,function(d,e){window.location.href="/checkout/"+btoa(e.key)})});$(window).resize(function(){$("div#cart_info div.row div.name").each(function(){$(this).next().removeAttr("style").parent().removeClass("valign");10<$(this).height()+$(this).next().height()-$(this).parent().prev().outerHeight(!0)?
$(this).next().css({clear:"both",marginLeft:"calc(1 * var(--vh))"}):$(this).parent().addClass("valign")})})};
