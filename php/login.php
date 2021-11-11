<?php
$username = $_GET['username'];
$password = $_GET['password'];
$link =mysqli_connect("localhost","root","root","test");
$sql = "SELECT * FROM `user` WHERE `username` = '$username' OR `phone` = '$username'";
$res = mysqli_query($link,$sql);
$res = mysqli_fetch_assoc($res);
if($res){
    if($res['password']==$password){
        $row = array('state'=>1,'msg'=>'登录成功','user'=>$res['username']);
        $row = json_encode($row);
        print_r($row);
    }else{
        $row = array('state'=>2,'msg'=>'密码不正确');
        $row = json_encode($row);
        print_r($row);
    }
}else{
    $row = array('state'=>0,'msg'=>'账号不存在');
    $row = json_encode($row);
    print_r($row);
}