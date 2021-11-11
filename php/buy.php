<?php
// 查询所有购物车数量不为0的商品用来渲染购物车页
$link =mysqli_connect("localhost","root","root","test");
// $name = $_GET['name'];
$sql = "SELECT * FROM `scenics` WHERE `num`>0 "; 
$res = mysqli_query($link,$sql);
$arr = [];
while ($row = mysqli_fetch_assoc($res)) {
    $arr[] = $row;
}
echo json_encode($arr);