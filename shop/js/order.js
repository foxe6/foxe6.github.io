window.order_js=function(d){function r(e,h){d.api_post("request=order&op=get&state="+e+"&page="+n,function(c,a){c="";if(0===a.length)n=-1,h?$("div#order_item div#no_order").show():$("div#order_item div.row.last").hide();else{$("div#order_item div#no_order").hide();for(var b=0;b<a.length;b++){for(var g=Object.keys(a[b]),f=0;f<g.length;f++)if("string"==typeof a[b][g[f]]){for(var l=a[b][g[f]].split("|,|"),m=0;m<l.length;m++)isNaN(l[m])||isNaN(parseFloat(l[m]))||(l[m]=parseInt(l[m]));a[b][g[f]]=l}else a[b][g[f]]=
[a[b][g[f]]];g="";for(f=0;f<a[b].mfcid.length;f++)g+=order_item_img.replace(/<src>/g,d.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,a[b].mfcid[f])).replace(/<quantity>/g,a[b].quantities[f]).replace(/<castoff>/g,a[b].castoff[f]&&-1===document.cookie.indexOf("off_blur")?" class='blur'":"");c+=order_item.replace(/<timestamp>/g,a[b].timestamp).replace(/<key>/g,btoa(a[b].timestamp)).replace(/<state_text>/g,$("div#order_header select option[value='"+a[b].state[0]+"']").data("text")).replace(/<order_item>/g,
g)}$("div#order_item div#order_list div.row.last").before(c)}$(window).trigger("resize")});n++}function p(e){return function(){e&&($("div#order_item div#order_list div.row:not(.last)").remove(),$("div#order_item div#order_list div.row.last").show(),n=0);r($("div#order_header select").val(),e)}}delete window.order_js;d.setup_dropdown();var q,n=0;$("div#order_item").scroll(function(){$(window).trigger("resize");clearTimeout(q);0>n||$("div#order_list div.row.last").offset().top>.9*$(window).height()||
(q=setTimeout(p(!1),333))});$("div#order_header select").change(p(!0));$("div#order_list div.row.last").click(p(!1));var k=window.location.pathname.split("/").slice(2,3)[0];if(k){var t=function(){$("div#order_action div#delete").click(function(){confirm(d.dialog_resource.confirm_order_delete,function(e){e&&d.api_post("request=order&op=delete&key="+k,function(h,c){success(d.dialog_resource.success_order_delete,function(a){window.location.href="/order"})})})})},u=function(){$("div#order_action div#checkout").click(function(){window.location.href=
window.location.href.replace("/order/","/checkout/")})},v=function(){$("div#review_page").appendTo("body").find("div#close_popup").click(function(){$(this).closest("div.popup_page").fadeOut()});$("div#review").click(function(){$("div#review_page").fadeIn()});var e,h=$("div#upload_proof form input[type='file']").change(function(c){var a=$("div#upload_proof form label");a.hasClass("active")&&a.removeClass("active").text(a.text().slice(1));$("div#upload_proof_preview img").attr("src","");var b=c.target.files[0];
"type"in b&&"image"===b.type.split("/")[0]?10485760<b.size?(c.target.value="",alert(_this.dialog_resource.alert_upload_proof_oversize)):(c=new FileReader,c.onload=function(g){e=g.target.result;$("div#upload_proof_preview img").attr("src",e);e=[e.split(",").slice(1)[0],b.name.split(".").slice(-1)[0]];a.addClass("active").text(d.dialog_resource.text_upload_proof_1)},c.readAsDataURL(b)):(c.target.value="",alert(_this.dialog_resource.alert_upload_proof_type))});$("div#upload_proof div#submit").click(function(c){0===
h[0].files.length?alert(d.dialog_resource.alert_upload_proof_select):10485760<h[0].files[0].size?(c.target.value="",alert(d.dialog_resource.alert_upload_proof_oversize)):(c=$("textarea[name='comment']").val(),d.api_post("request=review&op=submit&key="+k+"&comment="+encodeURIComponent(c)+"&file="+e[0]+"&ext="+e[1],function(a,b){success(d.dialog_resource.success_review,function(g){window.location.href=window.location.href.replace(/checkout/g,"order")});throw"page reloading";}))});$("div#upload_proof_preview").click(d.image_preview_e)};
k=atob(k);$("div#order_header").hide();$("div#response").remove();$("div#order_item").remove();$("div#order_descriptor span").remove();$("div#order_descriptor div#key").html(k);d.api_post("request=order&op=get&key="+k,function(e,h){$.get("/common.html",function(c){var a;$("body").append(c);gen_checkout_order_item(h,"div#order_info",function(b){a=b;return"ｉ"},d);0===a?($("div#order_action div#checkout").show(),u()):3===a?($("div#order_action div#review").show(),$("div#order_info").prepend(order_info_tracking.replace(/<tracking>/g,
h[0].tracking)),v()):-1===a&&($("div#order_action div#delete").show(),t())})});$("div#order_action div#go2order").click(function(){window.location.href="/order"})}else $("div#order_action").remove(),$("div#order_info").remove(),$("div#order_descriptor div#key").remove(),$("div#order_descriptor").remove(),$("div#order_header select").trigger("change")};
