"use strict";var more=document.querySelector("#more"),flag=!1;function aboutlive(n,t,e,o,i,a,s,r,p,c,l){return'\n    <div class="clear-fix">\n        <div class="left">\n            <img src="'+t+'">\n            <p><a href="script:;">'+n+"</a>\n            <br>\n            "+e+'</p>\n        </div>\n        <div class="midd">\n            <span>'+p+"</span>\n            <p>\n                <em>"+i+"</em>\n                <br>"+o+"\n                <br>"+s+"\n                <br>"+a+'\n            </p>\n        </div>\n        <div class="right"  id='+l+">\n            <div>\n                <strong>"+r+"</strong>\n                <br>\n                <span>满60减1</span>\n                <br>\n                <i>快递： ￥ "+c+'</i>\n            </div>\n            <div>\n                <button class="buyNow">立即购买</button>\n                <br>\n                <button>加入购物车</button>\n            </div>\n        </div>\n    </div>\n'}function asidenum(){$.ajax({url:"./php/buy.php",async:!1,dataType:"json",success:function(n){0==n.length?($("#aside").find("em").stop().hide(100),$("#car").children().html("<img src='img/car.png'><br>您的购物车是空的，快去挑些好书放进来吧。")):($("#aside").find("em").stop().show(100).text(n.length),$("#car").children().html("您的购物车内有<br>"+n.length+"件商品"))}})}more.onclick=function(n){n.preventDefault(),flag=flag?(document.querySelector(".lessbox").style.display="block",document.querySelector(".morebox").style.display="none",!(more.innerText="查看详情")):(document.querySelector(".lessbox").style.display="none",document.querySelector(".morebox").style.display="block",more.innerText="收起",!0)},$("#point .minbox").mouseenter(function(){var o=$("#point .minbox").offset().left,i=$("#point .minbox").offset().top;$("#point .glass").stop().show(),$("#point .glassmax").stop().show(),$(window).mousemove(function(n){var t=n.pageX-o-40,e=n.pageY-i-40;n.pageX<=o+40?t=0:n.pageX>=o+$("#point .minbox").width()-40&&(t=$("#point .minbox").width()-80),n.pageY<=i+40?e=0:n.pageY>=i+$("#point .minbox").height()-40&&(e=$("#point .minbox").height()-80),$("#point .glass").css({left:t,top:e}),$("#point .glassmax").find("img").css({left:-2*t,top:-2*e})})}).mouseleave(function(){$("#point .glass").stop().hide(),$("#point .glassmax").stop().hide()}),document.cookie.split(";").forEach(function(n){"username"==n.split("=")[0]&&asidenum()}),$("#about ul").on("click","button",function(n){var t,e,o=!1;if(document.cookie.split(";").forEach(function(n){"username"==n.split("=")[0]&&(o=!0)}),!o)return layer.msg("请先登录",{time:1e3}),!1;$(n.target).prop("class")?(t=$(n.target).parent().parent().prop("id"),sessionStorage.setItem(t,2),$.ajax({url:"./php/car.php",data:{id:t,num:1},async:!1}),location.href="./buy.html"):(n=$(n.target).parent().parent().attr("id"),e=void 0,$.ajax({url:"./php/car.php",data:{id:n},async:!1,dataType:"json",success:function(n){e=Number(n.num),e++}}),$.ajax({url:"./php/car.php",data:{id:n,num:e},async:!1}),asidenum(),layer.msg("成功加入购物车",{time:1e3}))}),$("#aside .carbox").click(function(){location.href="./car.html"});