<?php
   header("Content-type:text/html;charset:UTF-8");
      include('jsb-lj.php');
      $jyhm=$_REQUEST['jyhm'];
      $a=array();
      class jishi{
         public $cid;
         public $cfl;
         public $ctitle;
         public $ccontent;
      }
      $sql="select * from jishi where jyhm='$jyhm'";
      $result=$conn->query($sql);
         if($result->num_rows>0){
            while($row=$result->fetch_assoc()){
                   $c=new jishi();
                   $c->cid=$row["cid"];
                   $c->cfl=$row["cfl"];
                   $c->ctitle=$row["ctitle"];
                   $c->ccontent=$row["ccontent"];
                   $a[]=$c;
            }
         }
         $conn->close();
         echo json_encode($a);
?>
