window.onload=function(){
    let arr = document.cookie.split(";")
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].split("=").length; j++) {
            if(arr[i].split("=")[0]=="username"){ //如果用户已登录
                logzhu.innerHTML = arr[i].split("=")[1]
                exit()
                $.ajax({  //补充内容：修改头部显示的购物车内商品数量
                    url:'./php/buy.php',
                    async:false,
                    dataType:'json',
                    success:function(res){
                        if(res.length>0){
                            $('#car').children().html(`您的购物车内有<br>${res.length}件商品`)
                        }else{
                            $('#car').children().html(`<img src='img/car.png'><br>您的购物车是空的，快去挑些好书放进来吧。`)
                        }
                    }
                })
            }
        }
    }
}
function exit(){   //登录退出结构
    let box = document.createElement("b")
    let image = document.createElement("img")
    image.src = "img/touxiang.gif"
    box.appendChild(image)
    let i1 = document.createElement("i")
    i1.innerText="账号管理"
    box.appendChild(i1)
    let stro = document.createElement("strong")
    stro.innerText="|"
    box.appendChild(stro)
    let i2 = document.createElement("i")
    i2.innerText="退出"
    box.appendChild(i2)
    i2.onclick=function(){  //退出按钮绑定事件
        quit()
        setCookie("username","",-1)
        location.reload()
    }
    logzhu.appendChild(box)
}


// 之前的结构不能实现不同账号保存不同的购物车信息，为了少改之前的代码，做了一些不正规的修改，登录时读取本地存储中属于该用户的购物车信息并且写入数据库中，购物车可以照旧依赖数据库的数据进行渲染，退出登录时将当前购物车数据及账号信息录入本地存储。数据库中只保存一份用户购物车数据，本地存储中保存多份
function quit(){ //退出账号时购物车数据存入本地存储中
    let arr = document.cookie.split(";")
    let username
    let dataobj ={}
    for (let i = 0; i < arr.length; i++) { //获取当前用户名
        for (let j = 0; j < arr[i].split("=").length; j++) {
            if(arr[i].split("=")[0]=="username"){ 
                username = arr[i].split("=")[1]
            }
        }
    }
    let newdata = []
    $.ajax({  //读取数据库的购物车数据
        url:'./php/buy.php',
        dataType:'json',
        async:false,
        success:function(res){
            console.log(res);
            res.forEach(ele => {
                dataobj[ele.id] = ele.num
                newdata[ele.id] = 0  //将数据库中的个数重置为0
            });
        }
    })
    dataobj = JSON.stringify(dataobj)
    localStorage.setItem(username,dataobj) //写入本地存储
    for (const i in newdata) { //重置数据库中的个数
        $.ajax({
            url:'./php/car.php',
            data:{
                id:i,
                num:0
            }
        })
    }
    console.log(location.href);
}
function enter(){  //登录账号时读取本地存储写入数据库
    let arr = document.cookie.split(";")
    let username
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].split("=").length; j++) {
            if(arr[i].split("=")[0]=="username"){ 
                username = arr[i].split("=")[1]
            }
        }
    }
    let data = localStorage.getItem(username)
    data = JSON.parse(data) //读取本地存储中的购物车数据
    for (const i in data) { //如果本地存储不存在该用户信息，data为null，不会写入后台数据
        $.ajax({  //将购物车数据写入数据库中
            url:'./php/car.php',
            dataType:'json',
            async:false,
            data:{id:i,num:data[i]}
        })
    }
    $.ajax({  //补充内容：修改头部显示的购物车内商品数量
        url:'./php/buy.php',
        async:false,
        dataType:'json',
        success:function(res){
            if(res.length>0){
                $('#car').children().html(`您的购物车内有<br>${res.length}件商品`)
            }else{
                $('#car').children().html(`<img src='img/car.png'><br>您的购物车是空的，快去挑些好书放进来吧。`)
            }
        }
    })
}


