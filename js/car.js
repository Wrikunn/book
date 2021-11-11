let dlflag = false
document.cookie.split(';').forEach(ele => {
    if(ele.split('=')[0] == 'username'){ //已登录
        dlflag = true
        $.ajax({
            url: './php/buy.php',
            async: false,
            dataType: 'json',
            success: function (res) {
                let set = new Set()  //set去除重复的店名
                res.forEach(ele => {
                    set.add(ele.master)
                });
                set.forEach((ele) => {  //渲染商品
                    let newobj = $(`
                    <div class="shopcarPoint">
                        <p>
                            <input type="checkbox" name="" class="checkboxs"><span>${ele}</span>
                            <span></span>
                            <span>店主：<b>${ele}</b></span>
                            <i>在线交谈</i>
                        </p>
                        <ul></ul>
                    </div>
                    `)
                    newobj.insertBefore('#shopcar .shopcarFoot')
                    res.forEach((element) => {
                        newobj.find('span').eq(1).text(element.location)
                        if (element.master == ele) {
                            let newli = $(`
                            <li id=${element.id}>
                            <input type="checkbox" name="" id="">
                            <img src=${element.imgpath}>
                            <span>${element.name}</span>
                            <span>${element.quality}</span>
                            <span>${element.price}</span>
                            <div>
                                <input type="text" maxlength="3" value=${element.num}>
                                <button class="nummin">-</button>
                                <button class="numplus">+</button>
                            </div>
                            <i class="sum">${(element.num * element.price).toFixed(2)}</i>
                            <em>
                                <span>移入收藏</span>
                                <br>
                                <span class="del">删除</span>
                            </em>
                        </li>
                            `)
                            newli.appendTo(newobj.find('ul'))
                            if (element.num == 1) { //如果商品数量是1，减号按钮不可操作
                                newli.find('.nummin').addClass('unhov')
                            }
                        }
                    })
                })
                if (res.length == 0) {
                    $('#shopcar').hide().prev().show()
                } else {
                    $('#shopcar').show().prev().hide()
                }
                setTimeout(function () {
                    layer.close(index)  //关闭加载层
                }, 100)
            }
        })
    }
});
if(!dlflag){  //未登录
    $('#shopcar').hide().prev().show().html(`您还没有登录，您可以<a href="./index.html">去登录</a>`)
    setTimeout(function () {
        layer.close(index)  //关闭加载层
    }, 100)
}


function sumfn() {  //计算所有已选中的商品的总价
    let obj = $('#shopcar input:checked').parent().find('.sum')
    let sum = 0
    for (let i = 0; i < obj.length; i++) {
        sum += Number($(obj[i]).text())
    }
    sum = sum.toFixed(2)
    if (sum > 0) {
        $('.shopcarFoot>em').show().find('i').text(sum)
    } else {
        $('.shopcarFoot>em').hide()
    }
}

function phpnum(ind, target) {//修改php中的购物车数量为指定值
    // ind:商品id
    // target:后端数据设置为指定数量
    $.ajax({
        url: './php/car.php',
        async: false,
        data: {
            'id': ind,
            'num': target
        }
    })
}


