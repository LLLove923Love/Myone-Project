//
require(["http://localhost:8080/js/requireJs/config.js"], function() {
	//写出页面需要的所有模块，不用考虑顺序问题
	require(["jquery","common","Ajax","cookie"], function($,con,ax,cok) {
		//添加尾部
		ax.resetfunc();
		$("div#comment").load("common/top.html",function(){
				con.start();
				con.nev();
				var str = window.location.href;
				ax.textInput();
				ax.hrefInput();
				//购物车数量
				var onj = JSON.parse(cok.getCookie("goods"));
				$("#cartNums").text(onj.count);
			});
		$("#footer").load("common/footer.html",function(){
			con.footer();
		});
		$(".green").mousedown(function(){
			$(".hasSelected>strong").text("当前筛选 >");
			$(".slider-product").empty();
			$("#_items").text(0);
			ax.resetfunc();
			$(".slider-product>h5").show();
		});
});
});