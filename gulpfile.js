
var gulp = require("gulp");
//压缩
var uglify = require("gulp-uglify");
//es6
var babel = require("gulp-babel");
//sass
var sass = require("gulp-ruby-sass");
//刷新浏览器
var connect = require("gulp-connect");
var webserver = require("gulp-webserver")

var proxy = require('http-proxy-middleware')

gulp.task("minjs",function(){
	gulp.src("./js/**/*.js").pipe(
		babel({
			presets:["es2015"]
	})).pipe(uglify()).pipe(gulp.dest("./minjs/"));
})

gulp.task("conpilejs",function(){
	sass("./scss/**/*.scss",{
		style:"expanded"
	}).pipe(gulp.dest("./css/"))
})

gulp.task("refreshHtml",function(){
	gulp.src("./html/**/*.html").pipe(connect.reload())
})

gulp.task("listen",function(){
//	connect.server({
//		livereload:true
//	})
	gulp.watch("./scss/**/*.scss",["conpilejs"])
	gulp.watch("./html/**/*.html",["refreshHtml"])
	gulp.watch("./css/**/*.css",["refreshHtml"])
})
gulp.task("webserver", function () {
	gulp.src('./')
		.pipe(
			webserver({
				host: 'localhost',
				port: 8080,
				livereload: true,
				directoryListing: {
					enable: true,
					path: './'
				},

				middleware: [
					proxy('/api',{
						target: 'http://www.kuaizu365.cn/', // target host
        				changeOrigin: true,               // needed for virtual hosted sites
		       			pathRewrite: {
		          		'^/api' : '' // remove base path
		        }
					}),
					proxy('/Public', {
						target: 'http://www.kuaizu365.cn/', // target host
        				changeOrigin: true             // needed for virtual hosted sites
//		       			pathRewrite: {
//		          		'^/api' : '' // remove base path
//		        }
		       	}),
		       		proxy('/Home', {
						target: 'http://www.kuaizu365.cn/', // target host
        				changeOrigin: true             // needed for virtual hosted sites
//		       			pathRewrite: {
//		          		'^/api' : '' // remove base path
//		        }
		       		}),
		       		proxy('/home', {
						target: 'http://www.kuaizu365.cn/', // target host
        				changeOrigin: true             // needed for virtual hosted sites
//		       			pathRewrite: {
//		          		'^/api' : '' // remove base path
//		        }
		       		})
		       	
				]
			})
		)
})
gulp.task('default', ["listen", "webserver"], function () {
	console.log('done.');
})