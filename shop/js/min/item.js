var _location="商品",review_tr='<div class="rows foxe3"></div>',review_td='<div class="row">    <div class="buyer"><b class="no_translate"><buyer></b></div>    <div class="kind"><i>款式：<kind></i></div>    <div class="comment"><comment></div>    <div class="image flex pointer"><img src="<image>" /></div>    <div class="timestamp"><timestamp></div></div>',item_info_a='<a href="/search?<k>=<v>"><text></a>',item_img="<div class='item flex'><a class='image flex<castoff>' href='/item/<mfcid>'><img src='<src>' /></a></div>";
window.item_js=function(c){delete window.item_js;var l=window.location.pathname.split("/item/").slice(-1)[0],e={item_sku:null,quantity_changed:!0,sku_active:null,quantity_active:null,app:c};e=$.extend({},e,window.common_js());$.get("/common.html",function(a){e.append_stock(a,"div#for_item");$("div#quantity_plus").click(e.quantity_plus_e(e));$("div#quantity_minus").click(e.quantity_minus_e(e));$("div#add_to_cart_descriptor").click(function(){if(!e.sku_active||0===e.quantity_active)return alert(c.dialog_resource.alert_sku_select);
var b="&sku="+e.sku_active;b=b.repeat(e.quantity_active);c.api_post("request=cart&op=add"+b,function(f,q){success(c.dialog_resource.success_sku_select)})});$("div#select_sku").click(function(){e.setup_sku_select(e,l,function(){return 1},void 0,function(){$("div#stock div#skus select").trigger("change")})});c.api_post("request=views&mfcid="+l,void 0,void 0,!1)});c.api_post("request=item_info&mfcid="+l,function(a,b){function f(d){$("div#loading").finish().fadeIn();c.image_preview_e(d,!1);var m=setInterval(function(){$("div#preview img")[0].complete&&
(clearInterval(m),$("div#loading").finish().fadeOut())},100),u=!!d.target;d=d.target||d;h=r.index(d);$("div#preview div.description").html(h+1+" / "+r.length);u?$("div#preview").fadeIn():$("div#preview").show();$("div#preview div.preview_next, div#preview div.preview_prev").css({display:"flex"})}function q(d){return function(m){m.preventDefault();m.stopPropagation();0<d&&h+1<=r.length-1?f(r[h+1]):0>d&&0<=h-1&&f(r[h-1])}}function w(d){n.eq(d).effect("slide",{mode:"show",direction:"down"},function(){setTimeout(function(){var m=
n.eq(d).outerWidth(),u=$("div#marquee").width();m>u?n.parent().animate({scrollLeft:m-u},9*m,"linear",function(){setTimeout(x,3E3)}):setTimeout(x,3E3)},1E3)})}function x(){n.parent().get(0).scrollTo(0,0);w(h);1<n.length&&(n.eq(0<=h-1?h-1:y-1).effect("slide",{mode:"hide",direction:"up"}),h=(h+1)%y)}console.log(b);for(a=0;a<b.length;a++){var k=$("div#item div#item_info div[i='"+a+"'] span");if(0!==k.length){var p=b[a];if(Array.isArray(p)){for(var v="",g=0;g<p.length;g++)v&&(v+="・"),v+=item_info_a.replace(/<text>/g,
p[g][1]).replace(/<k>/g,k.parent().attr("id")).replace(/<v>/g,p[g][0]);p=v}null!==p&&""!==p&&k.html(p)}}a=c.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,l);for(g=0;g<b[6].length;g++)0===b[6][g].indexOf("|mfc|")&&(b[6][g]=b[6][g].replace("|mfc|","https://static.myfigurecollection.net/upload/pictures/"));0===b[6].length&&(b[6]=[a]);(new Slideshow).setup(b[6],f);var r=$("div.glider-track div.glider-slide"),h=0;$("div#preview div.preview_next").click(q(1));$("div#preview div.preview_prev").click(q(-1));
b[4]&&-1===document.cookie.indexOf("off_blur")&&($("#slideshow img").addClass("blur"),warn("<div>本網頁可能含有令人反感、十六歲以上、成人內容。\n未滿十六歲人士必須在成人陪同下瀏覽。\n本網域嚴禁虛報年齡或違法瀏覽等行為。</div>",{cancel:"離開",confirm:"同意並進入"},function(d){d?$("#slideshow img").removeClass("blur"):($("#slideshow img").parent().off("mousedown"),window.history.back())}));g=$("div#item_info div#name span").eq(0);k=g.text().split("・");for(a=0;a<k.length;a++)k[a]="<a href='/search?keyword="+encodeURIComponent(k[a])+"'>"+k[a]+"</a>";g.html(k.join("・"));
h=0;var n=$("div#marquee.rows a.row"),y=n.length;n.hide().eq(0).show();x();for(a=0;a<b[11].length;a++)$("div#related_items div.content").append(item_img.replace(/<mfcid>/g,b[11][a][0]).replace(/<castoff>/g,-1===document.cookie.indexOf("off_blur=")&&b[11][a][1]?" blur":"").replace(/<src>/g,b[11][a][2]?b[11][a][2]:c.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,b[11][a][0])));$("div#related_items div.content").trigger("scroll")});c.api_post("request=review&op=get&mfcid="+l,function(a,b){if(0!==b.length){$("div#review #no_review").hide();
$("div#review span#amount_review").text(b.length);b=b.sort(function(q,w){return window.str2epoch(w[0])-window.str2epoch(q[0])});a="";for(var f=0;f<b.length;f++)a+=review_td.replace(/<timestamp>/g,b[f][0]).replace(/<buyer>/g,b[f][1]).replace(/<comment>/g,$("<div/>").text(b[f][3]).html()).replace(/<image>/g,b[f][4]?"/upload/review/"+b[f][4]:"").replace(/<kind>/g,b[f][5]);$("div#review div.content").append($(review_tr).append(a)).trigger("scroll");$("div#review div.image").click(c.image_preview_e)}});
-1!==document.cookie.search(/username=/)&&c.api_post("request=wishlist&op=is_wished&mfcid="+l,function(a,b){b&&$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished"))},void 0,!1);$("div#review").appendTo("body");$("div#open_review").click(function(){$("div#review").fadeIn()});$("div#close_popup").click(function(){$("div#review").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=0})});$("div#add2wish").click(function(){-1!==document.cookie.search(/username=/)&&
c.api_post("request=wishlist&op=toggle&mfcid="+l,function(a,b){b?$("div#add2wish").addClass("wished").text($("div#add2wish").data("wished")):$("div#add2wish").removeClass("wished").text($("div#add2wish").data("ori"))})});$("div#open_more_action").click(function(){$("div#more_action").fadeToggle()});$("div#more_action div#user div[id]").click(function(){$("div#open_more_action").click();var a=$("div#cs_page div#cs_info div."+$(this).attr("id"));dialog(void 0,$(this).text(),a.html())});$("div#more_action div#admin div[id]").click(function(){window.open("http://admin.foxe6.kozow.com/shop?"+
$(this).text()+"&mfcid="+l,"_blank")});$(window).keyup(function(a){"`"===a.key&&$("div#more_action div#admin").show()});$("div#right_menu div.menu div#about").next().click(function(){$("div#more_action div#admin").show()});var t=$("div#review div.content");c.setup_scroll_hints(t);t.trigger("scroll");t=$("div#related_items div.content");c.setup_scroll_hints(t);t.trigger("scroll");$("a#toc_toggle").click(function(a){a.stopPropagation();a.preventDefault();a=$(this).data("state")?0:1;$(this).data("state",
a);$(this).text($(this).data(a.toString()));$("div#toc").toggle();$("div#item")[0].scrollTop=0;$("div#item")[0].scrollTop=$("div#toc_top").offset().top-$("div#menu").height()})};
