//
require(["http://localhost:8080/js/requireJs/config.js"], function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common"], function($,con) {
		//添加尾部
		$("#footer").load("common/footer.html",function(){
			con.footer();
		});
		//register-left
		var $input = $(".register-left input");
		var checkArr = {
			"username":/^[a-zA-Z]\w{5,19}$/,
			"telephone":/^[1][3|5|8]\d{9}$/,
			"password":/^[0-9a-zA-Z-_=&\$#@]{6,30}$/,
			"code":/^[\w|\d]{7}$/
		}
		var oValue = null;
		//正则校验
		$input.each(function(index,item){			
			$(item).on("keyup",function(){
			if(!!checkArr[$(item).attr("pattern")]){
				var ispass = checkArr[$(item).attr("pattern")].test(this.value);
				if(ispass){
					$(item).attr("pass",ispass);
				}
				if($(item).attr("pattern") == "password"){
					oValue = this.value;
					
				}
			}
			switch($(item).attr("pattern")){
				case "Img":{
					if(this.value == $(item).attr("num")){
						$(item).attr("pass","true");
						
					}
					break;
				};
				case "Code":{
					if(this.value == 2222){
						$(item).attr("pass","true");
					}
					break;
				};
				case "pwd":{
					if(this.value == oValue){
						$(item).attr("pass","true");
					}
					break;
				};
			}
			
		})
			
	});
	//checkbox点击
	$("input[type='checkbox']").mousedown(function(){
		if(!$("input[type='checkbox']").prop("checked")){
			$(this).attr("pass","true");
		}else{
			$(this).attr("pass","false");
		}
	})
		
		
	
		//注册键点击
		$(".button").mousedown(function(){
			var count =0;
			var oindex= [];
			console.log($input)
			$input.each(function(index,item){
				if($(item).attr("pass")=="true"){
					count++;
					console.log(count)
				}else{
					oindex.push(index);
				}
			})
			if(count==8){
				console.log("chengh")
				$(".button").submit();
				return;
			}
			var index= oindex[0];
			
			var oText = $input.eq(index).parent().text().split("").slice(2,);
			var str="";
			
			oText.forEach(function(item){
				if(item ==":"){
					return str;
				}
				if(item!="*"&&item!=null){
					str+=item;
				}
			});
			//提示框提示
			$(".hint").fadeIn(500);
			$(".hint").text(str+"输入错误");
			if(index == 7){
				$(".hint").text("请接受注册协议");
			}
			setTimeout(function(){
				$(".hint").fadeOut(500);
			},2000);
	});
	//小眼点一下
	var iseye = false;
	$(".eye").mousedown(function(){
		if(!iseye){
			$(this).css({"background":"url(/img/login/password_icon1.png)"});
			$(this).parent().find("input").attr("type","text");
			iseye = true;
		}else{
			$(this).css({"background":"url(/img/login/password_icon2.png)"});
			console.log($(this).parent().find("input").attr("type"));
			$(this).parent().find("input").attr("type","password");
			iseye = false;
		}
	});
	
	
	//验证码拿到
	var numb = parseInt(Math.random()*100000);
	$(".img-code").find("img").attr("src","/api/home/index/verifyCode?15059029"+numb);
	$(".img-code").find("img").mousedown(function(){
			$(this).attr("src","/api/home/index/verifyCode?15059029"+numb);
	})
	
	
//	$.ajax({
//		type:"get",
//		url:"/api/home/index/verifyCode?15059029"+numb,
//		async:true,
//		scriptCharset : 'utf-8',
//		dataFilter:function(data){
//			var img=$("<img>")
//			img.attr("src","data:image/png;base64"+data);
//			$("body").append(img);
//		}
//	});
//	
	
	
	
});
});