(function(a){$(document).ready(function(){(function(){window.addEventListener("pageshow",function(c){if(c.persisted||"undefined"!=typeof window.performance&&2===window.performance.navigation.type)throw window.location.reload(!0),Error("page reloading");});a.donation_table("","",!1,"",a.dialog_resource.thx4donation).appendTo("div#donation_page div.content");a.cs_info().appendTo("div#cs_page div.content");$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").hide();a.check_agreed_tos();
-1!==document.cookie.indexOf("username=")?(a.check_ban(),$("div#right_menu div#login, div#right_menu div#register").hide(),$("div#right_menu div#logout, div#right_menu div#cs, div#right_menu div.logged_in").show(),a.check_understood_rarp_shipping()):(a.login_form().appendTo("div#login_page div.content"),a.register_form().appendTo("div#register_page div.content"),a.login_register_form_e())})();(function(){$("div#preview").click(function(){$(this).fadeOut(function(){$(this).find("img").attr("src","");
$(this).find("div.description").html("")})});$("div#right_menu").css({opacity:0});$("div#menu div#hamburger").click(function(){$("div#right_menu").fadeIn();$("div#right_menu > div").effect("slide",{mode:"show",direction:"left"})}).click();$("div#right_menu div#close, div#right_menu div#login, div#right_menu div#register, div#right_menu div#cs, div#right_menu div#donation").click(function(){$("div#right_menu").fadeOut();$("div#right_menu > div").effect("slide",{mode:"hide",direction:"left"})});setTimeout(function(){$("div#right_menu div#close").click();
setTimeout(function(){$("div#right_menu").css({opacity:1})},500)},500);$("div#menu div#search_icon, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart, div#right_menu div#faq, div#right_menu div#legal").click(function(){window.location.href=$(this).data("url");throw"page redirecting";});$("div#right_menu div#login, div#right_menu div#register, div#right_menu div#donation, div#right_menu div#cs").click(function(){$("div#"+
$(this).attr("id")+"_page").fadeIn()});$("div#right_menu div#logout").click(a.logout_e);$("div#right_menu div#logout, div#right_menu div#account, div#right_menu div#wishlist, div#right_menu div#order, div#nav div#news, div#nav div#home, div#nav div#cart").click(function(){$("div#loading").fadeIn()});$("div#close_popup").click(function(){$("div#login_page, div#register_page, div#donation_page, div#cs_page").fadeOut().each(function(){$(this).children("div.content")[0].scrollTop=0})});setTimeout(function(){window.scrollTo(0,
.05*$("body").height())},100);var c;$(document).ajaxStop(function(){clearTimeout(c);c=setTimeout(function(){$("div#loading").fadeOut()},500)});var d=0;setInterval(function(){$("div#loading img").css({transform:"rotate("+d+"deg)"});d=(d+30)%360},111)})();var b=window.location.pathname.split("/").slice(1,2)[0];b||(b="index");b+="_js";var e=setInterval(function(){b in window&&(clearInterval(e),window[b](a))},100),f=setInterval(function(){"nav_js"in window&&(clearInterval(f),window.nav_js(a))},100)})})(new foxe6);
