window.common_js=function(){delete window.common_js;return{append_stock:function(a,e){$(a).appendTo("body");$(e).hide();$("div#stock div.bg").click(function(){$("div#stock").fadeOut();$("div#stock > div.content").effect("slide",{mode:"hide",direction:"down"})})},quantity_plus_e:function(a){return function(){if(a.sku_active&&a.quantity_changed&&!(9<a.quantity_active+1)){for(var e,g=0;g<a.item_sku.length;g++)if(a.item_sku[g][0]===a.sku_active){e=a.item_sku[g][5]-a.item_sku[g][10];break}a.quantity_active+
1>e||(a.quantity_changed=!1,a.quantity_active++,$("div#quantity div.selected").removeClass("selected").next().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"-="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){a.quantity_changed=!0}))}}},quantity_minus_e:function(a){return function(){!a.sku_active||!a.quantity_changed||0>=a.quantity_active-1||(a.quantity_changed=!1,a.quantity_active--,$("div#quantity div.selected").removeClass("selected").prev().addClass("selected"),
$("div#quantity_wrapper div#unit").animate({top:"+="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){a.quantity_changed=!0}))}},setup_sku_select:function(a,e,g,k,q){a.app.api_post("request=item_sku&mfcid="+e,function(d,b){console.log(b);a.item_sku=b;$("div#stock div#skus select").html("");for(d=0;d<a.item_sku.length;d++){b=a.item_sku[d][3];var h=a.item_sku[d][2];b=$("<option/>").data("text",b+"（"+h+"）").attr("value",b);b.text(b.data("text"));h=a.item_sku[d][9]||a.item_sku[d][7];0===
a.item_sku[d][11][0][0]&&h&&(h=window.str2epoch(h),h<=window.epoch()&&b.addClass("disabled"));a.item_sku[d][5]<=a.item_sku[d][10]&&b.addClass("disabled");$("div#stock div#skus select").append(b)}$("div#stock div#skus select").off("change");a.app.setup_dropdown();$("div#stock div#skus select").change(function(){for(var c=0;c<a.item_sku.length&&$(this).val()!==a.item_sku[c][3];c++);a.sku_active=a.item_sku[c][0];a.quantity_active=g();var f=a.item_sku[c][9]||a.item_sku[c][7];0===a.item_sku[c][11][0][0]&&
f&&(f=window.str2epoch(f),f<=window.epoch()&&(a.sku_active=null,alert(a.app.dialog_resource.alert_sku_deadline.replace(/<kind>/g,a.item_sku[c][3]))));k&&k(c);a.item_sku[c][5]<=a.item_sku[c][10]&&(a.sku_active=null,alert(a.app.dialog_resource.alert_sku_stock.replace(/<kind>/g,a.item_sku[c][3])));for(f=0;f<a.item_sku[c].length;f++){var l=$("div#stock div#sku_info div[j='"+f+"'] span");if(0!==l.length){var m=a.item_sku[c][f];null!==m&&""!==m&&l.text(m)}}$("div#stock div#quantity div#unit").animate({top:"-"+
$("div#stock div#quantity div#unit").height()/9*(a.quantity_active-1)+"px"})});$("div#stock").fadeIn();$("div#stock > div.content").hide().effect("slide",{mode:"show",direction:"down"},q)})},gen_checkout_order_item:function(a,e,g,k){console.log(a);$(e).html("");var q=0,d=a[0];a=a[1];for(var b=0;b<a.length;b++){var h=a[b][0],c=a[b][1],f=a[b][3],l=a[b][4],m=a[b][5],r=a[b][6],u=a[b][7],n=0;1>d&&(n=parseInt(u.split("・").slice(-1)[0].split("$").slice(-1)[0]),n=Math.round(100*(n*(1-d)+Number.EPSILON))/
100);var z=a[b][8],t=a[b][9],A=a[b][10],B=a[b][11],C=a[b][12],D=a[b][13];q+=(t-n)*r;var p=$('<div class="item row flex">    <div class="left_info">        <div class="image flex pointer<castoff>">            <img src="<src>" />            <div class="quantity no_translate">×<quantity></div>        </div>        <div class="sku_info pointer"><sku_info></div>    </div>    <div class="item_info">        <div class="name"><a href="/item/<mfcid>"><name></a></div>        <div class="status"><b>商品狀態</b> <span><status></span></div>        <div class="kind"><b>款式</b> <span><kind></span></div>    </div></div><div class="flex row" style="justify-content: space-between;">    <div class="price"><b>價格</b> ＄<price>／個</div class="price">    <div class="total"><b>共</b> ＄<total></div></div>'.replace(/<src>/g,
k.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,h)).replace(/<castoff>/g,f?" blur":"").replace(/<mfcid>/g,h).replace(/<sku_info>/g,g(m)).replace(/<name>/g,c).replace(/<status>/g,l).replace(/<kind>/g,u).replace(/<price>/g,t).replace(/<quantity>/g,r).replace(/<total>/g,""+t*r));p.find("div.sku_info").click(function(E,F,G,H,I,v,w,x,y){return function(){dialog(void 0,"款式詳情",$("<table>    <tr><td>商品狀態</td><td><status></td></tr>    <tr><td>商品款式</td><td><kind></td></tr>    <tr><td>款式版本</td><td><version></td></tr>    <tr><td>款式價格</td><td>＄<price>／個</td></tr>    <tr><td>款式數量</td><td><quantity>個</td></tr>    <tr><td>發售日期</td><td><release_date></td></tr>    <tr><td>截訂日期</td><td><deadline></td></tr>    <tr><td>發售延遲</td><td><postpone></td></tr>    <tr><td>截訂延遲</td><td><late_po></td></tr></table>".replace(/<status>/g,
E).replace(/<kind>/g,F).replace(/<version>/g,G).replace(/<price>/g,H).replace(/<quantity>/g,I).replace(/<release_date>/g,v?v:"—").replace(/<deadline>/g,w?w:"—").replace(/<postpone>/g,x?x:"—").replace(/<late_po>/g,y?y:"—"))[0])}}(l,u,z,t,r,A,B,C,D));$(e).append(p)}1>d&&$(e).append('<div class="flex row header" style="font-size: calc(4 * var(--vh)); justify-content: space-between;">    <div><b>優惠</b></div>    <div>-＄<discount></div></div>'.replace(/<discount>/g,n));a=function(){p.find("div.subtotal span").text(q.toFixed(2))};
p=$('<div class="flex row header" style="margin-bottom: calc(10 * var(--vh)); font-size: calc(4 * var(--vh)); justify-content: space-between;">    <div><b>小計</b></div>    <div class="subtotal">＄<span></span></div></div>');a();$(e).append(p);setInterval(a,1E3);-1!==document.cookie.indexOf("off_blur=")?$("div.item div.image").click(k.image_preview_e):$("div.item div.image:not(.blur)").click(k.image_preview_e)}}};
