(function(a){$(document).ready(function(){(function(){$.fn.old_fadeIn=$.fn.fadeIn;$.fn.fadeIn=function(b,c){$.isFunction(b)&&(c=b,b=333);return $(this).each(function(){var d=$(this);$.fn.old_fadeIn.apply(d,[b,function(){$.isFunction(c)&&c.apply(d);d.trigger("fadeIn_callback")}])})};$.fn.old_effect=$.fn.effect;$.fn.effect=function(b,c,d){return $(this).each(function(){var f=$(this);$.fn.old_effect.apply(f,[b,c,function(){$.isFunction(d)&&d.apply(f);f.trigger("effect_callback")}])})};window.addEventListener("pageshow",
function(b){if(b.persisted||"undefined"!=typeof window.performance&&2===window.performance.navigation.type)throw window.location.reload(!0),Error("page reloading");});a.donation_table("","",!1,"",a.dialog_resource.thx4donation).appendTo("div#donation_page div.content");a.cs_info().appendTo("div#cs_page div.content");$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").hide();a.check_agreed_tos();-1!==document.cookie.indexOf("username=")?(a.check_ban(),$("div#right_menu div#login, div#right_menu div#register").hide(),
$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").show(),a.check_understood_rarp_shipping()):(a.login_form().appendTo("div#login_page div.content"),a.register_form().appendTo("div#register_page div.content"),a.login_register_form_e())})();(function(){$("div#preview").click(function(){$(this).fadeOut(function(){$(this).find("img").attr("src","");$(this).find("div.description").html("")})});$("div#right_menu").css({opacity:0});$("div#menu div#hamburger").click(function(){$("div#right_menu").fadeIn();
$("div#right_menu > div").effect("slide",{mode:"show",direction:"left"})}).click();$("div#right_menu div#close, div#right_menu div#login, div#right_menu div#register, div#right_menu div#cs, div#right_menu div#donation").click(function(){$("div#right_menu").fadeOut();$("div#right_menu > div").effect("slide",{mode:"hide",direction:"left"},function(){$("div#right_menu").css({opacity:1})})}).click();$("div#menu div#search_icon, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart, div#right_menu div#faq, div#right_menu div#legal").click(function(){window.location.href=
$(this).data("url");throw"page redirecting";});$("div#right_menu div#login, div#right_menu div#register, div#right_menu div#donation, div#right_menu div#cs").click(function(){$("div#"+$(this).attr("id")+"_page").fadeIn()});$("div#right_menu div#logout").click(a.logout_e);$("div#right_menu div#logout, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart").click(function(){$("div#loading").fadeIn()});$("div#close_popup").click(function(){$("div#login_page, div#register_page, div#donation_page, div#cs_page").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=
0})});setTimeout(function(){window.scrollTo(0,.05*$("body").height())},100);var b;$(document).ajaxStop(function(){clearTimeout(b);b=setTimeout(function(){$("div#loading").fadeOut()},500)});var c=0;setInterval(function(){$("div#loading img").css({transform:"rotate("+c+"deg)"});c=(c+30)%360},111)})();var e=window.location.pathname.split("/").slice(1,2)[0];e||(e="index");e+="_js";var g=setInterval(function(){e in window&&(clearInterval(g),window[e](a))},100)})})(new foxe6);
