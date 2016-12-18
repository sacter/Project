<?php
    header("Content-type:text/html;charset:UTF-8");
    include('jsb-lj.php');
    $yhm=$_REQUEST['yhm'];
    $sql="select * from sjsb where jyhm='$yhm'";
    $result=$conn->query($sql);
       if($result->num_rows>0){
                  echo 0;
        }else{
                  echo 1;
        }
       $conn->close();
?>
