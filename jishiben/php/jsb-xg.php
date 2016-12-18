<?php
    header("Content-type:text/html;charset:UTF-8");
    include('jsb-lj.php');
    $cid=$_REQUEST['cid'];
    $ctitle=$_REQUEST['ctitle'];
    $ccontent=$_REQUEST['ccontent'];
    $sql="update jishi set ctitle='$ctitle',ccontent='$ccontent' where cid=$cid";
    if($conn->query($sql)===true){
       echo 1;
    }else{
       echo 0;
    }
?>
