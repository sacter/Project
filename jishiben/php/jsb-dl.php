<?php
    header("Content-type:text/html;charset:UTF-8");
    include('jsb-lj.php');
    $jyhm=$_REQUEST['jyhm'];
    $jpwd=$_REQUEST['jpwd'];
    $sql="select * from sjsb where jyhm='$jyhm'&&jpwd='$jpwd'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
           echo 0;
    }else{
           echo 1;
    }
    $conn->close();
?>
