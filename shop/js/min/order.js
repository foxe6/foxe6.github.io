var _location=$("meta[name='description']").attr("content"),order_item='<a class="order_item row" href="/order/<key>">    <div class="top_info">        <div class="timestamp">訂單 <timestamp></div>        <div class="state"><state_text></div>    </div>    <div class="skus"><order_item></div></a>',order_item_img='<div class="image flex">    <img<castoff> src="<src>" />    <div class="quantity">×<quantity></div></div>',order_info_tracking="<div class='row flex header' style='justify-content: space-around; font-size: 4vh;'><div>運單</div><div><tracking></div></div>";
window.order_js=function(d){function r(h,f){d.api_post("request=order&op=get&state="+h+"&page="+m,function(e,a){e="";if(0===a.length)m=-1,f?$("div#order_item div#no_order").show():$("div#order_item div.row.last").hide();else{$("div#order_item div#no_order").hide();for(var b=0;b<a.length;b++){for(var c=0;c<a[b].length;c++)if("string"==typeof a[b][c]){for(var g=a[b][c].split("|,|"),k=0;k<g.length;k++)isNaN(g[k])||isNaN(parseFloat(g[k]))||(g[k]=parseInt(g[k]));a[b][c]=g}else a[b][c]=[a[b][c]];g="";for(c=
0;c<a[b][1].length;c++)g+=order_item_img.replace(/<src>/g,d.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,a[b][1][c])).replace(/<quantity>/g,a[b][0][c]).replace(/<castoff>/g,a[b][2][c]&&-1===document.cookie.indexOf("off_blur")?" class='blur'":"");e+=order_item.replace(/<timestamp>/g,a[b][4]).replace(/<key>/g,btoa(a[b][4])).replace(/<state_text>/g,$("div#order_header select option[value='"+a[b][3][0]+"']").data("text")).replace(/<order_item>/g,g)}$("div#order_item div#order_list div.row.last").before(e)}$(window).trigger("resize")});
m++}function n(h){return function(){h&&($("div#order_item div#order_list a.row").remove(),$("div#order_item div#order_list div.row.last").show(),m=0);r($("div#order_header select").val(),h)}}delete window.order_js;var p=$.extend({},p,window.common_js());d.setup_dropdown();var q,m=0;$("div#order_item").scroll(function(){clearTimeout(q);0>m||$("div#order_list div.row.last").offset().top>.9*$(window).height()||(q=setTimeout(n(!1),333))});$("div#order_header select").change(n(!0));$("div#order_list div.row.last").click(n(!1));
var l=window.location.pathname.split("/").slice(2,3)[0];if(l){var t=function(){$("div#order_action div#delete").click(function(){confirm(d.dialog_resource.confirm_order_delete,function(h){h&&d.api_post("request=order&op=delete&key="+l,function(f,e){success(d.dialog_resource.success_order_delete,function(a){window.location.href="/order"})})})})},u=function(){$("div#order_action div#checkout").click(function(){window.location.href=window.location.href.replace("/order/","/checkout/")})},v=function(){var h=
$("div#review_page").appendTo("body").find("div#close_popup").click(function(){$(this).closest("div.popup_page").fadeOut()});$("div#review").click(function(){$("div#review_page").fadeIn()});var f={};_this.setup_select_img(h,f);var e=f.selected_file_e,a=f.selected_file;$("div#upload_proof div#submit").click(function(b){0===e[0].files.length?alert(d.dialog_resource.alert_upload_proof_select):10485760<e[0].files[0].size?(b.target.value="",alert(d.dialog_resource.alert_upload_proof_oversize)):(b=$("textarea[name='comment']").val(),
d.api_post("request=review&op=submit&key="+l+"&comment="+encodeURIComponent(b)+"&file="+a[0]+"&ext="+a[1],function(c,g){success(d.dialog_resource.success_review,function(k){window.location.href=window.location.href.replace(/checkout/g,"order")});throw"page reloading";}))});$("div#upload_proof_preview").click(d.image_preview_e)};l=atob(l);$("div#order_header").hide();$("div#response").remove();$("div#order_item").remove();$("div#order_descriptor span").remove();$("div#order_descriptor div#key").html(l);
d.api_post("request=order&op=get&key="+l,function(h,f){var e;$("body").append(html);p.gen_checkout_order_item(f,"div#order_info",function(a){e=a;return"ｉ"},d);0===e?($("div#order_action div#checkout").show(),u()):3===e?($("div#order_action div#review").show(),$("div#order_info").prepend(order_info_tracking.replace(/<tracking>/g,f[0][14])),v()):4===e?$("div#order_info").prepend(order_info_tracking.replace(/<tracking>/g,f[0][14])):-1===e&&($("div#order_action div#delete").show(),t())});$("div#order_action div#go2order").click(function(){window.location.href=
"/order"})}else $("div#order_action").remove(),$("div#order_info").remove(),$("div#order_descriptor div#key").remove(),$("div#order_descriptor").remove(),$("div#order_header select").trigger("change")};