$(".numplus").click(function () {  //加减号改变页面数据和后端数量
    let num = Number($(this).prev().prev().val())
    if (num < 999) {
        num += 1
        $(this).prev().prev().val(num).parent().next().text((num * $(this).parent().prev().text()).toFixed(2))
        if (num > 1) {
            $(this).prev().removeClass('unhov')  //减号可操作
        }
        sumfn()
        phpnum($(this).parent().parent().prop('id'), num)
    }
}).prev().click(function () {
    let num = Number($(this).prev().val())
    if (num > 1) {
        num -= 1
        if (num <= 1) {
            $(this).addClass('unhov')  //减号不可操作
            num = 1
        }
        $(this).prev().val(num).parent().next().text((num * $(this).parent().prev().text()).toFixed(2))
    }
    sumfn()
    phpnum($(this).parent().parent().prop('id'), num)
}).prev().blur(function () {
    if ($(this).val() <= 1 || isNaN(Number($(this).val()))) {
        $(this).next().addClass('unhov')
        $(this).val(1).parent().next().text((1 * $(this).parent().prev().text()).toFixed(2))  //输入不合法的数字时自动重置为1
    } else {
        $(this).next().removeClass('unhov')
            .parent().next().text(($(this).val() * $(this).parent().prev().text()).toFixed(2))//输入合法数字时减号可操作
    }
    sumfn()
    phpnum($(this).parent().parent().prop('id'), $(this).val())
})
let inddel
$('.del').click(function (e) {
    inddel = layer.open({
        type: 0,
        content: '是否删除商品',
        title:'提示',
        btn: ['确定', '取消'],
        skin: 'tanchu',
        yes: function () {
            delfn(e)
        }
    })
})
function delfn(e){  //删除事件
    phpnum($(e.target).parent().parent().prop('id'),0)
    $.ajax({  //补充内容：修改头部显示的购物车内商品数量
        url:'./php/buy.php',
        async:false,
        dataType:'json',
        success:function(res){
            if(res.length>0){
                $('#car').children().html(`您的购物车内有<br>${res.length}件商品`)
            }else{
                $('#car').children().html(`<img src='img/car.png'><br>您的购物车是空的，快去挑些好书放进来吧。`)
                $('#shopcar').hide().prev().show()
            }
        }
    })
    if($(e.target).parent().parent().parent().find('li').length ==1){  //只有一件商品时整个删除
        $(e.target).parent().parent().parent().parent().remove()
    }else{
        $(e.target).parent().parent().remove() //删除购物车内的单个商品
    }
    layer.close(inddel) //关闭信息层
}


//为了在单选取消后，全选也被取消之类的小功能，加了很多代码，没有老师写的版本好
$('.checkAll').click(function () { //全选和反选
    if (this.checked) {
        $('#shopcar input[type="checkbox"]').prop('checked', true)
    } else {
        $('#shopcar input[type="checkbox"]').prop('checked', false)
    }
})
$('.checkboxs').click(function () { //部分全选和反选
    if (this.checked) {
        $(this).parent().parent().find('input[type="checkbox"').prop('checked', true)
    } else {
        $(this).parent().parent().find('input[type="checkbox"').prop('checked', false)
    }
})
$('input[type="checkbox"]').click(function () {  //选中时计算总价
    sumfn()
})
$('ul input[type="checkbox"]').click(function () { //单选框都被选中时，对应全选也选中
    let obj = $(this).parent().parent().find('input[type="checkbox"')
    let flag = true
    for (let i = 0; i < obj.length; i++) {
        if (!obj[i].checked) {
            flag = false
            break
        }
    }
    if (flag) {
        $(this).parent().parent().prev().find('.checkboxs').prop('checked', true)
    } else {
        $(this).parent().parent().prev().find('.checkboxs').prop('checked', false)
    }
    let flag2 = true
    for (let j = 0; j < $('.checkboxs').length; j++) {
        if (!$('.checkboxs')[j].checked) {
            flag2 = false
            break
        }
    }
    if (flag2) {
        $('.checkAll').prop('checked', true)
    } else {
        $('.checkAll').prop('checked', false)
    }
})
$('.checkboxs').click(function () { //单选框都被选中时，对应全选也选中
    let flag2 = true
    for (let j = 0; j < $('.checkboxs').length; j++) {
        if (!$('.checkboxs')[j].checked) {
            flag2 = false
            break
        }
    }
    if (flag2) {
        $('.checkAll').prop('checked', true)
    } else {
        $('.checkAll').prop('checked', false)
    }
})


$("#buy").click(function () {  //结算按钮
    if($('ul input:checked').length == 0){  //什么商品都没选弹出提示
        layer.msg('尚未选择任何商品',{time:1000})
        return false  //阻止下面的代码
    }
    for (let j = 0; j < $('ul input[type="checkbox"]').length; j++) {  //重置显示商品，避免bug
        let ind = $($('ul input[type="checkbox"]')[j]).parent().prop('id')  //获取所有购物车内商品的商品id
        sessionStorage.setItem(ind, 0)
    }
    for (let i = 0; i < $('ul input:checked').length; i++) {
        let ind = $($('ul input:checked')[i]).parent().prop('id')  //获取所有勾选的商品的商品id
        sessionStorage.setItem(ind, 1)  //设置商品是否显示在结算页面
    }
    document.location.href = "./buy.html" //结算页面跳转
})