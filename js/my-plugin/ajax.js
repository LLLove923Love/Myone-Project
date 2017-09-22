
/*ajax({
	type : "jsonp",
	url : "http://xxxxx.com",
	jsonpcallback : "cb",
	success : function(){
		
	}
})*/

function ajax({type="get", params, jsonpcallback="callback",url, async=true, success=function(){}}) {
	if(!/^https?:\/\/.+(\?.+=.+)?$/.test(url)){
		console.error("url格式不正确");
		return;
	}
	
	switch(type) {
		case "get" : ajaxGet(url, async, success); break;
		case "post" : ajaxPost(url, params, async, success); break;
		case "jsonp" : Jsonp(url, jsonpcallback,success); break;
	}
	
	function ajaxGet(url, async, success){
		var req = getXHR();
		req.open("get", url, async);
		
		if(!!req.onload){
			req.onload = function(){
				success(req.response);
			}
		} else {
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200) {
					success(req.responseText);
				}
			}
		}
		req.send();
	}
	
	function ajaxPost(url, params, async, success) {
		var req = getXHR();
		req.open("post", url, async);
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		if(!!req.onload){
			req.onload = function(){
				success(req.response);
			}
		} else {
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200) {
					success(req.responseText);
				}
			}
		}
		req.send(params);
	}
	
	function Jsonp(url,jsonpcallback,success){
		var _script = document.createElement("script");
		var cbkfunname = "_ajax_jsonp_callback"+new Date().getTime();
		
		if(/\?([^\?=]+=[^\?=]+)+$/.test(url)) {
			_script.src = url+"&"+jsonpcallback+"="+cbkfunname;
		} else {
			_script.src = url+"?"+jsonpcallback+"="+cbkfunname;
		}
		
		window[cbkfunname] = function(data) {
			success(data);
			delete window[cbkfunname];
			_script.remove();
		}
		document.body.appendChild(_script);
	}
	
	function getXHR(){
		if(window.VBArray) {
			return new ActiveXObject("Msxml2.XMLHTTP")
		} else {
			return new XMLHttpRequest();
		}
	}
}
