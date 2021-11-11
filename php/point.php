<?php
// 查询商品用来渲染商品详情页
$link =mysqli_connect("localhost","root","root","test");
$name = $_GET['name'];
$sql = "SELECT * FROM `scenics` WHERE `name` like '%$name%'"; 
$res = mysqli_query($link,$sql);
$arr = [];
while ($row = mysqli_fetch_assoc($res)) {
    $arr[] = $row;
}
echo json_encode($arr);