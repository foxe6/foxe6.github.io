window.item_js=function(g){delete window.item_js;var m=window.location.href.split("/item/").slice(-1)[0],c,r=!0,n,l;$.get("/common.html",function(b){$(b).filter("div#stock").appendTo("body");$("div#for_item").hide();$("div#stock div.bg").click(function(){$("div#stock").fadeOut();$("div#stock > div.content").effect("slide",{mode:"hide",direction:"down"})});$("div#quantity_plus").click(function(){if(n&&r&&!(9<l+1)){for(var a,e=0;e<c.length;e++)if(c[e][0]===n){a=c[e][5]-c[e][10];break}l+1>a||(r=!1,l++,
$("div#quantity div.selected").removeClass("selected").next().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"-="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){r=!0}))}});$("div#quantity_minus").click(function(){!n||!r||0>=l-1||(r=!1,l--,$("div#quantity div.selected").removeClass("selected").prev().addClass("selected"),$("div#quantity_wrapper div#unit").animate({top:"+="+$("div#quantity_wrapper div#unit").height()/9+"px"},function(){r=!0}))});$("div#add_to_cart_descriptor").click(function(){if(!n||
0===l)return alert(g.dialog_resource.alert_sku_select);var a="&sku="+n;a=a.repeat(l);g.api_post("request=cart&op=add"+a,function(e,p){success(g.dialog_resource.success_sku_select)})});$("div#select_sku").click(function(){g.api_post("request=item_sku&mfcid="+m,function(a,e){c=e;console.log(c);$("div#stock div#skus select").html("");for(a=0;a<c.length;a++){e=c[a][3];e=$("<option/>").data("text",e).text(e);var p=c[a][9]||c[a][7];0===c[a][11][0][0]&&p&&(p=str2epoch(p),p<=epoch()&&e.addClass("disabled"));
c[a][5]===c[a][10]&&e.addClass("disabled");$("div#stock div#skus select").append(e)}g.setup_dropdown();$("div#stock div#skus select").off("change").change(function(){for(var f=0;f<c.length&&$(this).val()!==c[f][3];f++);n=c[f][0];l=1;var d=c[f][9]||c[f][7];0===c[f][11][0][0]&&d&&(d=str2epoch(d),d<=epoch()&&(n=null,alert(g.dialog_resource.alert_sku_deadline.replace(/<kind>/g,c[f][3]))));c[f][5]===c[f][10]&&(n=null,alert(g.dialog_resource.alert_sku_stock.replace(/<kind>/g,c[f][3])));for(d=0;d<c[f].length;d++){var t=
$("div#stock div#sku_info div[j='"+d+"'] span");if(0!==t.length){var k=c[f][d];null!==k&&""!==k&&t.text(k)}}$("div#stock div#quantity div#unit").animate({top:"-"+$("div#stock div#quantity div#unit").height()/9*(l-1)+"px"})});$("div#stock").fadeIn();$("div#stock > div.content").hide().effect("slide",{mode:"show",direction:"down"},function(){$("div#stock div#skus select").trigger("change")})})});g.api_post("request=views&mfcid="+m,void 0,void 0,!1)});g.api_post("request=item_info&mfcid="+m,function(b,
a){function e(h){$("div#loading").fadeIn();g.image_preview_e(h,!1);var q=setInterval(function(){$("div#preview img")[0].complete&&(clearInterval(q),$("div#loading").fadeOut())},100),y=!!h.target;h=h.target||h;u=v.index(h);$("div#preview div.description").html(u+1+" / "+v.length);y?$("div#preview").fadeIn():$("div#preview").show();$("div#preview div.preview_next, div#preview div.preview_prev").css({display:"flex"})}function p(h){return function(q){q.preventDefault();q.stopPropagation();0<h&&u+1<=v.length-
1?e(v[u+1]):0>h&&0<=u-1&&e(v[u-1])}}function f(){w[0].scrollTo(0,0);setTimeout(function(){var h=w.children().outerWidth(),q=w.width();h>q?w.animate({scrollLeft:h-q},9*h,"linear",function(){setTimeout(f,1E3)}):setTimeout(f,1E3)},1E3)}console.log(a);for(b=0;b<a.length;b++)if(6===b)for(var d=0;d<a[6].length;d++)0===a[6][d].indexOf("|mfc|")&&(a[6][d]=a[6][d].replace("|mfc|","https://static.myfigurecollection.net/upload/pictures/"));else{var t=$("div#item div#item_info div[i='"+b+"'] span");if(0!==t.length){var k=
a[b];if(Array.isArray(k)){var x="";for(d=0;d<k.length;d++)x&&(x+="・"),x+=item_info_a.replace(/<text>/g,k[d][1]).replace(/<k>/g,t.parent().attr("id")).replace(/<v>/g,k[d][0]);k=x}null!==k&&t.html(k)}}b=g.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,m);0<a[6].length?a[6].unshift(b):a[6]=[b];(new Slideshow).setup(a[6],e);var v=$("div.glider-track div.glider-slide"),u=0;$("div#preview div.preview_next").click(p(1));$("div#preview div.preview_prev").click(p(-1));1===a[4]&&-1===document.cookie.indexOf("off_blur")&&
($("#slideshow img").addClass("blur"),warn("<div>本網頁可能含有令人反感、十六歲以上、成人內容。\n未滿十六歲人士必須在成人陪同下瀏覽本網頁。\n本網域嚴禁虛報年齡或違法進入等行為。</div>",{cancel:"離開",confirm:"同意並進入"},function(h){h?$("#slideshow img").removeClass("blur"):($("#slideshow img").parent().off("mousedown"),window.history.back())}));var w=$("div#item_info div#name");w.click(function(){dialog(void 0,"商品名稱",$(this).text().replace(/・/g,"<br/>"))});f()});g.api_post("request=review&op=get&mfcid="+m,function(b,a){if(0!==a.length){$("div#review #no_review").hide();
$("div#review span#amount_review").text(a.length);for(b=0;b<a.length;b++)$("div#review div.table div.tbody").append(review_tr.replace(/<timestamp>/g,a[b][0]).replace(/<buyer>/g,a[b][1]).replace(/<comment>/g,$("<div/>").text(a[b][3]).html()).replace(/<image>/g,a[b][4]?"/upload/review/"+a[b][4]:""));$("div#review div.image").click(g.image_preview_e)}});g.api_post("request=wishlist&op=is_wished&mfcid="+m,function(b,a){a&&$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished"))},void 0,
!1);$("div#review").appendTo("body");$("div#open_review").click(function(){$("div#review").fadeIn()});$("div#close_popup").click(function(){$("div#review").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=0})});$("div#add2wish").click(function(){g.api_post("request=wishlist&op=toggle&mfcid="+m,function(b,a){a?$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished")):$("div#add2wish").removeClass("wished").text($("div#add2wish").data("ori"))})});$("div#open_more_action").click(function(){$("div#more_action").fadeToggle()});
$("div#more_action div#user div[id]").click(function(){$("div#open_more_action").click();var b=$("div#cs_page div#cs_info div."+$(this).attr("id"));dialog(void 0,$(this).text(),b.html())});$("div#more_action div#admin div[id]").click(function(){window.open("http://admin.foxe6.kozow.com/shop?"+$(this).text()+"&mfcid="+m,"_blank")});$(window).keyup(function(b){"`"===b.key&&$("div#more_action div#admin").show()})};
