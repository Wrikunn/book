$.ajax({   //从api获取行政区
    url: './php/api.php',
    data: { fid: 0 },
    dataType: 'json',
    success: function (res) {
        res.result.forEach(ele => {
            let newop = $(`<option value="${ele.id}">${ele.name}</option>`)
            $('#prov').append(newop)
        });
    }
})
$.ajax({  //获取用户在购物车界面勾选的商品
    url: './php/buy.php',
    dataType: 'json',
    success: function (res) {
        let set = new Set()
        let arr =[]
        res.forEach((ele) => {
            let mn = sessionStorage.getItem(ele.id)
            if (mn == 1 ||mn ==2) {  //用户勾选了的商品才渲染
                set.add(ele.master)
                arr.push(ele)
            }
        })
        set.forEach((ele) => {   //渲染商品
            let newobj = $(`
            <div class="shopcarPoint">
                <p>
                    <span>${ele}</span>
                    <span></span>
                    <span>店主：<b>${ele}</b></span>
                    <i>在线交谈</i>
                </p>
                <ul></ul>
                <div>
                    <span>运送方式：</span>
                    <span>请与卖家确认</span>
                    <span>运费：<i></i></span>
                </div>
                <strong class="clear-fix"></strong>
            </div>
            `)
            newobj.insertBefore('#shopcar .shopBuy')
            arr.forEach((element) => {
                if (element.master == ele) {
                    newobj.find('p').find('span').eq(1).text(element.location)
                    newobj.find('div').find('i').text(element.transport)
                    var newli = $(`
                    <li id=${element.id}>
                        <img src=${element.imgpath}>
                        <span>${element.name}</span>
                        <span>${element.quality}</span>
                        <span>${element.price}</span>
                        <div>
                            x ${element.num}件
                        </div>
                        <i>${(element.num*element.price).toFixed(2)}</i>
                    </li>   
                    `)
                    newli.appendTo(newobj.find('ul'))
                }
            })
        })
        let sum = 0  //计算总价格
        for (let i = 0; i < $('.shopcarPoint').find('i').length; i++) {
            if(Number($('.shopcarPoint').find('i').eq(i).text())){
                sum += Number($('.shopcarPoint').find('i').eq(i).text())
            }
        }
        sum = sum.toFixed(2)
        $('#shopcar .shopBuy').find('i').eq(0).text(arr.length).end().eq(1).text(sum)
        setTimeout(function(){
            layer.close(index)  //关闭加载层
        },100)
    }
})


$('#prov').change(function () { //修改选项时，后面的地区需要重置
    $('#city').html('<option value="">请选择市</option>')
    $('#county').html('<option value="">请选择区县</option>')
    $('#street').html('<option value="">请选择街道</option>')
    if (this.value != "") {  //选中省份时
        $.ajax({
            url: './php/api.php',
            data: { fid: $('#prov').val() },
            dataType: 'json',
            success: function (res) {
                res.result.forEach(ele => {
                    let newop = $(`<option value="${ele.id}">${ele.name}</option>`)
                    $('#city').append(newop)
                });
            }
        })
    }
})
$('#city').change(function () {
    $('#county').html('<option value="">请选择区县</option>')
    $('#street').html('<option value="">请选择街道</option>')
    if (this.value != "") {  //选中市时
        $.ajax({
            url: './php/api.php',
            data: { fid: $('#city').val() },
            dataType: 'json',
            success: function (res) {
                res.result.forEach(ele => {
                    let newop = $(`<option value="${ele.id}">${ele.name}</option>`)
                    $('#county').append(newop)
                });
            }
        })
    }
})
$('#county').change(function () {
    $('#street').html('<option value="">请选择街道</option>')
    if (this.value != "") {  //选中区时
        $.ajax({
            url: './php/api.php',
            data: { fid: $('#county').val() },
            dataType: 'json',
            success: function (res) {
                res.result.forEach(ele => {
                    let newop = $(`<option value="${ele.id}">${ele.name}</option>`)
                    $('#street').append(newop)
                });
            }
        })
    }
})
$('#addbtn').click(function () {
    let provtxt = document.querySelector('#prov').options[document.querySelector('#prov').selectedIndex].innerText
    let citytxt = document.querySelector('#city').options[document.querySelector('#city').selectedIndex].innerText
    let countytxt = document.querySelector('#county').options[document.querySelector('#county').selectedIndex].innerText   //获取select选中的option的文本（value中存的是代码，不能直接用）
    $('#message').show().find('span').text(
        $('#addname').val() + '(' + $('#addphone').val() + ')'
    ).next().text(provtxt + " " + citytxt + " " + countytxt + " " + $('#detaadd').val()).parent().siblings().hide()
})
$('.shopBuy').find('button').click(function(){
    for (const i in sessionStorage) { //结算后商品数量归零
        if(Number(i)){
            if(sessionStorage.getItem(i)!=0){
                $.ajax({  //设置购物车数量
                    url:'./php/car.php',
                    data: {
                        'id':i,
                        'num':0
                    },
                    async:false
                })
            }
            sessionStorage.setItem(i,0)
        }
    }
    layer.msg('支付成功，感谢您的支持', {
        icon: 1,shade:0.3,shadeClose:true}, function(){
            location.href='./index.html'
      }); 
})
