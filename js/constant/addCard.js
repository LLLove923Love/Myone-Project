define(["jquery"],function($){
	function add(){
		this.loginin = function(){
			$(".cart-add").mousedown(function() {
				$.post("/api/home/cart/getdata.html", function(data) {
					console.log(data);
					$("body").append(data.data);
				},"json");
//			if(!fals){
//					$.post("/api/home/user/loginverify.html", function(data) {
//						console.log(data.status);
//						$("body").append(data.content);
//				},"json");
//			}else{
//				
//			}
//			$.post("/api/home/user/loginverify.html", function(data) {
//				if(!data.status) {
//					$("body").append(data.content);
//				}else{
//					$.post("/api/home/cart/getdata.html", function(data) {
//						$("body").append(data.content);
//					});
//				}
//			}, "json");
});
	}
	}
	return new add();
	
});