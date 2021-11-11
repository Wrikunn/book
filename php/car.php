<?php
// 获取和更改单个商品的数据库的购物车数量
$link =mysqli_connect("localhost","root","root","test");
$id = $_GET['id'];
$sql = "SELECT * FROM `scenics` WHERE `id` = '$id'"; 
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
echo json_encode($row);
$num = $_GET['num'];
$sqlplus = "UPDATE `scenics` SET `num` = '$num' WHERE `id` = '$id'"; 
$respuls = mysqli_query($link,$sqlplus);