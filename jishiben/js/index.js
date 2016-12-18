/**
 * Created by Administrator on 2016/11/23.
 */
$(function(){
    //封面代码
	btnNot();
    var dheight= document.documentElement.clientHeight;
    $('#fenmian').css('height', '' +dheight + 'px');
    //注册页面代码
    $('#yhm').on('blur',function(){     //用户名验证
		var reg=/^[a-zA-Z\d]\w{7,10}[a-zA-Z\d]$/i;
		if(!(reg.test($('#yhm').val()))){
			$('#ltr1').text('用户名格式不正确');
			$('#ltr1').css({'color':'red'});
		}else{
            var str=$('#yhm').val()
            var keyword='yhm='+str;
            $.ajax({
                type:'post',
                url:'php/jsb-yan.php?'+keyword,
                success:function(data){
                    if(data==0){
                        $('#ltr1').text('用户已存在，请更换用户名！');
                        $('#ltr1').css({'color':'red'});
                    }else{
                        $('#ltr1').text('用户名可以使用！');
                        $('#ltr1').css({'color':'green'});
                    }
                }
            })
        }
    })
    $('#mm').on('blur',function(){  //验证密码
	    var reg=/^\w{6,12}$/i;
	    if(!(reg.test($('#mm').val()))){
			$('#ltr2').text('密码格式不正确');
			$('#ltr2').css({'color':'red'});
		}else{
            $('#ltr2').text('密码可以使用！');
            $('#ltr2').css({'color':'green'});
        }
    })
    $('#rmm').on('blur',function(){  //密码重复验证
        if ($('#mm').val()!= $('#rmm').val()) {
            $('#ltr3').text('密码不相同,请重新输入！');
            $('#ltr3').css({'color':'red'});
        }else{
            $('#ltr3').text('');
        }
    })
    $('#lxfs').on('blur',function(){
        var reg=/^1[34578]\d{9}$/;
        if($('#lxfs').val().length==0){
            $('#ltr4').text('联系方式不能为空！');
            $('#ltr4').css({'color':'red'});
        }else if(!(reg.test($('#lxfs').val()))){
            $('#ltr4').text('手机号码有误，请重填！');
            $('#ltr4').css({'color':'red'});
        }else{
            var str=$('#lxfs').val();
            var keyword='lxfs='+str;
            $.ajax({
                type:'post',
                url:'php/jsb-sj.php?'+keyword,
                success:function(data){
                    if(data==0){
                        $('#ltr4').text('手机已注册，请更换！');
                        $('#ltr4').css({'color':'red'});
                    }else{
                        $('#ltr4').text('联系方式可用！');
                        $('#ltr4').css({'color':'green'});
						btnYes();
                    }
                }
            })
        }
    })
        $('#zhc').on('click',function(){   //点击提交注册信息
        var keyword='jyhm='+$('#yhm').val()+'&jpwd='+$('#mm').val()+'&jlxfs='+$('#lxfs').val();
        $.ajax({
            type:'post',
            url:'php/jsb-c.php?'+keyword,
            success:function(data){
                if(data=='ok'){
                    location.href="#denglu";  //跳转到登陆页面
                    location.reload();   //局部刷新
                }else{
                    $('#ltr4').text('注册失败！');
                    $('#ltr4').css({'color':'red'});
                }
            }
        })
    })

    //登陆页面
    $('#dl').unbind('click').bind('click',function(){
        var str=$('#dyhm').val();
        var keyword='jyhm='+$('#dyhm').val()+'&jpwd='+$('#dmm').val();
        $.ajax({
            type:'post',
            url:'php/jsb-dl.php?'+keyword,
            success:function(data){
                //console.log(data);
                sessionStorage.setItem('zphp',data);
                if(data==0){
                    sessionStorage.setItem('localname',str);
                    location.href="#page1";  //跳转到首页
                    getShuju();
                    location.reload();  //局部刷新
                }else{
                    $('#dtr2').text('用户名或密码错误！');
                    $('#dtr2').css({'color':'red'});
                }
            }
        })
    })
    var ename=sessionStorage.getItem('localname');//用户登录所用的用户名
    $('#yh').text(ename);
    function getShuju(){  //登陆以后，自动从数据库获取该用户相关数据；
        var keyword='jyhm='+ename;
        $.ajax({
            type:'get',
            url:'php/jsb-hqsj.php?'+keyword,
            success:function(data){
                var arr=JSON.parse(data); //将字符串类型的data转化为json类型
                for(var i=0;i<arr.length;i++){
                    var lnum=arr[i]['cfl'];
                    var li1=$('<li><a class="aa ui-btn" href="#" data-code="obj1479884831982">'+arr[i]['ctitle']+'</a></li>');
                    sySql(lnum,li1);
                    li1.children('a').click(function(){
                        var myid=$(this).parent().parent().find('li:first').attr('id');
                        var tit=$(this).text();
                        var xid;
                        var xfl;
                        var con;
                        for(var j=0;j<arr.length;j++){
                            if(tit==arr[j]['ctitle']){
                                xid=arr[j]['cid'];
                                xfl=arr[j]['cfl'];
                                con=arr[j]['ccontent'];
                            }
                        }
                        btClick(myid,tit,con);  //跳转到对应信息内别的页面
                        $('#xiug').click(function(){  //跳转到修改页面 为页面添加相关的标题和内容
                            xiuGai(tit,con);
                        })
                        $('#gxin').click(function(){  //点击将修改好的内容传递到数据库
                            location.reload()
                            xgSjk(xid,$('#biaotir').val(),$('#zhengwenr').val());
                            list(xfl)
                        })
                        $('#clear').click(function(){  //删除该条信息
                            scSjk(xid);
                            location.reload();
                            list(xfl);
                        })
                        $('#gback').click(function(){  //返回前一页
                            location.reload();
                            list(xfl);
                        })
                    })
                }
            }
        })
    }
    getShuju();
    //增加事记
    function getColor(btn1,btn2,btn3,btn4,btn5){  //点击切换变换背景色
        btn1.css({"background":"#fff","color":"#000"});
        btn2.css({"background":"#fff","color":"#000"});
        btn3.css({"background":"#fff","color":"#000"});
        btn4.css({"background":"#fff","color":"#000"});
        btn5.css({"background":"#66A1D0","color":"#fff"});
    }
    var num=0;
	getColor($('#btn2'),$('#btn3'),$('#btn4'),$('#btn5'),$('#btn1'));
    $('#btn1').on('click',function(){   //四个分类之间切换边背景色，同时在本地存储一个数字，代表该类，以后使用
        getColor($('#btn2'),$('#btn3'),$('#btn4'),$('#btn5'),$(this));
        num=1;
    })
    $('#btn2').on('click',function(){
        getColor($('#btn1'),$('#btn3'),$('#btn4'),$('#btn5'),$(this));
        num=2;
    })
    $('#btn3').on('click',function(){
        getColor($('#btn2'),$('#btn1'),$('#btn4'),$('#btn5'),$(this));
        num=3;
    })
    $('#btn4').on('click',function(){
        getColor($('#btn2'),$('#btn3'),$('#btn1'),$('#btn5'),$(this));
        num=4;
    })
	$('#btn5').on('click',function(){
        getColor($('#btn2'),$('#btn3'),$('#btn1'),$('#btn4'),$(this));
        num=0;
    })
    $('#cun').unbind('click').bind('click',function() {   //点击将记事存入数据
		var str=$('#biaot').val();
        var keyword='jyhm='+ename+'&cfl='+num+'&ctitle='+$('#biaot').val()+'&ccontent='+$('#zhengwen').val();
        sessionStorage.setItem('biaoti',str);
        $.ajax({
            type: 'post',
            url: 'php/jsb-js.php?' + keyword,
            success: function (data) {
                if(data='ok'){
                    list(num);
                    location.reload();
                    getShuju();
                }
            }
        })
    })
})
function list(how){    //根据传入的参数跳到不同的页面
    if(how=='1'){
        location.href='#page-rc';
    }else if(how=='2'){
        location.href='#page-hy';
    }else if(how=='3'){
        location.href='#page-sw';
    }else if(how=='4'){
        location.href='#page-sb';
    }else{
        location.href='#page-qt';
    }
}
function sySql(b,li){    //从数据库获取数据以后 将标题和数量显示
    if(b=='1'){
        li.insertAfter($('#li1'));
        $('#shu1').text($('#sjlb1 li').length-1);
        $('#s2').text($('#sjlb1 li').length-1);
    }else if(b=='2'){
        li.insertAfter($('#li2'));
        $('#shu2').text($('#sjlb2 li').length-1);
        $('#s3').text($('#sjlb2 li').length-1);
    }else if(b=='3'){
        li.insertAfter($('#li3'));
        $('#shu3').text($('#sjlb3 li').length-1);
        $('#s4').text($('#sjlb3 li').length-1);
    }else if(b=='4'){
        li.insertAfter($('#li4'));
        $('#shu4').text($('#sjlb4 li').length-1);
        $('#s5').text($('#sjlb4 li').length-1);
    }else if(b=='0'){
        li.insertAfter($('#li5'));
        $('#shu5').text($('#sjlb5 li').length-1);
        $('#s6').text($('#sjlb5 li').length-1);
    }
    var fen1=Number($('#s2').text());
    var fen2=Number($('#s3').text());
    var fen3=Number($('#s4').text());
    var fen4=Number($('#s5').text());
    var fen5=Number($('#s6').text());
    var zong=fen1+fen2+fen3+fen4+fen5;
    $('#s1').text(zong);
}
function btClick(which,titl,cont){    //封装li点击的时候要跳转的页面和页面里面的内容
    location.href="#page4";
    $('#tit').text(titl);
    $('#con').text(cont)
    if(which=='li1'){
        $('#nrbt').text('日常事记');
    }else if(which=='li2'){
        $('#nrbt').text('重要会议');
    }else if(which=='li3'){
        $('#nrbt').text('散文');
    }else if(which=='li4'){
        $('#nrbt').text('随笔');
    }else if(which=='li5'){
        $('#nrbt').text('其他');
    }
}
function xiuGai(btr,zhwr){   //点击修改所要触发的方法
    $('#biaotir').val(btr);
    $('#zhengwenr').val(zhwr);
}
function xgSjk(lis,ctit,ccon){   //在修改页面修改完毕以后点击更新，将数据库的信息进行修改
    var keywords='cid='+lis+'&ctitle='+ctit+'&ccontent='+ccon;
    $.ajax({
        type: 'post',
        url: 'php/jsb-xg.php?' + keywords,
        success: function (data) {
            if(data==1){
				console.log(1);
                getShuju();
            }else {
                alert('修改失败')
            }
        }
    })
}
function scSjk(lis){   //在修改页面修改完毕以后点击更新，将数据库的信息进行删除
    var keywords='cid='+lis
    $.ajax({
        type: 'post',
        url: 'php/jsb-sc.php?' + keywords,
        success: function (data) {
            if(data==1){
                getShuju();
            }else {
                alert('删除失败')
            }
        }
    })
}
function btnNot(){  //验证注册信息不正确不能点击提交注册按钮
	$('#zhc').attr('disabled','true');
}
function btnYes(){  //验证注册信息正确能点击提交注册按钮
	$('#zhc').removeAttr('disabled');
}