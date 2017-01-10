var gulp = require('gulp'), webpack = require('webpack'), wpConfig = require('./webpack.config.js')

gulp.task('watch',function(){
	gulp.watch(['./components/*.vue'],function(e){
		console.log('1.detecting file changed.')
		webpack(wpConfig,function(err,status){
			if(!err){
				console.info('2.webpack done')
			}
			else {
				console.info('2.webpack got error')
				console.error(err)
			}
		})
	})
})
