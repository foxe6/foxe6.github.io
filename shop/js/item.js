window.item_js=function(g){delete window.item_js;var n=window.location.href.split("/item/").slice(-1)[0],e,t=!0,p,m;$.get("/common.html",function(b){$(b).filter("div#stock").appendTo("body");$("div#for_item").hide();$("div#stock div.bg").click(function(){$("div#stock").fadeOut();$("div#stock > div.content").effect("slide",{mode:"hide",direction:"down"})});$("div#quantity_plus").click(function(){if(p&&t&&!(9<m+1)){for(var a,c=0;c<e.length;c++)if(e[c].sku===p){a=e[c].quantity-e[c].ordered;break}m+1>
a||(t=!1,m++,$("div#quantity div.selected").removeClass("selected").next().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"-="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){t=!0}))}});$("div#quantity_minus").click(function(){!p||!t||0>=m-1||(t=!1,m--,$("div#quantity div.selected").removeClass("selected").prev().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"+="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){t=!0}))});$("div#add_to_cart_descriptor").click(function(){if(!p||
0===m)return alert(g.dialog_resource.alert_sku_select);var a="&sku="+p;a=a.repeat(m);g.api_post("request=cart&op=add"+a,function(c,q){success(g.dialog_resource.success_sku_select)})});$("div#select_sku").click(function(){g.api_post("request=item_sku&mfcid="+n,function(a,c){e=c;console.log(e);$("div#stock div#skus select").html("");for(a=0;a<e.length;a++){c=e[a].kind;c=$("<option/>").data("text",c).text(c);var q=e[a].late_po||e[a].deadline;0===e[a].status[0][0]&&q&&(q=str2epoch(q),q<=epoch()&&c.addClass("disabled"));
e[a].quantity===e[a].ordered&&c.addClass("disabled");$("div#stock div#skus select").append(c)}g.setup_dropdown();$("div#stock div#skus select").unbind("change").change(function(){for(var f,d=0;d<e.length;d++)if($(this).val()===e[d].kind){f=e[d];break}p=f.sku;m=1;d=f.late_po||f.deadline;0===f.status[0][0]&&d&&(d=str2epoch(d),d<=epoch()&&(p=null,alert(g.dialog_resource.alert_sku_deadline.replace(/<kind>/g,f.kind))));f.quantity===f.ordered&&(p=null,alert(g.dialog_resource.alert_sku_stock.replace(/<kind>/g,
f.kind)));for(d=0;d<Object.keys(f).length;d++){var k=Object.keys(f)[d];if("image"!==k){var l=$("div#stock div#sku_info div#"+k+" span");0!==l.length&&(k=f[k],null!==k&&""!==k&&l.text(k))}}$("div#stock div#quantity div#unit").animate({top:"-"+$("div#stock div#quantity div#unit").height()/9*(m-1)+"px"})});$("div#stock").fadeIn();$("div#stock > div.content").hide().effect("slide",{mode:"show",direction:"down"},function(){$("div#stock div#skus select").trigger("change")})})});g.api_post("request=views&mfcid="+
n,void 0,void 0,!1)});g.api_post("request=item_info&mfcid="+n,function(b,a){function c(h){$("div#loading").fadeIn();g.image_preview_e(h,!1);var r=setInterval(function(){$("div#preview img")[0].complete&&(clearInterval(r),$("div#loading").fadeOut())},100),z=!!h.target;h=h.target||h;u=v.index(h);$("div#preview div.description").html(u+1+" / "+v.length);z?$("div#preview").fadeIn():$("div#preview").show();$("div#preview div.preview_next, div#preview div.preview_prev").css({display:"flex"})}function q(h){return function(r){r.preventDefault();
r.stopPropagation();0<h&&u+1<=v.length-1?c(v[u+1]):0>h&&0<=u-1&&c(v[u-1])}}function f(){w[0].scrollTo(0,0);setTimeout(function(){var h=w.children().outerWidth(),r=w.width();h>r?w.animate({scrollLeft:h-r},9*h,"linear",function(){setTimeout(f,1E3)}):setTimeout(f,1E3)},1E3)}console.log(a);for(b=0;b<Object.keys(a).length;b++){var d=Object.keys(a)[b];if("image"!==d){var k=$("div#item div#item_info div#"+d+" span");if(0!==k.length){var l=a[d];if(Array.isArray(l)){for(var x="",y=0;y<l.length;y++)x&&(x+=
"・"),x+=item_info_a.replace(/<text>/g,l[y][1]).replace(/<k>/g,d).replace(/<v>/g,l[y][0]);l=x}null!==l&&k.html(l)}}}b=g.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,n);0<a.image.length?a.image.unshift(b):a.image=[b];(new Slideshow).setup(a.image,c);var v=$("div.glider-track div.glider-slide"),u=0;$("div#preview div.preview_next").click(q(1));$("div#preview div.preview_prev").click(q(-1));1===a.castoff&&-1===document.cookie.indexOf("off_blur")&&($("#slideshow img").addClass("blur"),warn("<div>本網頁可能含有令人反感、十六歲以上、成人內容。\n未滿十六歲人士必須在成人陪同下瀏覽本網頁。\n本網域嚴禁虛報年齡或違法進入等行為。</div>",
{cancel:"離開",confirm:"同意並進入"},function(h){h?$("#slideshow img").removeClass("blur"):($("#slideshow img").parent().off("mousedown"),window.history.back())}));var w=$("div#item_info div#name");w.click(function(){dialog(void 0,"商品名稱",$(this).text().replace(/・/g,"<br/>"))});f()});g.api_post("request=review&op=get&mfcid="+n,function(b,a){if(0!==a.length){$("div#review #no_review").hide();$("div#review span#amount_review").text(a.length);for(b=0;b<a.length;b++)$("div#review div.table div.tbody").append(review_tr.replace(/<timestamp>/g,
a[b].timestamp).replace(/<buyer>/g,a[b].buyer).replace(/<comment>/g,$("<div/>").text(a[b].comment).html()).replace(/<image>/g,a[b].image||""));$("div#review div.image").click(g.image_preview_e)}});g.api_post("request=wishlist&op=is_wished&mfcid="+n,function(b,a){a&&$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished"))},void 0,!1);$("div#review").appendTo("body");$("div#open_review").click(function(){$("div#review").fadeIn()});$("div#close_popup").click(function(){$("div#review").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=
0})});$("div#add2wish").click(function(){g.api_post("request=wishlist&op=toggle&mfcid="+n,function(b,a){a?$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished")):$("div#add2wish").removeClass("wished").text($("div#add2wish").data("ori"))})});$("div#open_more_action").click(function(){$("div#more_action").fadeToggle()});$("div#more_action div#user div[id]").click(function(){$("div#open_more_action").click();var b=$("div#cs_page div#cs_info div.row.header");"report"===$(this).attr("id")?
b=b.eq(0):"feedback"===$(this).attr("id")&&(b=b.eq(1));dialog(void 0,$(this).text(),b.html())});$("div#more_action div#admin div[id]").click(function(){window.open("http://admin.foxe6.kozow.com/shop?"+$(this).text()+"&mfcid="+n,"_blank")});$(window).keyup(function(b){"`"===b.key&&$("div#more_action div#admin").show()})};
