<?php
$fid = $_GET["fid"];
$res = file_get_contents('http://apis.juhe.cn/xzqh/query?key=3131cd2df923e0f57107d6a1ba082f20&fid='.$fid);
echo $res;