//
require(["http://localhost:8080/js/requireJs/config.js"],function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","addCard","cookie","Ajax"], function($,con,add,cok,ax) {
			$("div#comment").load("common/top.html",function(){
				con.start();
				//购物车数量
				ax.aInput();
				ax.textbtn();
				var onj = JSON.parse(cok.getCookie("goods"));
				$("#cartNums").text(onj.count);
			});
			$("div#footer").load("common/footer.html",function(){
				con.footer();
			});
			//购物车能不能添加
		add.loginin();
//			var usern = $("input[name='phone']").val();
//			var passw = $("input[name='password']").val();
//			$(".login .btn-block").mousedown(function(){
//				console.log("jis");
//				$.post("/api/home/user/login.html",{type:"1",phone:usern,password:passw},function(data) {
//					fals = data.status;
//					console.log(fals);
//					add.loginin(fals);
//				},"json");
//			})
			
			
			
			
			//鼠标放大图片
			var $cover = $(".details-cover");
			$cover.hide();
			$(".details-img").mousemove(function(e){
					var e = e||event;
					$cover.show();
					$(".details-bigImg").show();
					$cover.css({
						"left":Math.min($(this).width()-$cover.width(),Math.max(0,e.pageX-$(this).offset().left- $cover.width()/2)),
						"top":Math.min($(this).height()-$cover.height(),Math.max(0,e.pageY - $(this).offset().top + $(this).scrollTop() - $cover.height()/2))
					})
					var dig = ($(".details-bigImg img").width()- $(".details-bigImg").width())/($(".details-img img").width()-$cover.width());
					$(".details-bigImg>img").css({
						"left":$cover.position().left * -dig,
						"top":$cover.position().top * -dig
					});
					
				});
				$(".details-img").mouseout(function(){
						$cover.hide();
						$(".details-bigImg").hide();
				});
				
				
				
				//鼠标滑过图片。进行交换
				$(".items-img li img").hover(
					function(){
						console.log($(this).attr("src"));
						$(this).css("border","1px solid #f2f2f2");
						$(".details-img img").attr("src",$(this).attr("src"));
						$(".details-bigImg img").attr("src",$(this).attr("src"));
					},
					function(){
						$(this).css("border","1px solid #fff")
					}
			)
				
			//点击租用时间，相当于点击input
				$(".box-select-date li").eq(0).css({
					"border":"1px solid #85c12e",
					"background":"url(/img/details/selecteds.jpg) no-repeat right bottom"
					});
					$(".box-select-date li:first").find("span").eq(2).addClass("start-num");
				    $(".box-select-date li").find("input").hide();
			$(".box-select-date li").mousedown(function(){
				$(".price-number").html($(this).find("span").eq(1).html());
				$(".money").html($(".price-number").html());
				$(this).find("span").eq(2).addClass("start-num");
				$(this).siblings().find("span").removeClass("start-num");
				$(this).css({
					"border":"1px solid #85c12e",
					"background":"url(/img/details/selecteds.jpg) no-repeat right bottom"
				});
				$(this).siblings().css({
					"border":"1px solid #ccc",
					"background":"none"
				});
//				$(this).siblings().find("input").removeAttr("checked");
//				$(this).find("input").attr("checked","checked");
			});
			
			
			
			//点击之后，数量会变
			$(".price-number").html($(".box-select-date li").find("span").eq(1).html());
			$(".money").html($(".price-number").html());
			$(".cut").mousedown(function(){
				var num = document.getElementById("Input").value;
				if(num>1){
					num--;	
				}
				document.getElementById("Input").value = num;
				$(".deposit p span").eq(1).html($(".deposit p span").eq(0).html()*num+".00");
				$(".money").html($(".price-number").html()*num+".00");
			})
			$(".add").mousedown(function(){
				var num = document.getElementById("Input").value;
				console.log(num);
				num++;	
				document.getElementById("Input").value = num;
				$(".deposit p span").eq(1).html($(".deposit p span").eq(0).html()*num+".00");
				$(".money").html($(".price-number").html()*num+".00");
			})
			//点击之后有等号出现
			var sum = 0;
			var count = 0;
			$(".digtal-num").each(function(){
				var test = false;
				$(this).mousedown(function(){
					test=(test == false? true:false);
					if(test){
						sum+=Number($(this).parent().find("span").text());
					
					}else{
						sum-=Number($(this).parent().find("span").text());
						
					}
					$(".sum-price").text(241+sum+".00");
					if(test == true){
						count++;
					}else{
						count--;
					}
					$("#parts_num").html(count);
				});
				
				
				
				//下方三个参数按钮
				$(".products-details-top li:first").css({
					"background":"#8FC31F",
					"color":"#fff"
				});
				$(".products-details-top li").mousedown(function(){
					$("body,html").animate({"scrollTop":1273},500);
					$(".products-details-bottom").hide();
					$(".products-details-bottom").eq($(this).index()).show();
					$(this).parent().find("li").css({
						"background":"#f7f7f7",
						"color":"#333"
					});
					$(this).css({
						"background":"#8FC31F",
						"color":"#fff"
					});
				})
			})
			
			//window滚动时
			$(window).scroll(function(){
				if($("body").scrollTop() > $(".surround").offset().top){
					$(".fixed-top-products").css({
						"position":"fixed",
						"top":0
					})
					$(".products-details-top").find("a").show();
					$(".fixed-top-products").find(".details-hide").hide();
					$(".fixed-top-products").find(".details3").show();
					
				}else{
					$(".fixed-top-products").css({
						"position":"static",
						"top":0
					})
					$(".products-details-top").find("a").hide();
					$(".fixed-top-products").find(".details-hide").show();
					$(".fixed-top-products").find(".details3").hide();
				}
			})
			//添加至cookie
			var countn = 0;
			$(".cart-add").mousedown(function(){
				countn++;
				var claspmonth = $(".start-num").text()
				var pname = $(".details-Selects>h4").text();
				var pdetail = $(".details-Selects>p").text();
				var pprice = $(".price-number").text();
				var pnumber = $("#Input").val();
				var pya = $(".deposit>p>span:first").text();
				var pmonth = parseInt($(".start-num").text());
				console.log(pmonth);
				var pmoney = $(".money").text();
				var imgsrc = $(".details-img>img").attr("src");
				var pday =$(".select-date button").text();
				var obj ={
					"imgsrc":imgsrc,
					"pname":pname,
					"pdetail":pdetail,
					"pprice":pprice,
					"pnumber":pnumber,
					"pya":pya,
					"pmonth":pmonth,
					"pmoney":pmoney,
					"pday":pday,
					"count":0+countn
				}
				var cookiestr = cok.getCookie("goods");
				if( cookiestr == "" || cookiestr == null) {
						arr = []; 
					} else {
						arr = JSON.parse(cookiestr); 
					}
					console.log(arr);
				var resarr = arr.filter(function(item, index){
						return obj.pname == item.pname && obj.pprice == item.pprice && obj.pmonth == item.pmonth;
					});
					
					if(resarr.length > 0) {
						resarr[0].pnumber=Number(resarr[0].pnumber)+Number(obj.pnumber);
					} else {
						obj.pnumber= 1;
						arr.push(obj);
					}
					cok.setCookie("goods",JSON.stringify(arr), "8", "/");

				$("#cartNums").text(countn);
			});
				
	});
});