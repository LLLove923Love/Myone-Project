//
require(["http://localhost:8080/js/requireJs/config.js"], function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","Ajax","cookie"], function($,con,ax,cok) {
			$("div#comment").load("common/top.html",function(){
				con.start();
				ax.aInput();
				ax.textbtn();
				//购物车数量
				var onj = JSON.parse(cok.getCookie("goods"));
				$("#cartNums").text(onj.count);
			});
			$("div#footer").load("common/footer.html",function(){
				con.footer();
			});
			var scr = $("<script src='../js/bootstrap/bootstrap.js'></script>");
			$("body,html").append(scr);
			//advantage图标执行
			var temp=[{x:4,y:4},{x:-78,y:4},{x:-148,y:4},{x:4,y:-23},{x:-78,y:-23},{x:-148,y:-23}]
			$(".advantage-left li span").each(function(index){
				$(this).attr("style","background:url(/img/logo/advantage-icons.png) "+ temp[index].x+"px "+ temp[index].y+"px")
			})
			
			
			
			//图片滑动
			$(".advantage-right img").hover(
				function(){
					$(this).finish();
					$(this).animate({"marginLeft":-5},500);
				},
				function(){
					$(this).animate({"marginLeft":0},500);
				}
				
			)
			//左边滚动阶梯
			var arr=[807,1187,1767,2347,2927,3507,4087,4257];
			//点击时的颜色
			if($(".staris-left").scrollTop()<=170){
				$(".staris-left").fadeOut(200);
			}
			$(".staris-left li").mousedown(function(){
				var index=$(this).index();
				$("body,html").animate({"scrollTop":arr[index]},1000);
			});
			//滚动时的颜色
			$(window).scroll(function(){
				//滚动消失出现
				var _scrollTop = $(this).scrollTop();
				if(_scrollTop >170){
					$(".staris-left").fadeIn(200);
				}else{
					$(".staris-left").fadeOut(200);
				}
				//滚动改颜色
				arr.forEach(function(item,index){
						if(_scrollTop >= item && (_scrollTop < arr[index+1])){
							$this = $(".staris-left li").eq(index);
							addColor($this);
						}	
						if(_scrollTop>=4140){
							$this = $(".staris-left li").eq(7);
							addColor($this);
					}
				})
			})
	//碰到img时，div动
//		$(".blink-a img").mouseover(
//		function(){
//			$(".blink-white").show();
//			$(".blink-white").animate({"left":220},200,function(){
//				$(".blink-white").hide();
//				$(".blink-white").css("left",0);
//			});
//			
//		});





	//slide左右点击
	$(".start-li").each(function(index){
		console.log(index);
		$(this).css({
			"position":"absolute",
			"top":0,
			"left":240*index
		})
	})
	//左右箭头
	$(".right-icon").mousedown(function(){
		$(".start-li").each(function(index){
			if($(".start-li:last").position().left<=960){
				return ;
			}else{
				$(this).animate({left:$(this).position().left-240},500);
			}
		})
	})
	$(".left-icon").mousedown(function(){
		$(".start-li").each(function(index){
			if($(".start-li:first").position().left<0){
				$(this).animate({left:$(this).position().left+240},500);
			}else{
				return;
			}
		})
	})

	});
		
});
//阶梯增加颜色
	function addColor($this){
			$this.attr("style","background:#8FC31F");
			$this.find("a").attr("style","color:#fff");
			$this.siblings().removeAttr("style");
			$this.siblings().find("a").removeAttr("style");
	}
