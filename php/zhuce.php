<?php
$username = $_GET['username'];
$password = $_GET['password'];
$phone = $_GET['phone'];
$link =mysqli_connect("localhost","root","root","test");
$sqlsea = "SELECT * FROM `user` WHERE `username` = '$username'";
$ressea = mysqli_query($link,$sqlsea);
$ressea = mysqli_fetch_assoc($ressea);
$sqlsea2 = "SELECT * FROM `user` WHERE `phone` = '$phone'";
$ressea2 = mysqli_query($link,$sqlsea2);
$ressea2 = mysqli_fetch_assoc($ressea2);
if($ressea){
    $row = array('state'=>0,'msg'=>'该用户名已注册');
    $row = json_encode($row);
    print_r($row);
}else if($ressea2){
    $row = array('state'=>2,'msg'=>'该手机号已注册');
    $row = json_encode($row);
    print_r($row);
}else{
    $sql = "INSERT INTO `user`(`username`,`password`,`phone`) VALUE ('$username','$password','$phone')";
    $res = mysqli_query($link,$sql);
    $row = array('state'=>1,'msg'=>'成功注册');
    $row = json_encode($row);
    print_r($row);
}