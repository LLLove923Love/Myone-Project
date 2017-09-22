//
require(["http://localhost:8080/js/requireJs/config.js"], function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common"], function($,con) {
		$("#footer").load("common/footer.html",function(){
			con.footer();
		});
		
		$(".button1").eq(0).click(function(){
			var username = $(".login-right .login-Form").eq(0).find("input").val();
			var pwd = $(".login-right .login-Form").eq(1).find("input").val();
			$.post("/api/home/user/login.html",{type:"1",phone:username,password:pwd},function(data){
				data = JSON.parse(data);
				if(!data.status){
					//提示框提示
					$(".hint").fadeIn(500);
					$(".hint").text(data.msg);
					setTimeout(function(){
						$(".hint").fadeOut(500);
					},2000);
				}else{
					window.location.href = "./main.html";
				}
			});
		})
		
		
//		$.ajax({
//			type:"get",
//			url:"/api/home/user/login.html?type=1&phone=13156950738&password=washiliuli",
//			async:true,
//			dataFilter:function(data){
//				console.log(data);
//			}
//		});
					
	});
});