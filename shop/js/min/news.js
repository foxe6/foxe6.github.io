var _location=$("meta[name='description']").attr("content"),news_descriptor='<div class="rows foxe2">    <div class="row flex descriptor"><yyyy>年<mm>月</div></div>',news_item='<a class="row news_item" href="/news/<rowid>">    <div class="timestamp"><b>日期</b> <timestamp></div>    <div class="info">        <div class="image flex"><img src="<src>" /></div>        <div class="title"><title><br/><br/><div style="text-decoration: underline; font-size: 2.25vh;">閱讀更多»</div></div>    </div></a>',news_info=
'<div class="rows foxe2">    <div id="timestamp" class="row flex"><b>日期</b><span><timestamp></span></div></div><div class="rows foxe3">    <div class="row header">        <div id="title"><title></div>        <div id="content">『<content>』</div>    </div>    <div id="status_0" class="row">        <div><b>最新預訂</b></div>        <div class="image"><status_0></div>    </div>    <div id="status_1" class="row">        <div><b>最新補款</b></div>        <div class="image"><status_1></div>    </div>    <div id="status_2" class="row">        <div><b>最新現貨</b></div>        <div class="image"><status_2></div>    </div></div>',
news_info_status='<a class="image flex" href="/item/<mfcid>"><img<castoff> src="<src>" /></a>';
window.news_js=function(f){function l(){f.api_post("request=news&page="+g,function(d,a){d="";if(0===a.length)g=-1,$("div#news_item div.row.last").hide();else{$("div#news_item div#no_news").hide();for(var b=0;b<a.length;b++){var h=a[b][1].slice(0,7);k!==h&&(k=h,d+=news_descriptor.replace(/<yyyy>/g,parseInt(k.split("-")[0])).replace(/<mm>/g,parseInt(k.split("-")[1])));d+=news_item.replace(/<rowid>/g,a[b][0]).replace(/<timestamp>/g,a[b][1]).replace(/<src>/g,f.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,
a[b][3]?a[b][3]:-1)).replace(/<title>/g,a[b][2])}}$("div#news_item div.row.last").before(d);$(window).trigger("resize")});g++}delete window.news_js;var g=0,m,k="";$("div#news_item").scroll(function(){clearTimeout(m);0>g||$("div#news_item div.row.last").offset().top>.9*$(window).height()||(m=setTimeout(l,333))});$("div#news_item div.row.last").click(l);var n=window.location.pathname.split("/").slice(2,3)[0];n?($("div#news_item").remove(),f.api_post("request=news&rowid="+n,function(d,a){function b(c){c=
c.split("|,|");for(var p="",e=0;e<c.length;e++)p+=news_info_status.replace(/<src>/g,f.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,c[e])).replace(/<mfcid>/g,c[e]).replace(/<castoff>/g,h[c[e]]&&-1===document.cookie.indexOf("off_blur")?' class="blur"':"");return p}if(0!==a[0].length){var h=a[1];a=a[0][0];$("div#news_info").append(news_info.replace(/<timestamp>/g,a[0]).replace(/<title>/g,a[1]).replace(/<content>/g,a[2]).replace(/<status_0>/g,b(a[4]||"")).replace(/<status_1>/g,b(a[5]||"")).replace(/<status_2>/g,
b(a[6]||"")));a[4]||$("div#status_0").remove();a[5]||$("div#status_1").remove();a[6]||$("div#status_2").remove();$(window).trigger("resize")}}),$(window).resize(function(){$("div.image a.image").each(function(){$(this).css({height:$(this).width()})})})):(l(),$("div#news_info").remove())};
