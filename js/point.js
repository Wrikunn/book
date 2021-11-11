let more = document.querySelector("#more")
let flag = false
        
more.onclick=function(e){
    e.preventDefault();
    if(flag){
        document.querySelector(".lessbox").style.display="block"
        document.querySelector(".morebox").style.display="none"
        more.innerText="查看详情"
        flag = false
    }else{
        document.querySelector(".lessbox").style.display="none"
        document.querySelector(".morebox").style.display="block"
        more.innerText="收起"
        flag = true
    }
} //查看更多
$('#point .minbox').mouseenter(function(){
    let x = $('#point .minbox').offset().left
    let y = $('#point .minbox').offset().top
    $('#point .glass').stop().show()
    $('#point .glassmax').stop().show()
    $(window).mousemove(function(e){
        let leftnum = e.pageX -x -40
        let topnum = e.pageY -y -40
        if(e.pageX<=x+40){
            leftnum = 0
        }else if(e.pageX>=x+$('#point .minbox').width()-40){
            leftnum = $('#point .minbox').width()-80
        }
        if(e.pageY<=y+40){
            topnum = 0
        }else if(e.pageY>=y+$('#point .minbox').height()-40){
            topnum = $('#point .minbox').height()-80
        }
        $('#point .glass').css({left:leftnum,top:topnum})
        $('#point .glassmax').find('img').css({left:-2*leftnum,top:-2*topnum})
    })
}).mouseleave(function(){
    $('#point .glass').stop().hide()
    $('#point .glassmax').stop().hide()
})  //放大镜功能
function aboutlive(name,imgpath,introduce,location,master,masterint,masterscore,price,quality,transport,id){
    return `
    <div class="clear-fix">
        <div class="left">
            <img src="${imgpath}">
            <p><a href="script:;">${name}</a>
            <br>
            ${introduce}</p>
        </div>
        <div class="midd">
            <span>${quality}</span>
            <p>
                <em>${master}</em>
                <br>${location}
                <br>${masterscore}
                <br>${masterint}
            </p>
        </div>
        <div class="right"  id=${id}>
            <div>
                <strong>${price}</strong>
                <br>
                <span>满60减1</span>
                <br>
                <i>快递： ￥ ${transport}</i>
            </div>
            <div>
                <button class="buyNow">立即购买</button>
                <br>
                <button>加入购物车</button>
            </div>
        </div>
    </div>
`
}
function asidenum(){  //查询购物车商品种类数，并渲染在右侧按钮上
    $.ajax({  
        url:'./php/buy.php',
        async:false,
        dataType:'json',
        success:function(res){
            if(res.length==0){
                $('#aside').find('em').stop().hide(100)
                $('#car').children().html(`<img src='img/car.png'><br>您的购物车是空的，快去挑些好书放进来吧。`)
            }else{
                $('#aside').find('em').stop().show(100).text(res.length)
                $('#car').children().html(`您的购物车内有<br>${res.length}件商品`)
            }
        }
    })
}
document.cookie.split(';').forEach(ele => {
    if(ele.split('=')[0] == 'username'){ //已登录的话先渲染一次右侧按钮
        asidenum()
    }
});
$('#about ul').on('click','button',function (e) {
    let dlflag = false
    document.cookie.split(';').forEach(ele => {
        if(ele.split('=')[0] == 'username'){ //已登录
            dlflag = true
        }
    });
    if(!dlflag){  //未登录
        layer.msg('请先登录',{time:1000})
        return false
    }
    if($(e.target).prop('class')){ //点击的是立即购买按钮
        let ind = $(e.target).parent().parent().prop('id')  //获取立即购买的商品id
        sessionStorage.setItem(ind,2)  
        $.ajax({  //设置购物车数量
            url:'./php/car.php',
            data: {
                'id':ind,
                'num':1
            },
            async:false
        })
        location.href='./buy.html'//跳转到结算页面
    }else{//点击的是添加到购物车按钮
        let ind = $(e.target).parent().parent().attr('id')
        let num
        $.ajax({  //获取到点击的商品购物车数量
            url:'./php/car.php',
            data: {
                'id':ind
            },
            async:false,
            dataType:'json',
            success:function(res) {
                num = Number(res.num) 
                num++
            }
        })
        $.ajax({  //设置购物车数量
            url:'./php/car.php',
            data: {
                'id':ind,
                'num':num
            },
            async:false
        })
        asidenum()
        layer.msg('成功加入购物车',{time:1000})
    }
})
$('#aside .carbox').click(function(){
    location.href='./car.html'
})