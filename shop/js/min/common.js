window.common_js=function(){delete window.common_js;return{append_stock:function(a,f){$(a).appendTo("body");$(f).hide();$("div#stock div.bg").click(function(){$("div#stock").fadeOut();$("div#stock > div.content").effect("slide",{mode:"hide",direction:"down"})})},quantity_plus_e:function(a){return function(){if(a.sku_active&&a.quantity_changed&&!(9<a.quantity_active+1)){for(var f,g=0;g<a.item_sku.length;g++)if(a.item_sku[g][0]===a.sku_active){f=a.item_sku[g][5]-a.item_sku[g][10];break}a.quantity_active+
1>f||(a.quantity_changed=!1,a.quantity_active++,$("div#quantity div.selected").removeClass("selected").next().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"-="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){a.quantity_changed=!0}))}}},quantity_minus_e:function(a){return function(){!a.sku_active||!a.quantity_changed||0>=a.quantity_active-1||(a.quantity_changed=!1,a.quantity_active--,$("div#quantity div.selected").removeClass("selected").prev().addClass("selected"),
$("div#quantity_wrapper div#unit").animate({top:"+="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){a.quantity_changed=!0}))}},setup_sku_select:function(a,f,g,l,m){a.app.api_post("request=item_sku&mfcid="+f,function(b,c){console.log(c);a.item_sku=c;$("div#stock div#skus select").html("");for(b=0;b<a.item_sku.length;b++){c=a.item_sku[b][3];c=$("<option/>").data("text",c).text(c);var k=a.item_sku[b][9]||a.item_sku[b][7];0===a.item_sku[b][11][0][0]&&k&&(k=window.str2epoch(k),k<=window.epoch()&&
c.addClass("disabled"));a.item_sku[b][5]===a.item_sku[b][10]&&c.addClass("disabled");$("div#stock div#skus select").append(c)}a.app.setup_dropdown();$("div#stock div#skus select").off("change").change(function(){for(var d=0;d<a.item_sku.length&&$(this).val()!==a.item_sku[d][3];d++);a.sku_active=a.item_sku[d][0];a.quantity_active=g();var e=a.item_sku[d][9]||a.item_sku[d][7];0===a.item_sku[d][11][0][0]&&e&&(e=window.str2epoch(e),e<=window.epoch()&&(a.sku_active=null,alert(a.app.dialog_resource.alert_sku_deadline.replace(/<kind>/g,
a.item_sku[d][3]))));l&&l(d);a.item_sku[d][5]===a.item_sku[d][10]&&(a.sku_active=null,alert(a.app.dialog_resource.alert_sku_stock.replace(/<kind>/g,a.item_sku[d][3])));for(e=0;e<a.item_sku[d].length;e++){var n=$("div#stock div#sku_info div[j='"+e+"'] span");if(0!==n.length){var h=a.item_sku[d][e];null!==h&&""!==h&&n.text(h)}}$("div#stock div#quantity div#unit").animate({top:"-"+$("div#stock div#quantity div#unit").height()/9*(a.quantity_active-1)+"px"})});$("div#stock").fadeIn();$("div#stock > div.content").hide().effect("slide",
{mode:"show",direction:"down"},m)})},gen_checkout_order_item:function(a,f,g,l){$(f).html("");for(var m=0,b=0;b<a.length;b++){var c=a[b][0],k=a[b][1],d=a[b][3],e=a[b][4],n=a[b][5],h=a[b][6],q=a[b][7],w=a[b][8],p=a[b][9],x=a[b][10],y=a[b][11],z=a[b][12],A=a[b][13];m+=p*h;c=$('<div class="item row flex">    <div class="left_info">        <div class="image flex pointer">            <img<castoff> src="<src>" />            <div class="quantity">×<quantity></div>        </div>        <div class="sku_info pointer"><sku_info></div>    </div>    <div class="item_info">        <div class="name"><a href="/item/<mfcid>"><name></a></div>        <div class="status"><b>商品狀態</b> <span><status></span></div>        <div class="kind"><b>款式</b> <span><kind></span></div>    </div></div><div class="flex row" style="justify-content: space-between;">    <div class="price"><b>價格</b> <span>＄<price>／個</span></div class="price">    <div class="total"><b>共</b> <span>＄<total></span></div></div>'.replace(/<src>/g,
l.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,c)).replace(/<castoff>/g,d&&-1===document.cookie.indexOf("off_blur")?" class='blur'":"").replace(/<mfcid>/g,c).replace(/<sku_info>/g,g(n)).replace(/<name>/g,k).replace(/<status>/g,e).replace(/<kind>/g,q).replace(/<price>/g,p).replace(/<quantity>/g,h).replace(/<total>/g,""+p*h));c.find("div.sku_info").click(function(B,C,D,E,F,r,t,u,v){return function(){dialog(void 0,"款式詳情",$("<table>    <tr><td>商品狀態</td><td><status></td></tr>    <tr><td>商品款式</td><td><kind></td></tr>    <tr><td>款式版本</td><td><version></td></tr>    <tr><td>款式價格</td><td>＄<price>／個</td></tr>    <tr><td>款式數量</td><td><quantity>個</td></tr>    <tr><td>發售日期</td><td><release_date></td></tr>    <tr><td>截訂日期</td><td><deadline></td></tr>    <tr><td>發售延遲</td><td><postpone></td></tr>    <tr><td>截訂延遲</td><td><late_po></td></tr></table>".replace(/<status>/g,
B).replace(/<kind>/g,C).replace(/<version>/g,D).replace(/<price>/g,E).replace(/<quantity>/g,F).replace(/<release_date>/g,r?r:"—").replace(/<deadline>/g,t?t:"—").replace(/<postpone>/g,u?u:"—").replace(/<late_po>/g,v?v:"—"))[0])}}(e,q,w,p,h,x,y,z,A));$(f).append(c)}c=$('<div class="flex row header" style="font-size: 4vh; justify-content: space-between;">    <div><b>小計</b></div>    <div>＄<span></span></div></div>');c.find("span").text(m);$(f).append(c);setInterval(function(){$("div.row.header span").text(m)},
1E3);$("div.item div.image").click(l.image_preview_e)}}};
