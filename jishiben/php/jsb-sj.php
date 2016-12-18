<?php
   header("Content-type:text/html;charset:UTF-8");
       include('jsb-lj.php');
       $lxfs=$_REQUEST['lxfs'];
       $sql="select * from sjsb where jlxfs='$lxfs'";
       $result=$conn->query($sql);
          if($result->num_rows>0){
                     echo 0;
           }else{
                     echo 1;
           }
          $conn->close();
?>
