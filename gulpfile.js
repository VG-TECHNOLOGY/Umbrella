var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');

//Styles tasks

gulp.task('styles', function() {
	return sass('src/scss/*.scss')
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('public/css'))
	.pipe(livereload());
});

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});



gulp.task('views', function(){
	return gulp.src('views/*.hbs')
	.pipe(livereload());
});

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('views/*.hbs', ['views']);
});

gulp.task('server',function(){  
    nodemon({
        'script': './bin/www',
        'ext': 'js',
    });
});



gulp.task('serve', ['server','watch']);