var loginbtn = document.querySelectorAll(".loginbtn")
var loginbox = document.getElementById("loginbox")
var login = document.querySelector(".login")
var enroll = document.querySelector(".enroll")
var yanzheng = document.querySelector(".yanzheng")
var ma = document.querySelector(".ma")
var  enrollbtn = document.querySelectorAll(".enrollbtn")
var  yanzhengbtn = document.querySelectorAll(".yanzhengbtn")
var  mabtn = document.querySelectorAll(".mabtn")
let zhuce = document.querySelector("#zhuce")
function visib(obj){
    loginbox.style.display = "block"
    enroll.style.display = "none"
    login.style.display = "none"
    yanzheng.style.display = "none"
    ma.style.display = "none"
    obj.style.display = "block"
}
for(var i = 0;i<enrollbtn.length;i++){
    enrollbtn[i].onclick = function(){
        visib(enroll)
    }
}
for(var j = 0;j<loginbtn.length;j++){
    loginbtn[j].onclick = function(e){
        e.preventDefault();
        visib(login)
    }
}
for(var k = 0;k<yanzhengbtn.length;k++){
    yanzhengbtn[k].onclick = function(){
        visib(yanzheng)
    }
}
for(var m = 0;m<mabtn.length;m++){
    mabtn[m].onclick = function(){
        visib(ma)
    }
}

function setCookie(key,val,exp){ //time单位是天
    let time =new Date()
    time = new Date(time.getTime() + (exp*24-8)*60*60*1000)
    document.cookie=(`${key}=${val};expires=${time}`)
}

var close = document.getElementById("close"),
inptxt = document.querySelectorAll(".inputtxt"),
inptext = document.querySelectorAll("#loginbox input[type='text']"),
inppsw = document.querySelectorAll("#loginbox input[type='password']");
let checkbox = document.querySelector(".enroll input[type=checkbox]")
let sevenday = document.querySelector(".login input[type=checkbox]")
function closefn(){
    loginbox.style.display = "none"
    zhuce.disabled = true
    checkbox.checked=false
    sevenday.checked=false
    for (let i = 0; i < inptxt.length; i++) {
        inptxt[i].style.display = "none"
    }
    for (let i = 0; i < inptext.length; i++) {
        inptext[i].value = ""
    }
    for (let i = 0; i < inppsw.length; i++) {
        inppsw[i].value = ""
    }
}
close.onclick = closefn

 /* *******用户名密码登录界面******* */
user.onblur = function(){
    if(user.value==""){
        document.querySelector("#user+span").innerHTML="请输入用户名"
        document.querySelector("#user+span").style.display="block"
    }
}
user.onkeyup = function(){
    document.querySelector("#user+span").style.display="none"
}
pass.onblur = function(){
    if(pass.value==""){
        document.querySelector("#pass+span").innerHTML="请输入密码"
        document.querySelector("#pass+span").style.display="block"
    }
}
pass.onkeyup = function(){
    document.querySelector("#pass+span").style.display="none"
}
let loginphp = document.querySelector("#login")
let logzhu = document.querySelector("#logzhu")
loginphp.onclick =function(){
    if(user.value!=""&&pass.value!=""){
        let xhr = new XMLHttpRequest()//原生Ajax熟悉操作
        xhr.open('get',`./php/login.php?username=${user.value}&password=${pass.value}`)
        xhr.send()
        xhr.onload =function(){
            let res = JSON.parse(xhr.responseText)
            if(res.state == 2){
                document.querySelector("#pass+span").innerHTML=res.msg
                document.querySelector("#pass+span").style.display="block"
            }else if(res.state == 0){
                document.querySelector("#user+span").innerHTML=res.msg
                document.querySelector("#user+span").style.display="block"
            }else{  //登录成功
                logzhu.innerHTML = res.user  //用户名或手机号登录都能显示用户名
                if(sevenday.checked){
                    setCookie("username",res.user,7)
                }else{
                    setCookie("username",res.user) 
                }
                location.reload(true)
                exit()
                closefn()
                enter()
            }
        }
    }else{  //输入信息为空时不需要请求，直接提示用户
        if(user.value==""){ 
            document.querySelector("#user+span").innerHTML="请输入用户名"
            document.querySelector("#user+span").style.display="block"
        }
        if(pass.value==""){
            document.querySelector("#pass+span").innerHTML="请输入密码"
            document.querySelector("#pass+span").style.display="block"
        }
    }
}


