(function(I){function J(e){for(var b=[],a=0,c=0;c<e.length;c++){var d=e.charCodeAt(c);128>d?b[a++]=d:(2048>d?b[a++]=d>>6|192:(55296==(d&64512)&&c+1<e.length&&56320==(e.charCodeAt(c+1)&64512)?(d=65536+((d&1023)<<10)+(e.charCodeAt(++c)&1023),b[a++]=d>>18|240,b[a++]=d>>12&63|128):b[a++]=d>>12|224,b[a++]=d>>6&63|128),b[a++]=d&63|128)}return b}function K(e){for(var b=[],a=0,c=0;a<e.length;){var d=e[a++];if(128>d)b[c++]=String.fromCharCode(d);else if(191<d&&224>d){var g=e[a++];b[c++]=String.fromCharCode((d&
31)<<6|g&63)}else if(239<d&&365>d){g=e[a++];var k=e[a++],h=e[a++];d=((d&7)<<18|(g&63)<<12|(k&63)<<6|h&63)-65536;b[c++]=String.fromCharCode(55296+(d>>10));b[c++]=String.fromCharCode(56320+(d&1023))}else g=e[a++],k=e[a++],b[c++]=String.fromCharCode((d&15)<<12|(g&63)<<6|k&63)}return b.join("")}function E(e,b){return J(b).map(function(a,c){return a^e[Math.floor(c%e.length)]})}function L(e,b){return K(b.map(function(a,c){return a^e[Math.floor(c%e.length)]}))}var D=new function(e){var b,a,c,d,g,k,h;var m=
function(l,n){for(var q;0!==n;)q=n,n=l%n,l=q;return l};var f=function(l,n,q,p){var t,u;var y=function(F){p?r.push(F):r.push(d.charAt(F))};var v=u=0;var r=[];var G=l.length;for(t=0;t<G;t+=1){v+=n;if(p){var C=l[t];var z=d.indexOf(C);if(C===b)break;else if(0>z)throw'the character "'+C+'" is not a member of '+d;}else if(z=l[t],(z|h)!==h)throw z+" is outside the range 0-"+h;for(u=u<<n|z;v>=q;)v-=q,y(u>>v),u&=g[v]}if(!p&&0<v)for(y(u<<q-v);0<r.length%k;)r.push(b);return p?r:r.join("")};this.encode=function(l){return f(l,
a,c,!1)};this.decode=function(l){return f(l,c,a,!0)};(function(){var l;b=e.pad||"";a=e.dataBits;c=e.codeBits;d=e.keyString;var n=Math.max(a,c);var q=0;g=[];for(l=0;l<n;l+=1)g.push(q),q+=q+1;h=q;k=a/m(a,c)})()}({dataBits:8,codeBits:5,keyString:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",pad:"="}),M=function(e,b){console.log([e,b,D.encode(E(e,b))]);return D.encode(E(e,b))},w={img_src_mfcid:"https://static.myfigurecollection.net/pics/figure/large/<mfcid>.jpg",confirm_register:"一旦註冊後，將不能變更帳號名稱、電話號碼、電子郵箱。<br/>確定註冊？",
success_register:"成功註冊！請登陸。",confirm_deregister:"確定註銷？",success_deregister:"成功註銷！",success_logout:"成功登出！",alert_upload_proof_oversize:"照片大小過大，請壓縮或裁剪照片後再次上載。",alert_upload_proof_type:"請選擇照片格式。",alert_upload_proof_select:"請先選擇照片，然後點擊上載。",success_upload_proof_notify_failed:"照片上載成功。<br/>未能通知客服核對。<br/>請聯系客服。",success_upload_proof_notify_success:"照片上載成功。<br/>已通知客服核對。<br/>請耐心等候。",alert_upload_proof:"照片上載失敗。<br/>請重新上載或尋找客服核對。",success_review:"成功評論！",confirm_order_delete:"確定刪除訂單？",success_order_delete:"成功刪除訂單！",
confirm_draw:"一旦確定後，將不退回金幣。<br/>確定花費<fees>枚金幣？",success_thanks:"多謝參與！",confirm_change_pw:"確定變更密碼？",success_change_pw:"成功變更密碼！",confirm_change_postal_info:"確定變更郵寄資料？",success_change_postal_info:"成功變更郵寄資料！",text_upload_proof_1:"已選擇照片",text_upload_proof_2:"上載中，請稍候…",syserr_prefix:"<div>請刷新重試。如持續出現錯誤，請電郵回報問題：foxe6@pm.me</div>",syserr_title:"系統錯誤",syserr_button:"請刷新重試",alert_sku_select:"請選擇款式",success_sku_select:"成功加入購物車！",alert_item_select:"請選擇商品",alert_cart_exist:"購物車內已存在此款式",confirm_order_cancel:"確定取消訂單？",
success_order_cancel:"成功取消訂單！",alert_sku_max_quantity:"款式 <kind> 最大數量為 <max_quantity>",alert_sku_stock:"款式 <kind> 缺貨",alert_sku_deadline:"款式 <kind> 已截訂",confirm_cart_delete:"確定刪除商品？",success_cart_delete:"成功刪除商品！",confirm_off_blur:"確定關閉內容過濾？",success_off_blur:"成功關閉內容過濾！",ac_row_wrap:"<div class='tr'><div class='td row'></div></div>",faq_descriptor:"<div class='rows foxe2'><div class='row flex descriptor'><descriptor>　<span class='toggle'></span></div></div><div><qa></div>",tos_title:"歡迎來臨<title>！",
tos_content:$("<div>通過瀏覽本網域的頁面，您即同意本網域的<a href='http://foxe6.kozow.com/tos'>Terms of Service</a>、<a href='http://foxe6.kozow.com/disclaimer'>Disclaimer</a>、<a href='http://foxe6.kozow.com/privacy'>Privacy Policy</a>。<br/></div>")[0],tos_buttons:{cancel:"不同意並離開",confirm:"同意並進入"},rarp_shipping_title:"歡迎使用<title>！",rarp_shipping_content:$('<div style="text-align: left;">親愛的顧客，為增強使用體驗，請閱讀常見問題。<br/>通過交易本網域的商品，您即同意本網域的<a href="http://foxe6.kozow.com/rarp">Return and Refund Policy</a>、<a href="http://foxe6.kozow.com/shipping">Shipping</a>。</div>')[0],
topup_th:'<td id="<k>"><k></td>',topup_td_qrcodes:'<div id="<k>">    <img src="<src>" loading="lazy" referrerpolicy="no-referrer" />    <div style="font-size: 2.5vh;">請先打開<k>。<br/>然後開啟二維碼掃描功能。<br/>最後把相機鏡頭對準二維碼付款。</div></div>',topup_th_fps:'<td id="fps">轉數快</td>',topup_td_fps:'<div id="fps">    識別碼（ID）：<fps><br/>    收款人：<payee></div>',topup_th_bank:'<td id="bank">銀行轉帳</td>',topup_td_bank:'<div id="bank">    銀行：<company><br/>    銀行戶口：<account><br/>    收款人：<payee></div>',topup_th_paypal:'<td id="paypal">Paypal</td>',
topup_td_paypal:'<div id="paypal">請聯系客服獲取Paypal Invoice及處理交易資料。</div>',thx4donation:"請通過捐款方式<br/>支持開發人員。",dialog_ok:"了解並關閉",alert_title:"溫馨提示",success_title:"操作成功",success_ok:"好的",confirm_title:"敬請注意",confirm_cancel:"取消",confirm_confirm:"確定"},N=function(){var e=function(){var k=[],h=$("div#slideshow div.glider");$("body *").each(function(){for(var m=0;m<h.length;m++)if(h[m]===this)return;m=getComputedStyle(this);"auto"!==m.overflow&&"auto"!==m.overflowX&&"auto"!==m.overflowY||k.push(this)});return k},
b=function(){var k=[];e().map(function(f){var l={cursorcolor:"var(--foxe6)",cursoropacitymin:.33,cursoropacitymax:.75,cursorwidth:"1vh",cursorborder:"none",cursorborderradius:"0.5vh",grabcursorenabled:!1};"hidden"===getComputedStyle(f).overflowX&&(l.horizrailenabled=!1);f=$(f).niceScroll(l);k.push(f)});$(window).resize(function(){k.map(function(f){f.resize()})});setTimeout(function(){$(window).trigger("resize")},1E3);$("div#nav div#go2top").click(function(){k.map(function(f){f.doScrollTop(0,333)})});
var h=function(){var f=$(this).getNiceScroll();0!==f.length&&(f.resize(),f[0].doScrollTop(1,1),f[0].doScrollLeft(1,1),setTimeout(function(){f[0].doScrollTop(0,0);f[0].doScrollLeft(0,0)},100))},m=function(){$(this).find("*").each(h)};$(".popup_page").bind("fadeIn_callback",m);$(".flyin_dialog > div.content").bind("effect_callback",m);$("table.tabs > thead > tr > td").click(function(){h.apply($(this).closest("table.tabs").parent())})},a=function(){e=e();$("div#nav div#go2top").click(function(){e.map(function(k){k.scrollTo(k.scrollLeft,
0)})})},c=!1;"maxTouchPoints"in navigator?c=0<navigator.maxTouchPoints:"msMaxTouchPoints"in navigator?c=0<navigator.msMaxTouchPoints:(c=window.matchMedia&&matchMedia("(pointer:coarse)"))&&"(pointer:coarse)"===c.media?c=!!c.matches:"orientation"in window?c=!0:(c=navigator.userAgent,c=/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(c)||/\b(Android|Windows Phone|iPad|iPod)\b/i.test(c));if(c)var d=a;else $("<style>* ::-webkit-scrollbar {    -webkit-appearance: none;}* ::-webkit-scrollbar:vertical {    width: 0;}* ::-webkit-scrollbar:horizontal {    height: 0;}* ::-webkit-scrollbar-thumb {    border: 0;}* ::-webkit-scrollbar-track {    border-radius: 0;}* {    scrollbar-width: none;}</style>").appendTo("head"),
d=b;var g;$(document).ajaxStop(function(){clearTimeout(g);g=setTimeout(function(){$(document).off("ajaxStop");d()},500)})},O=function(){setInterval(function(){$("img[src*='myfigurecollection']:not(.checked)").each(function(){-1!==$(this).attr("src").indexOf("/-1.jpg")?($(this).attr("src","https://foxe6.github.io/root/img/asset/icon/foxe6.png"),$(this).parent().css({"background-color":"black"})):this.complete&&(0===this.naturalWidth&&$(this).attr("src",$(this).attr("src").replace("/large/","/big/")),
$(this).addClass("checked"))})},1E3)};window.dialog=function(e,b,a,c,d){var g=e;"string"===typeof a&&("syserr"===e&&-1!==a.indexOf("Traceback (most recent call last):")?a=w.syserr_prefix+"<textarea class='log'>"+a+"</textarea>":("syserr"===e&&(e="alert"),a=a.replace(/\r?\n/g,"$&<br/>")),a=$("<div/>").html(a)[0]);"warn"===g&&(e="confirm");a={closeOnEsc:!0,closeOnClickOutside:!1,content:a};b?a.title=b:"alert"===e?a.title=w.alert_title:"confirm"===e?a.title=w.confirm_title:"success"===e&&(a.title=w.success_title);
c?"confirm"===e?a.buttons=c:a.button=c:"confirm"===e?a.buttons={cancel:w.confirm_cancel,confirm:w.confirm_confirm}:a.button="success"===e?w.success_ok:w.dialog_ok;b=swal(a);"warn"===g?$(".swal-overlay").addClass("warn"):$(".swal-overlay").removeClass("warn");d&&b.then(d);$("div.swal-icon img").hide();e&&0!==$("div.swal-title").length&&(d="https://foxe6.github.io/common/img/asset/swal/"+e+".svg",0===$("div.swal-icon").length?$("div.swal-title").before("<div class='swal-icon'><img class='"+e+"' src='"+
d+"' loading='lazy' referrerpolicy='no-referrer' /></div>"):$("div.swal-icon img").attr("class",e).attr("src",d))};window.alert=function(e,b){dialog("alert",void 0,e,void 0,b)};window.warn=function(e,b,a){dialog("warn",void 0,e,b,a)};window.success=function(e,b){dialog("success",void 0,e,void 0,b)};window.confirm=function(e,b){dialog("confirm",void 0,e,void 0,b)};window.syserr=function(e,b){dialog("syserr",w.syserr_title,e,w.syserr_button,b)};window.str2epoch=function(e){return Date.parse(e)/1E3};
window.epoch=function(){return(new Date).getTime()/1E3};var x,B=function(){x={};var e=document.cookie.matchAll(/([^=]+)(?:=)([^; ]+)(?:; |$)/g);e=Array.from(e,function(a){return a});for(var b=0;b<e.length;b++)x[e[b][1]]='"'===e[b][2][0]&&'"'===e[b][2][e[b][2].length-1]?e[b][2].slice(1,-1):e[b][2]};B();var A,H=0;(function(){$.fn.old_fadeIn=$.fn.fadeIn;$.fn.fadeIn=function(e,b){$.isFunction(e)&&(b=e,e=333);return $(this).each(function(){var a=$(this);$.fn.old_fadeIn.apply(a,[e,function(){$.isFunction(b)&&
b.apply(a);a.trigger("fadeIn_callback")}])})};$.fn.old_effect=$.fn.effect;$.fn.effect=function(e,b,a){return $(this).each(function(){var c=$(this);$.fn.old_effect.apply(c,[e,b,function(){$.isFunction(a)&&a.apply(c);c.trigger("effect_callback")}])})};N();$("head").append("<style>    div#understand_tou {    vertical-align: middle;}div#agree_tou {    font-size: 3.5vh;    display: inline-flex;    justify-content: center;    align-items: center;    width: 3.5vh;    height: 3.5vh;    vertical-align: text-bottom;}div#agree_tou > * {    pointer-events: none;    position: absolute;}div#forget_pw {    background-color: var(--foxe1);    color: var(--foxe6);}div#go2login,div#go2register {    background-color: var(--foxe3a);    color: var(--foxe6);}</style>");
$("head").append("<style>div#not_paid thead td img {    width: 5vh;    height: 5vh;    pointer-events: none;    background-color: var(--foxe6a);    border-radius: 1vh;}div#not_paid tbody td img {    width: 30vh;    height: 30vh;}div#not_paid div#header_notes{    margin-top: 1vh;}div#not_paid div#footer_notes{    margin-bottom: 1vh;}div#i_paid div#upload_proof_preview {    height: 45vh;    width: 100%;}div#i_paid div#upload_proof_preview img {    max-width: 100%;    max-height: 100%;    pointer-events: none;}div#i_paid div#upload_proof {    margin-left: auto;    margin-right: auto;}div#i_paid div#upload_proof form {    display: inline-block;    width: 100%;}div#i_paid div#upload_proof input.upload.button {    background-color: var(--foxe6);}</style>");
O()})();I.foxe6=function(){if(1>H){H++;var e=setInterval(function(){"undefined"!==typeof _location&&(clearInterval(e),$("div#menu div#location").text(_location),$("title").data("title")||$("title").data("title",document.title),document.title=_location+" "+$("title").data("title"))},100),b=this;b.dialog_resource=w;b.input_enter_e=function(a){13===a.keyCode&&$(a.target).closest("form").find("div#submit").click()};b.image_preview_e=function(a,c){a=$(a.target||a);var d=a.find("img");!d.hasClass("blur")&&
(d=d.attr("src"))&&($("div#preview img").attr("src",d),$("div#preview div.description").html(a.html().replace(/<br\/?>/g,"\n").replace(/<.*?>/g,"").trim().replace("\n","<br/>")),$("div#preview").css({display:"flex"}).show().hide(),"undefined"===typeof c&&$("div#preview").fadeIn())};b.setup_qrcode=function(){var a=setInterval(function(){if(A){clearInterval(a);for(var c=$("div.qrcode"),d=0;d<c.length;d++){var g=c.eq(d).data("url")+A;new QRCode(c.get(d),g);g="<a href='"+g+"' target='_blank'>"+g+"</a>";
c.eq(d).parent().next().html(g)}}},500)};b.post=function(a,c,d,g,k){var h,m=[];for(h=0;h<x._k.length;h++)m.push(x._k.charCodeAt(h));h="undefined"===typeof c?"":"string"===typeof c?c:c.serialize();h=window.LZString.compressToBase64(x._xsrf+"="+M(m,h).replace(/=/g,""));$("div#loading").finish().fadeIn();$.post(a,h,function(f){f=window.LZString.decompressFromBase64(f);f=L(m,D.decode(f));void 0!==d&&d(c,f);$("div#loading").fadeOut()}).fail(function(f){f=f.responseText;try{f=JSON.parse(f).msg}catch(l){}$("div#loading").fadeOut();
void 0!==g&&g(c,f);"undefined"!==typeof k&&!0!==k||syserr(f)})};b.api_post=function(a,c,d,g){b.post("/api",a,function(k,h){h=JSON.parse(h);"string"===typeof h?(void 0!==d&&d(k,h),"undefined"!==typeof g&&!0!==g||alert(h)):void 0!==c&&c(k,h)},d,g)};b.check_agreed_tos=function(){B();"agreed_tos"in x||dialog("confirm",b.dialog_resource.tos_title.replace(/<title>/g,document.title.split(" | ").slice(-1)[0]),b.dialog_resource.tos_content,b.dialog_resource.tos_buttons,function(a){if(a)b.api_post("request=agreed_tos");
else{var c=window.location.href;window.history.back();setTimeout(function(){window.location.href===c&&window.close();throw"page going back";},500)}})};b.check_understood_rarp_shipping=function(){B();"understood_rarp_shipping"in x||dialog(void 0,b.dialog_resource.rarp_shipping_title.replace(/<title>/g,document.title.split(" | ").slice(-1)[0]),b.dialog_resource.rarp_shipping_content,void 0,function(a){b.api_post("request=understood_rarp_shipping")})};b.login_register_form_e=function(){$("div#agree_tou").click(function(a){$(a.target).children().fadeToggle();
$("input[name='agree_tou']").prop("checked",!$("input[name='agree_tou']").prop("checked"))});$("div#go2register, div#go2login").click(function(a){var c=$(a.target).attr("id").replace("go2","");$(a.target).closest("div.content").parent().fadeOut();$("div#"+c+"_page").fadeIn()});$("div#forget_pw").click(function(){$(this).closest("div.content").parent().fadeOut();$("div#cs_page").fadeIn()});$("form.simple div.input input").keyup(b.input_enter_e)};b.login_form=function(){var a=$('<form class="simple">    <div class="descriptor">登陸</div>    <input type="hidden" name="request" value="login" />    <div class="input"><input name="username" placeholder="帳號名稱" /></div>    <div class="input"><input name="password" placeholder="密碼" type="password" /></div>    <div id="submit" class="flex button">提交</div>    <div id="forget_pw" class="flex button">忘記密碼</div>    <div id="go2register" class="flex button">前往註冊</div></form>');
a.find("div#submit").click(function(){b.api_post(a,function(c,d){window.location.reload(!0);throw"page reloading";},function(c,d){alert(d,function(g){c[0].reset()})},!1)});return a};b.register_form=function(){var a=$('<form class="simple">    <div class="descriptor">註冊</div>    <input type="hidden" name="request" value="register" />    <div class="input"><input name="username" placeholder="帳號名稱" /></div>    <div class="input"><input name="phone" placeholder="電話號碼(格式:(852)12345678)" /></div>    <div class="input"><input name="email" placeholder="電子郵箱" /></div>    <div class="input"><input name="password" placeholder="密碼(格式:Ab12345678)" type="password" /></div>    <div id="understand_tou">        <div id="agree_tou"><span>☐</span><span style="display: none;">☑</span></div>        <input name="agree_tou" type="checkbox" style="display: none;" />        我已閱讀並同意本網域的<a href="http://foxe6.kozow.com/tou">Terms of Use</a>。    </div>    <div id="submit" class="flex button">提交</div>    <div id="go2login" class="flex button">前往登陸</div></form>');
a.find("div#submit").click(function(){confirm(b.dialog_resource.confirm_register,function(c){c&&b.api_post(a,function(d,g){success(b.dialog_resource.success_register,function(k){$("div#register_page").fadeOut();$("div#login_page").fadeIn();$("div#login_page").find("input[name='username']").val(d.find("input[name='username']").val());d[0].reset()})})})});return a};b.logout_e=function(){b.api_post("request=logout",function(a,c){success(b.dialog_resource.success_logout,function(d){window.location.reload(!0)});
throw Error("page reloading");},function(a,c){alert(c,function(d){window.location.reload(!0)});throw Error("page reloading");},!1)};b.ac_info=function(){var a=$('<div id="ac_info" class="table rows foxe3">    <div class="tr">        <div class="td row">            <div>基礎資料</div>            <table>                <tr>                    <td style="word-break: keep-all;">電話號碼</td>                    <td id="phone"></td>                </tr>                <tr>                    <td style="word-break: keep-all;">電郵地址</td>                    <td id="email" style="word-break: break-all"></td>                </tr>                <tr>                    <td style="word-break: keep-all;">郵寄資料</td>                    <td id="postal_info"></td>                </tr>            </table>        </div>    </div>    <div class="tr">        <div class="td row">            <div>帳號註銷</div>            <table>                <tr>                    <td>帳 號 一 旦 註 銷 ， 帳 號 所 有 資 料 將 包 括 但 不 限 於 停 止 使 用 、 處 理 、 操 作 、 管 理 及 存 取 。</td>                </tr>            </table>            <form class="simple">                <div id="deregister" class="flex button">我確定註銷此帳號</div>            </form>        </div>    </div>    <div class="tr">        <div class="td row">            <div>內容過濾</div>            <table>                <tr>                    <td>                        本 網 域 過 濾 並 隱 藏 令 人 反 感 、 十 六 歲 以 上 、 成 人 內 容 。<br/>                        未 滿 十 六 歲 人 士 必 須 在 成 人 陪 同 下 瀏 覽 本 網 頁 。<br/>                        本 網 域 嚴 禁 虛 報 年 齡 或 違 法 進 入 等 行 為 。                    </td>                </tr>            </table>            <form class="simple">                <div id="off_blur" class="flex button">我同意並關閉內容過濾</div>            </form>        </div>    </div></div><div id="history" class="table rows foxe3">    <div class="thead">        <div class="tr">            <div class="td row header">時間戳記</div>            <div class="td row header">操作</div>        </div>    </div>    <div id="history_target" class="tbody"></div></div>');
b.api_post("request=ac_info",function(c,d){a.find("td#postal_info").text(d.postal_info);a.find("td#phone").text(d.phone);a.find("td#email").text(d.email);if(0!==d.history.length){c="";for(var g=0;g<d.history.length;g++)c+="<div class='tr'>",c+="<div class='td row'>"+d.history[g][1]+"</div>",c+="<div class='td row' style='word-break: break-all;'>"+d.history[g][0]+"</div>",c+="</div>";a.find("#history_target").html(c)}$("div#ac thead td[id]").click(function(k){$(k.target).parent().find("td").removeClass("selected");
$(k.target).addClass("selected");$("div#ac div#ac_info, div#ac div#record, div#ac div#history").hide();$("div#ac div#"+$(k.target).attr("id")).stop().fadeIn();k=$("div#ac div.content");0!==k.length&&(k[0].scrollTop=0)}).eq(0).click()});a.find("div#deregister").click(function(){confirm(b.dialog_resource.confirm_deregister,function(c){c&&b.api_post("request=deregister",function(d,g){success(b.dialog_resource.success_deregister,function(k){window.location.href="/";throw"page redirecting";})})})});a.find("div#off_blur").click(function(){confirm(b.dialog_resource.confirm_off_blur,
function(c){c&&b.api_post("request=off_blur",function(d,g){success(b.dialog_resource.success_off_blur)})})});return a};b.form_submit_e=function(a,c,d){a.find("div#submit").click(function(g){var k=$(g.target).closest("form");confirm(c,function(h){h&&b.api_post(k.serialize(),function(m,f){success(d,function(l){window.location.reload(!0)});throw"page reloading";})})})};b.change_password=function(){var a=$('<div>變更密碼</div><form class="simple">    <input type="hidden" name="request" value="change_password" />    <div class="input"><input name="phone" placeholder="電話號碼" /></div>    <div class="input"><input name="email" placeholder="電子郵箱" /></div>    <div class="input"><input name="old_password" type="password" placeholder="舊密碼" /></div>    <div class="input"><input name="new_password_1" type="password" placeholder="新密碼" /></div>    <div class="input"><input name="new_password_2" type="password" placeholder="確認新密碼" /></div>    <div id="submit" class="flex button">提交</div></form>');
b.form_submit_e(a,b.dialog_resource.confirm_change_pw,b.dialog_resource.success_change_pw);return a};b.update_postal_info=function(){var a=$('<div>更新郵寄資料</div><form class="simple">    <input type="hidden" name="request" value="update_postal_info" />    <div class="input"><input name="password" type="password" placeholder="密碼" /></div>    <div class="input"><input class="postal_info" placeholder="收件人姓名" /></div>    <div class="input"><input class="postal_info" placeholder="收件人電話" /></div>    <div class="input"><input class="postal_info" placeholder="收件人地址" /></div>    <input type="hidden" name="postal_info" />    <div id="submit" class="flex button">提交</div></form>');
a.find("input.postal_info").keyup(function(){a.find("input[name='postal_info']").val($.map($("input.postal_info"),function(c){return $(c).val()}).join("，"))});b.form_submit_e(a,b.dialog_resource.confirm_change_postal_info,b.dialog_resource.success_change_postal_info);return a};b.check_ban=function(a){B();"username"in x&&b.api_post("request=check_ban",a)};b.setup_payment_table=function(a,c,d,g,k,h,m){$.get("https://foxe6.github.io/common/js/cs.json",function(f){A=f.cs.whatsapp;var l="<tr>",n="",q;
for(q in f.topup.qrcode.images)""!==f.topup.qrcode.images[q]&&(l+=b.dialog_resource.topup_th.replace(/<k>/g,q),n+=b.dialog_resource.topup_td_qrcodes.replace(/<k>/g,q).replace(/<src>/g,f.topup.qrcode.path+f.topup.qrcode.images[q]));""!==f.topup.fps&&(l+=b.dialog_resource.topup_th_fps,n+=b.dialog_resource.topup_td_fps.replace(/<fps>/g,f.topup.fps).replace(/<payee>/g,f.topup.payee));""!==f.topup.bank.account&&(l+=b.dialog_resource.topup_th_bank,n+=b.dialog_resource.topup_td_bank.replace(/<company>/g,
f.topup.bank.company).replace(/<account>/g,f.topup.bank.account).replace(/<payee>/g,f.topup.payee));l+=b.dialog_resource.topup_th_paypal;n+=b.dialog_resource.topup_td_paypal;l+="</tr>";a.find("div#not_paid table tbody td#instructions").html(n);a.find("div#not_paid thead td[id].selected").click();a.find("div#not_paid table thead").html(l);l=a.find("div#not_paid table thead td[id]");for(n=0;n<l.length;n++)l.eq(n).html("<img src='"+f.topup.wallet.path+f.topup.wallet.images[l.eq(n).attr("id")]+"' loading='lazy' referrerpolicy='no-referrer' />");
a.find("div#not_paid thead td[id]").click(function(p){$(p.target).parent().find("td").removeClass("selected");$(p.target).addClass("selected");a.find("div#not_paid tbody td#instructions div[id]").hide();a.find("div#not_paid tbody td#instructions div#"+$(p.target).attr("id")).show()}).eq(0).click();a.find("td#not_paid, td#i_paid").click(function(p){$(p.target).parent().find("td").removeClass("selected");$(p.target).addClass("selected");a.find("div#not_paid, div#i_paid").hide();a.find("div#"+$(p.target).attr("id")).fadeIn()}).eq(0).click();
a.find("div#header_notes").html(c);a.find("div#footer_notes").html(d);g?(f=function(){a.find("td#amount_due span").html(k)},f(),setInterval(f,1E3)):a.find("td#amount_due").html(h);m()})};b.donation_table=function(a,c,d,g,k){var h=$('<table class="tabs foxe2">    <thead>        <tr>            <td id="not_paid">現在付款</td>            <td id="i_paid">我已付款</td>        </tr>    </thead>    <tbody>        <tr>            <td class="content" colspan="2">                <div id="not_paid">                    <div id="header_notes"></div>                    <table class="tabs foxe2">                        <thead></thead>                        <tbody>                            <tr>                                <td id="amount_due" colspan="99">                                    <b>應付金額</b><br/>                                    港元＄<span></span>                                </td>                            </tr>                            <tr>                                <td id="instructions" colspan="99"></td>                            </tr>                        </tbody>                    </table>                    <div id="footer_notes"></div>                </div>                <div id="i_paid" style="margin: 1vh;">                    <div>如已完成付款，請上載收據照片以便客服核對。</div>                    <div id="upload_proof">                        <form class="simple">                            <label for="upload_proof_file_image" class="flex button">選擇照片</label>                            <input id="upload_proof_file_image" type="file" name="image" style="display: none;" />                            <input type="hidden" name="request" value="upload_proof" />                            <input class="upload flex button" type="button" value="上載照片" />                        </form>                        <div id="upload_proof_preview">                            <img />                        </div>                    </div>                </div>            </td>        </tr>    </tbody></table>').find("div#not_paid").wrap("<div></div>").parent();
b.setup_payment_table(h,a,c,d,g,k,function(){h.find("td#paypal, div#paypal").remove()});return h};b.payment_table=function(a,c,d,g,k,h){var m=$('<table class="tabs foxe2">    <thead>        <tr>            <td id="not_paid">現在付款</td>            <td id="i_paid">我已付款</td>        </tr>    </thead>    <tbody>        <tr>            <td class="content" colspan="2">                <div id="not_paid">                    <div id="header_notes"></div>                    <table class="tabs foxe2">                        <thead></thead>                        <tbody>                            <tr>                                <td id="amount_due" colspan="99">                                    <b>應付金額</b><br/>                                    港元＄<span></span>                                </td>                            </tr>                            <tr>                                <td id="instructions" colspan="99"></td>                            </tr>                        </tbody>                    </table>                    <div id="footer_notes"></div>                </div>                <div id="i_paid" style="margin: 1vh;">                    <div>如已完成付款，請上載收據照片以便客服核對。</div>                    <div id="upload_proof">                        <form class="simple">                            <label for="upload_proof_file_image" class="flex button">選擇照片</label>                            <input id="upload_proof_file_image" type="file" name="image" style="display: none;" />                            <input type="hidden" name="request" value="upload_proof" />                            <input class="upload flex button" type="button" value="上載照片" />                        </form>                        <div id="upload_proof_preview">                            <img />                        </div>                    </div>                </div>            </td>        </tr>    </tbody></table>');
b.setup_payment_table(m,a,c,d,g,k,function(){var f,l=m.find("div#i_paid div#upload_proof form input[type='file']").change(function(n){var q=m.find("div#i_paid div#upload_proof form label");q.hasClass("active")&&q.removeClass("active").text(q.text().slice(1));m.find("div#upload_proof_preview img").attr("src","");var p=n.target.files[0];"type"in p&&"image"===p.type.split("/")[0]?10485760<p.size?(n.target.value="",alert(b.dialog_resource.alert_upload_proof_oversize)):(n=new FileReader,n.onload=function(t){f=
t.target.result;m.find("div#upload_proof_preview img").attr("src",f);f=[f.split(",").slice(1)[0],p.name.split(".").slice(-1)[0]];q.addClass("active").text(b.dialog_resource.text_upload_proof_1)},n.readAsDataURL(p)):(n.target.value="",alert(b.dialog_resource.alert_upload_proof_type))});m.find("div#i_paid div#upload_proof input.upload").click(function(n){if(0===l[0].files.length)alert(b.dialog_resource.alert_upload_proof_select);else if(10485760<l[0].files[0].size)n.target.value="",alert(b.dialog_resource.alert_upload_proof_oversize);
else{var q;b.api_post("request=ac_info&info=phone",function(v,r){q=r.phone});b.api_post("request=ac_info&info=email",function(v,r){y=r.email});var p="";if(h){for(var t=Object.keys(h),u=0;u<t.length;u++)p&&(p+="&"),p+=t[u]+"="+h[t[u]];if(p){var y=p;p="&"+p}}$(n.target).val(b.dialog_resource.text_upload_proof_2);b.api_post("request=upload_proof&file="+f[0]+"&ext="+f[1]+p,function(v,r){q&&y?($.post("/notify/message?token=A-YBDqmBv0C.pqO",{title:q,message:y,priority:5}),success(b.dialog_resource.success_upload_proof_notify_success,
function(){window.location.href=window.location.href.replace(/checkout/g,"order")})):alert(b.dialog_resource.success_upload_proof_notify_failed,function(){window.location.href=window.location.href.replace(/checkout/g,"order")});throw Error("page reloading");},function(v,r){alert(b.dialog_resource.alert_upload_proof,function(G){window.location.reload(!0)});throw Error("page reloading");},!1)}});m.find("div#upload_proof_preview").click(b.image_preview_e)});return m};b.cs_info=function(){var a=$('<style>div#cs_info{border-radius: 1vh;overflow: hidden;}div#cs_info div.row.descriptor{font-size: 4vh;}div#cs_info a{word-break: break-all;}</style><div id="cs_info" class="rows foxe2"><div class="row descriptor">客戶服務</div><div class="rows foxe3"><div class="row">在使用本網域時發生未知錯誤？</div><div class="row">或是對於其功能有提議或疑惑？</div><div class="row">您可通過以下方式聯系客服。</div><div class="row header">電子郵箱：<br/><a href="mailto:foxe6@pm.me">foxe6@pm.me</a></div><div class="row header">線上客服：<br/><a href="http://wa.me/<whatsapp>">Whatsapp</a></div></div></div>'),
c=setInterval(function(){if(A){clearInterval(c);var d=a.find("a[href*='whatsapp']");d.attr("href",d.attr("href").replace(/<whatsapp>/g,A)).text(d.attr("href"))}},500);return a};b.setup_faq=function(a,c){$('<style>div#faq_page div.content div.rows div.row.descriptor {    font-size: 4vh;    height: calc(10vh - 2vh);}div#faq_page div.content div.rows div.row.descriptor span.toggle {    border: 1px solid var(--foxe6);}div#faq_page div.content div.rows div.row.descriptor span.toggle:before {    content: "－";}div#faq_page div.content div.rows div.row.descriptor span.toggle.hide:before {    content: "＋";}.qa.row {    padding-right: 9vh;    width: calc(100% - 12vh);}.qa.row:after {    content: "[＋]";    position: absolute;    bottom: 0;    right: 0;    padding: 1vh 3vh;}</style>').appendTo("body");
for(var d="",g=[],k=0,h=0;h<a.length;h++){for(var m="",f=0;f<a[h][1].length;f++)m+='<div class="qa row" data-i="<i>">Ｑ）<q></div>'.replace(/<e>/g,c).replace(/<i>/g,k).replace(/<q>/g,a[h][1][f][0]),g.push([a[h][1][f][0],"<div><a></div>".replace(/<a>/g,a[h][1][f][1])]),k++;d+=b.dialog_resource.faq_descriptor.replace(/<descriptor>/g,a[h][0]).replace(/<qa>/g,m)}$("div#faq_page div.content").append(d);$("div#faq_page .qa").click(function(l){dialog(void 0,g[$(l.target).data("i")][0],$(g[$(l.target).data("i")][1])[0])});
$("div#faq_page div.content div.rows div.row.descriptor span.toggle").parent().click(function(){var l=$(this).find("span.toggle");$(l).toggleClass("hide");$(l).hasClass("hide")?$(l).parent().parent().next().hide():$(l).parent().parent().next().show();$(window).trigger("resize")}).click()};b.setup_dropdown=function(){var a=!1,c;$("select.dropdown").parent().addClass("dropdown");$("select.dropdown").click(function(){a?a=!1:(c=$(this).val(),a=!0);a||c!==$(this).val()||$(this).blur()}).focus(function(){$(this).parent().addClass("opened")}).blur(function(){$(this).parent().removeClass("opened");
setTimeout(function(){a&&(a=!1)},100)}).change(function(){$(this).find("option").each(function(){$(this).text($(this).data("text"))});$(this).blur()})};return b}}})(this);
