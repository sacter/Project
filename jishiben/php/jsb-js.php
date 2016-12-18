<?php
   header("Content-type:text/html;charset:UTF-8");
   include('jsb-lj.php');
   $jyhm=$_REQUEST['jyhm'];
   $cfl=$_REQUEST['cfl'];
   $ctitle=$_REQUEST['ctitle'];
   $ccontent=$_REQUEST['ccontent'];
   $sql="insert into jishi(jyhm,cfl,ctitle,ccontent)values('$jyhm','$cfl','$ctitle','$ccontent')";
   if($conn->query($sql)===true){
          echo 'ok';
   }else{
          echo 'Error:'.$sql1.'<br>'.$conn->errpr;
   }
   $conn->close();
?>
