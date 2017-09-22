define(["jquery"],function($){
	
	function AjaxConnect(){
		this.Coec = function(){
			ajaxpost("0","12","");
		},
		//a的
		this.textInput = function(){
			$(".slider-product").empty();
				var at = GetQueryString("word");
				console.log(at);
				if(at != null){
					ajaxpost("0","8",at);	
				}
				var at="";
			$(".logo-Form>p>a").mousedown(function(){				
				$(".slider-product").empty();
				at = $(this).text();
				ajaxpost("0","8",at);
				$(".hasSelected>strong").text("当前筛选 >"+at);
			})
			$(".sort-pro>ul>li").mousedown(function(){
				$(".slider-product").empty();
				if($(this).index() == 1 && at!=""){
					ajaxpostsort("0","12",at,"up");
				}
				if($(this).index() == 2 && at!=""){
					ajaxpostsort("0","12",at,"down");
				}
			})
			
		}
		//search页面的input
		this.hrefInput = function(){
			$(".slider-product").empty();
			var va = GetQueryString("value");
			console.log(va);
			if(va != null){
				ajaxpost("0","12",va);
			}
			$(".btn").mousedown(function(){				
				$(".slider-product").empty();
				var at = $(".tex").val();
				ajaxpost("0","12",at);
				$(".hasSelected>strong").text("当前筛选 >"+at);
			})
			$(".sort-pro>ul>li").eq(0).css("color","#85C12E");
			$(".sort-pro>ul>li").mousedown(function(){
				$(".slider-product").empty();
				$(this).css("color","#85C12E");
				$(this).siblings().css("color","#333");
				var at = $(".tex").val();
				if($(this).index() == 1 && at!=""){
					ajaxpostsort("0","12",at,"up");
				}
				if($(this).index() == 2 && at!=""){
					ajaxpostsort("0","12",at,"down");
				}
				
			})
			
		}
		//a的跳转
		this.aInput = function(){
			$(".logo-Form>p>a").mousedown(function(){				
				var at = $(this).text();
				$(this).attr("href","search.html?word="+at);
			})
			
		}
		//input的跳转
		this.textbtn = function(){
			$(".btn").mousedown(function(){				
				$(".slider-product>ul").empty();
				var at = $(".tex").val();
				$(this).attr("href","search.html?value="+at);
			})
		}
		this.resetfunc = function(){
			$.post("/api/Home/Goods/listing.html",{p:0,item:12},function(data){
						$(".slider-product").append(data.msg);
						$("#_items").text(data.items);
			},"json");
		}
	
	
	}
	return new AjaxConnect();	
});
	function ajaxpost(pv,itemv,queryv){
			$.post("/api/Home/Goods/listing.html",{p:pv,item:itemv,querystr:queryv},function(data){
						$(".slider-product").append(data.msg);
						$("#_items").text(data.items);
			},"json");
	}
	function ajaxpostsort(pv,itemv,queryv,sort){
			$.post("/api/Home/Goods/listing.html",{p:pv,item:itemv,querystr:queryv,sort:sort},function(data){
						$(".slider-product").append(data.msg);
			},"json");
	}
	function ajaxpostsort(pv,itemv,sort){
			$.post("/api/Home/Goods/listing.html",{p:pv,item:itemv,querystr:queryv,sort:sort},function(data){
						$(".slider-product").append(data.msg);
			},"json");
	}
	function GetQueryString(name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  decodeURI(r[2]);
		     return null;
		}
