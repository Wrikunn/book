let swinum = 0
function move(num){
    let numnew
    if(num == 8){
        numnew = 0
    }else{
        numnew = num
    }
    $("#recom .imgbox").stop().animate({top:-270*num},400,"linear").next().children().eq(numnew).addClass("onfu").siblings().removeClass("onfu")
  }
let timer = setInterval(function(){
    if(swinum ==8){
        swinum = 0
        $("#recom .imgbox").css({top:0})
    }
    swinum++
    move(swinum)
},2000)
$("#recom .banner ul li").hover(function () {
    clearInterval(timer)  //移入时清空定时器
    swinum = $(this).index()
    move(swinum)
 },function(){   //移出时再次启动定时器，实现每次移入li时图片停留一段时间再开始轮播
    timer = setInterval(function(){
        if(swinum ==8){
            swinum = 0
            $("#recom .imgbox").css({top:0})
        }
        swinum++
        move(swinum)
    },2000)
 })