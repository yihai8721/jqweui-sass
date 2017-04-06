var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var notify = require("gulp-notify");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var pkg = require("./package.json");
//运行错误后自动中断执行
var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
    this.emit('end');
};
var scripts = [
    './src/lib/jquery-weui.js',
    './src/lib/swiper.js',
    './src/lib/star-rating.js'
];
//合并js插件
gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//编译sass文件
gulp.task('sass', function () {
    return gulp.src(['./src/style/style.scss'])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('weui.css'))
        .pipe(gulp.dest('./dist/css/'));
});

// 合并js
gulp.task('customJs', function () {
    return gulp.src( './src/js/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        // .pipe(uglify()) //压缩文件，部署时启用
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('./dist/js'));
});

var replace  = require('gulp-replace');
var fs = require("fs");
//公共html部分
gulp.task('include', function() {
    var htmlDir = './dist/demos/';
    fs.readdir(htmlDir, function(err, files) {
        if (err) {
            console.log(err);
        } else {
            files.forEach(function(f) {
                if (f !== '_header.html' && f !== '_footer.html') {
                    gulp.src(htmlDir + f)
                        .pipe(replace(/<!--header-->[\s\S]*<!--headerend-->/, '<!--header-->\n' + fs.readFileSync(htmlDir + '_header.html', 'utf-8') + '\n<!--headerend-->'))
                        .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(htmlDir + '_footer.html', 'utf-8') + '\n<!--footerend-->'))
                        .pipe(gulp.dest(htmlDir))
                }
            });
        }
    });
});


//搭建本地服务器
gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(webserver({
            port: 8888,
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['customJs']);
    gulp.watch('src/style/**/*.scss', ['sass']);
});

gulp.task("default", ['webserver', 'sass', 'scripts' ,'customJs','include']);

//监听项目 即时刷新
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/js/*.js', ['customJs']);
    gulp.watch('./src/lib/*.js', ['scripts']);
    gulp.watch('./src/scss/*/*.scss', ['sass']);
    gulp.watch(['./dist/demos/_header.html','./dist/demos/_footer.html'], ['include']);
});
