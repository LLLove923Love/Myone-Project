define(["jquery"],function($){
	
	function commen(){
		this.start = function(){
			//nav下拉菜单
			var index = 0;
			var temp = [1, -35, -15, -52, -68];
			$(".nav-selector h5 span").each(function(i) {	
				$(this).attr("style", "background: url(/img/logo/listnavIcon.png) no-repeat -1px " + temp[i] + "px");
			});
			
			$(".nav-selector li").hover(
				function() {
					index = $(this).index();
					$(this).find("span").css({
						"background": "url(/img/logo/listnavIcon.png) no-repeat -16px " + temp[index] + "px",
						"transform": "rotateY(180deg)"
					});
				},
				function() {
					index = $(this).index();
					$(this).find("span").css({
						"background": "url(/img/logo/listnavIcon.png) no-repeat -1px " + temp[index] + "px",
						"transform": "rotateY(0deg)"
					});
				});
			//		$(".div-one").on("mouseenter mouseleave",function(e){
			//				$(this).next(".sliter-one").find("a").css({
			//					"left":0,
			//					"width":0
			//				});
			//				
			//				if(e.target ==$(this).get(0)){
			//					if(e.type == "mouseenter"){
			//						setTimeout(function(){ 
			//							var $This =$(this).next(".sliter-one").find("a");
			//							$This.animate({left:-90,width:90},500);
			//							$This.text("新手指引");
			//							$This.css("display","block");
			//						
			//					}.bind(this),500);
			//				}else{
			//							$(this).next(".sliter-one").find("a").css("display","none");
			//						
			//						}
			//			}
			//					
			//				
			//			});
			//		});
			//右边固定
			$(".fixed-div").each(function() {
				var $This = $(this).find(".sliter-one").find("a");
				var $kefu = $(this).find(".sliter-two");
				$(this).hover(function() {
						//one
						$This.css({
							"left": 0,
							"width": 0
						});
						$This.animate({
							left: -90,
							width: 90
						}, 1000);
						$This.text("新手指引");
						$This.show();
						//two
						$kefu.css("right", "55px");
						$kefu.show();
						$kefu.animate({
							right: 48
						}, 500);

					},
					function() {
						$This.hide();
						$kefu.hide();
					});

			});
			$(".div-five").click(function() {
				console.log("nihao ");
				$("body,html").animate({
					scrollTop: 0
				}, 500);
				
			});
			
		},
		this.footer=function(){
			var temp = [1,-55,-98,-151];
			$(".flooter .add-line span").each(function(index){
				$(this).attr("style","background: url(/img/logo/footer-icon.png) no-repeat "+temp[index]+"px 2px")
			});
		},
	
	this.nev = function(){
		$(".nav-selector").css("display","none");
		$(".mainsort").hover(function(){
			$(".nav-selector").finish();
			$(".nav-selector").fadeIn(200);
		},
		function(){
			$(".nav-selector").fadeOut(200);
		}
		)}
	}
	
	return new commen();
})
