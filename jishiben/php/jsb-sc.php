<?php
    header("Content-type:text/html;charset:UTF-8");
    include('jsb-lj.php');
    $cid=$_REQUEST['cid'];
    $sql="delete from jishi where cid=$cid";
    if($conn->query($sql)===true){
       echo 1;
    }else{
       echo 0;
    }
?>
