﻿define([],function(){
	function tem(){
		this.template = function(id, data) {
			var str = document.getElementById(id).innerHTML;
			str = "log(`"+str+"`)";
			str = str.replace(/<%=(.+)%>/g, "`); log($1); log(`");
			str = str.replace(/<%(.+)%>/g, "`); $1 log(`");
			var funcstr = `
				(function(data){
					var htmlstr = "";
					function log(str) {
						htmlstr += str;
					}
					${str};
					return htmlstr;
				})
			`;
			
			var realfunc = eval(funcstr);
			
			return realfunc(data);
		}
	}
	return new tem();
		
})