/* *******注册界面******* */
checkbox.onchange=function(){
    if(this.checked){
        zhuce.disabled = false
    }else{
        zhuce.disabled = true
    }
}
let phone = document.querySelector("#phone"),
niname = document.querySelector("#niname"),
newpsw = document.querySelector("#newpsw");
zhuce.onclick=function(){
    if(phone.value!=""&&niname.value!=""&&newpsw.value!=""){
        let xhrzc = new XMLHttpRequest()  //原生Ajax熟悉操作
        xhrzc.open('get',`./php/zhuce.php?username=${niname.value}&password=${newpsw.value}&phone=${phone.value}`)
        xhrzc.send()
        xhrzc.onload =function(){
            let res = JSON.parse(xhrzc.responseText)
            if(res.state == 2){
                document.querySelector("#phone+span").innerHTML=res.msg
                document.querySelector("#phone+span").style.display="block"
            }else if(res.state == 0){
                document.querySelector("#niname+span").innerHTML=res.msg
                document.querySelector("#niname+span").style.display="block"
            }else{
                logzhu.innerHTML = niname.value
                setCookie("username",niname.value,7)//注册成功默认七天免登录
                exit()
                closefn()
                enter()
            }
        }
    }else{  //输入信息为空时不需要请求，直接提示用户
        if(phone.value==""){
            document.querySelector("#phone+span").innerHTML="请输入手机号"
            document.querySelector("#phone+span").style.display="block"
        }
        if(niname.value==""){
            document.querySelector("#niname+span").innerHTML="请输入密码"
            document.querySelector("#niname+span").style.display="block"
        }
        if(newpsw.value==""){
            document.querySelector("#newpsw+span").innerHTML="请输入密码"
            document.querySelector("#newpsw+span").style.display="block"
        }
    }
}

let phonereg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ //手机号验证
let namereg = /^[a-zA-Z][a-zA-Z0-9]{2,7}$/ //用户名：字母开头，字母、数字组成，3~8位
let pswreg = /^\w{6,10}$/   //密码：任意数字字母下划线，6-10位
// 补充功能：注册时正则验证
$('#phone').blur(function(){  //验证手机号
    if($(this).val() == ''){ 
        $(this).next().show().text('请输入手机号')
    }else{
        if(!phonereg.test($(this).val())){
            $(this).next().show().text('请输入正确的手机号')
        }else{
            $(this).next().hide()
        }
    }
}).keyup(function(){ //用户正在输入时隐藏提示信息
    $(this).next().hide()
})
.parent().find('#niname').blur(function(){ //验证昵称
    if($(this).val() == ''){
        $(this).next().show().text('请输入昵称')
    }else{
        if($(this).val().length<3||$(this).val().length>8){
            $(this).next().show().text('昵称长度请保持在3~8位内')
        }else{
            if(!namereg.test($(this).val())){
                $(this).next().show().text('昵称请以字母开头，仅含数字和字母')
            }else{
                $(this).next().hide()
            }
        }
    }
}).keyup(function(){
    $(this).next().hide()
})
.parent().find('#newpsw').blur(function(){  //验证密码
    if($(this).val() == ''){
        $(this).next().show().text('请输入密码')
    }else{
        if($(this).val().length<6||$(this).val().length>10){
            $(this).next().show().text('密码长度请保持在6~10位内')
        }else{
            if(!pswreg.test($(this).val())){
                $(this).next().show().text('密码为任意数字字母下划线')
            }else{
                $(this).next().hide()
            }
        }
    }
}).keyup(function(){
    $(this).next().hide()
})


$(window).scroll(function(){   //返回顶部功能
    if($(window).scrollTop()>=700){
        $("#aside .toTop").show().click(function(){
            $("html,body").stop().animate({scrollTop:0},800,"linear")
        })
    }else{
        $("#aside .toTop").hide()
    }
})

$('#logo .center>img').click(function(){  //点击logo标签跳转首页
    location.href = './index.html'
})