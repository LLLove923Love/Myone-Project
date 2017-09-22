//
require(["http://localhost:8080/js/requireJs/config.js"], function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","cookie","template","Ajax"], function($,con,cok,tem,ax) {
		//添加尾部
		$("div#comment").load("common/top.html",function(){
				con.start();
				con.nev();
				//购物车数量
//				var onj = JSON.parse(cok.getCookie("goods"));
//				$("#cartNums").text(onj.count);
				ax.aInput();
				ax.textbtn();
			});
		$("#footer").load("common/footer.html",function(){
			con.footer();
		});
		
		$.post("/api/home/cart/getdata.html", function(data) {
					$(".shopping-center>ul").append(data.data);
			},"json");
			
			
			//点击之后，数量会变
//			$(".price-number").html($(".box-select-date li").find("span").eq(1).html());
//			$(".money").html($(".price-number").html());
			
			
			//克隆
			
//			cookiestr.forEach(function(item,index){
//				var cloneul = $(".goods_box").clone(true);
//				$(".img>a>img").attr("src",item.imgsrc);
//				$(".cart-h3>a").text(item.pname);
//				$(".cart-h3").text(item.pdetail);
//				$(".goods_box td").eq(2).text(item.pprice);
//				$(".rent_num").val(item.pnumber) ;
//				$(".goods_box td").eq(3).text(item.pya);
//				$(".goods_box td").eq(6).text(item.pmonth);
//				$(".good_all_price").text(parseInt(item.pnumber * item.pprice));
//				$("tbody").append(cloneul);
//			})
			var cookiestr = JSON.parse(cok.getCookie("goods"));
			if(cookiestr !=null){
				var htmltext = tem.template("shopping-page",cookiestr);
				$("tbody").html(htmltext);
				var countprice = 0;
				cookiestr.forEach(function(item){
					countprice += Number(item.pmoney);
				})
				cookiestr.forEach(function(item,index){
					
					clickBth(item,index,countprice);
				})
			}
			
			
			//delete键
			$(".delete").mousedown(function(){
				allprice();
				var cookiestr = JSON.parse(cok.getCookie("goods"));
				$this = $(this);
				$(this).parent().fadeOut(500,function(){
					$(this).parent().remove();
					allprice();
				});
				var temp=[];
				var str = $this.parent().parent().find(".txt a").text();
				str = str.replace( /\s+/g , "");
				cookiestr.forEach(function(item,index){
					console.log($this.parent().parent().find(".big").text());
					if(item.pname.replace( /\s+/g , "") == str && Number(item.pmonth) == Number($this.parent().parent().find("td").eq(6).text()) && Number(item.pprice) == Number($this.parent().parent().find("td").eq(2).text())){
						
					}else{
						temp.push(item);
					}
					console.log(temp);
				});
				cok.setCookie("goods",JSON.stringify(temp), "8", "/");

				if(JSON.parse(cok.getCookie("goods")) ==""){
					$(".none-shopping").show(500,function(){
					$(".all_price").text(0.00);
				});
				}else{
					$(".none-shopping").hide();
				}
			});
			if(JSON.parse(cok.getCookie("goods")) ==""){
				$(".none-shopping").show(500,function(){
					$(".all_price").text(0.00);
				});
				
			}else{
				$(".none-shopping").hide();
			}
			
			
			
			//清空购物车
			$(".removecart").mousedown(function(){
				cok.setCookie("goods",JSON.stringify([]), "8", "/");
				$(".goods_box").remove();
				$(".none-shopping").show(500,function(){
					$(".all_price").text(0.00);
				});
			})
			
			
			//全选
			$(".allcheckSelect").find("input").mousedown(function(){
				console.log($(".allcheckSelect").find("input").prop("checked"));
				if($(".allcheckSelect").find("input").prop("checked") == false){
					$("input[name = cart_ids]").prop("checked",true);
				}else{
					$("input[name = cart_ids]").prop("checked",false);
				}
			})
			allprice();
		});
	});
	function clickBth(item,index,allprice){
		$(".num_box").eq(index).find("i").eq(0).mousedown(function(){
				var num = $(this).parent().find("input").val();
				if(num>1){
					num--;	
				}
				$(this).parent().find("input").val(num);
				var count=Number(item.pprice)*num;
				$(this).parent().parent().parent().find(".subtotal>span").text(count);
				
				//点击时实时
				var ppriceall = 0;
				$("input[name = cart_ids]").each(function(index){
					if($(this).prop("checked",true)){
						ppriceall+=Number($(this).parent().parent().find(".subtotal>span").text());
						$(".all_price").text(ppriceall);
					}
				})
				$(".all_price").text(ppriceall);
		});
		$(".num_box").eq(index).find("i").eq(1).mousedown(function(){
				var num = $(this).parent().find("input").val();
				console.log(num);
					num++;	
				$(this).parent().find("input").val(num);
				var count=Number(item.pprice)*num;
				$(this).parent().parent().parent().find(".subtotal>span").text(count);
				//点击时实时执行
				var ppriceall = 0;
				$("input[name = cart_ids]").each(function(index){
					if($(this).prop("checked",true)){
						ppriceall+=Number($(this).parent().parent().find(".subtotal>span").text());
						$(".all_price").text(ppriceall);
					}
				})
				$(".all_price").text(ppriceall);
		});
//			var cookiestr = JSON.parse(cok.getCookie("goods"));
//			cookiestr[index].pnumber =  $().find("input").val();
//			cookiestr[index].pmoney =  $(this).parent().parent().parent().find(".subtotal>span");
//			cookiestr[index].pmoney =  $(this).parent().find("input").val();
//			cookiestr[index].pprice =  $(this).parent().find("input").val();
	}
function allprice(){
		var ppriceall = 0;
			$("input[name = cart_ids]").each(function(index){
				if($(this).prop("checked",true)){
					ppriceall+=Number($(this).parent().parent().find(".subtotal>span").text());
					$(".all_price").text(ppriceall);
				}
				
			})
			$(".all_price").text(ppriceall);
}
