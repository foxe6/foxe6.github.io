var _location=$("meta[name='description']").attr("content"),news_descriptor='<div class="row flex descriptor bgfoxe6a8"><yyyy>年<mm>月</div>',news_item='<a class="row news_item" href="/news/<rowid>">    <div class="timestamp"><b>日期</b> <timestamp></div>    <div class="info">        <div class="image flex"><img src="<src>" /></div>        <div class="title"><title><br/><br/><div style="text-decoration: underline; font-size: calc(2.25 * var(--vh));">閱讀更多<span class="no_translate">&#x00BB;</span></div></div>    </div></a>',
news_info_status='<div class="flex"><a class="image flex<castoff>" href="/item/<mfcid>"><img src="<src>" /></a></div>';
window.news_js=function(g){function l(){g.api_post("request=news&page="+h,function(b,a){b="";if(0===a.length)h=-1,$("div#news_item div.row.last").hide();else{$("div#news_item div#no_news").hide();for(var c=0;c<a.length;c++){var f=a[c][1].slice(0,7);k!==f&&(k=f,b+=news_descriptor.replace(/<yyyy>/g,parseInt(k.split("-")[0])).replace(/<mm>/g,parseInt(k.split("-")[1])));b+=news_item.replace(/<rowid>/g,a[c][0]).replace(/<timestamp>/g,a[c][1]).replace(/<src>/g,a[c][4]||g.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,
a[c][3]?a[c][3]:-1)).replace(/<title>/g,a[c][2])}}$("div#news_item div.row.last").before(b);$(window).trigger("resize")});h++}delete window.news_js;var h=0,m,k="";$("div#news_item").scroll(function(){clearTimeout(m);0>h||$("div#news_item div.row.last").offset().top-$("div#menu").offset().top>9*$("div#menu").height()||(m=setTimeout(l,333))});$("div#news_item div.row.last").click(l);var n=window.location.pathname.split("/").slice(2,3)[0];n?($("div#news_item").remove(),g.api_post("request=news&rowid="+
n,function(b,a){function c(d){if(d){d=d.split("|,|");for(var p="",e=0;e<d.length;e++)p+=news_info_status.replace(/<src>/g,f[d[e]][1]||g.dialog_resource.img_src_mfcid.replace(/<mfcid>/g,d[e])).replace(/<mfcid>/g,d[e]).replace(/<castoff>/g,f[d[e]][0]?" blur":"");return p}}if(0!==a[0].length){var f=a[1];a=a[0][0];b=$("div#news_info");b.find("div#timestamp").text(a[0]);b.find("div#title").text(a[1]);b.find("div#content span").text(a[2]);b.find("div#status_0 div.image").html(c(a[4]||""));b.find("div#status_1 div.image").html(c(a[5]||
""));b.find("div#status_2 div.image").html(c(a[6]||""));a[4]||b.find("div#status_0").remove();a[5]||b.find("div#status_1").remove();a[6]||b.find("div#status_2").remove();$(window).trigger("resize")}}),$(window).resize(function(){$("div.image a.image").each(function(){$(this).css({height:$(this).width()+"px"})})})):(l(),$("div#news_info").remove())};
