"use strict";var swinum=0;function move(n){var e=void 0,e=8==n?0:n;$("#recom .imgbox").stop().animate({top:-270*n},400,"linear").next().children().eq(e).addClass("onfu").siblings().removeClass("onfu")}var timer=setInterval(function(){8==swinum&&(swinum=0,$("#recom .imgbox").css({top:0})),move(++swinum)},2e3);$("#recom .banner ul li").hover(function(){clearInterval(timer),move(swinum=$(this).index())},function(){timer=setInterval(function(){8==swinum&&(swinum=0,$("#recom .imgbox").css({top:0})),move(++swinum)},2e3)});