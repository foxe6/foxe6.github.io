(function(a){function r(){var f=function(){var c=[],e=$("div#slideshow div.glider, .image");$("body *").each(function(){-1===e.index(this)&&"auto"===getComputedStyle(this).overflowY&&c.push(this)});return c},g=[],l=function(){},m=function(){};$(window).resize(function(){g.map(function(c){c.resize()})});var t=function(){g=[];for(var c=f(),e=0;e<c.length;e++){var k={cursorcolor:"var(--foxe6)",cursoropacitymin:.33,cursoropacitymax:.75,cursorwidth:"1vh",cursorborder:"none",cursorborderradius:"0.5vh",
grabcursorenabled:!1};"hidden"===getComputedStyle(c[e]).overflowX&&(k.horizrailenabled=!1);k=$(c[e]).niceScroll(k);g.push(k)}setTimeout(function(){$(window).trigger("resize")},100);$("div#nav div#go2top").click(function(){g.map(function(d){d.doScrollTop(0,333)})});l=function(){var d=$(this).getNiceScroll();0!==d.length&&(d.resize(),d[0].doScrollTop(1,1),d[0].doScrollLeft(1,1),setTimeout(function(){d[0].doScrollTop(0,0);d[0].doScrollLeft(0,0)},100))};m=function(){$(this).find("*").each(l)}},u=function(){$("div#nav div#go2top").off("click").click(function(){f().map(function(c){c.scrollTo(c.scrollLeft,
0)})})},b=!1;"maxTouchPoints"in navigator?b=0<navigator.maxTouchPoints:"msMaxTouchPoints"in navigator?b=0<navigator.msMaxTouchPoints:(b=window.matchMedia&&matchMedia("(pointer:coarse)"))&&"(pointer:coarse)"===b.media?b=!!b.matches:"orientation"in window?b=!0:(b=navigator.userAgent,b=/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(b)||/\b(Android|Windows Phone|iPad|iPod)\b/i.test(b));if(b)var p=u;else $("body").addClass("desktop"),p=t;var q;$(document).ajaxStop(function(){clearTimeout(q);q=setTimeout(function(){$(document).off("ajaxStop");
p();$(".popup_page").on("fadeIn_callback",m);$(".flyin_dialog > div.content").on("effect_callback",m);$("table.tabs > thead > tr > td").click(function(){l.apply($(this).closest("table.tabs").parent())})},500)})}function v(){a.check_ban(function(f,g){a.check_understood_rarp_shipping()});$("div#right_menu div#login, div#right_menu div#register").hide();$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").show()}(function(){a.check_d();window.addEventListener("pageshow",
function(f){if(f.persisted||"undefined"!=typeof window.performance&&2===window.performance.navigation.type)throw window.location.reload(!0),Error("page reloading");});$("div#loading").hide();a.donation_table("","",!1,"",a.dialog_resource.thx4donation).appendTo("div#donation_page div.content");a.cs_info().appendTo("div#cs_page div.content");$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").hide();a.check_agreed_tos();-1!==document.cookie.indexOf("username=")?v():(a.login_form().appendTo("div#login_page div.content"),
a.register_form().appendTo("div#register_page div.content"),a.login_register_form_e())})();(function(){$("div#preview").click(function(){$(this).fadeOut(function(){$(this).find("img").attr("src","");$(this).find("div.description").html("")})});$("div#menu div#hamburger").click(function(){$("div#right_menu").fadeIn();$("div#right_menu > div").hide().effect("slide",{mode:"show",direction:"left"})});$("div#right_menu div#close, div#right_menu div#login, div#right_menu div#register, div#right_menu div#cs, div#right_menu div#donation").click(function(){$("div#right_menu").fadeOut();
$("div#right_menu > div").effect("slide",{mode:"hide",direction:"left"})});$("div#menu div#search_icon, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart, div#right_menu div#faq, div#right_menu div#legal").click(function(){window.location.href=$(this).data("url");throw"page redirecting";});$("div#right_menu div#login, div#right_menu div#register, div#right_menu div#donation, div#right_menu div#cs").click(function(){$("div#"+
$(this).attr("id")+"_page").fadeIn()});$("div#right_menu div#logout").click(a.logout_e);$("div#right_menu div#logout, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart").click(function(){$("div#loading").fadeIn()});$("div#close_popup").click(function(){$("div#login_page, div#register_page, div#donation_page, div#cs_page").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=0})})})();setTimeout(function(){window.scrollTo(0,
.05*$("body").height())},100);var n=0;setInterval(function(){$("div#loading img").css({transform:"rotate("+n+"deg)"});n=(n+30)%360},111);var h=window.location.pathname.split("/").slice(1,2)[0];h||(h="index");var w=setInterval(function(){"nav_js"in window&&(clearInterval(w),window.nav_js(a))},100);h+="_js";var x=setInterval(function(){h in window&&(clearInterval(x),window[h](a),r())},100)})(new foxe6);
