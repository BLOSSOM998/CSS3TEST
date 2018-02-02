/**
 * Created by yiche on 2017/12/20.
 */
const gulp = require('gulp');
const del = require('del');
const path = require('path');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 4 versions']});
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-clean-css');
const gulpSequence = require('gulp-sequence')
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const getFileList = require('./htmlIndex');
const imagemin = require('gulp-imagemin');


gulp.task('default', function () {
    //将你的默认的任务代码放在这
});

//压缩图片
gulp.task('minifyImg', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dev/img'))
);

//编译js
gulp.task('compileJsDev', function () {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dev/js'))
});

gulp.task('compileHTMLDevBefore', function () {
    gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dev/html'));
});


//编译开发环境HTML
gulp.task('compileHTMLDev', gulpSequence('compileHTMLDevBefore','makeIndex'));

//编译开发环境LESS
gulp.task('compileLessDev', function () {
    return gulp.src('src/css/less/main.less')
        .pipe(plumber())  //错误提示
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix],
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin({
            format: 'keep-breaks',//['beautify','keep-breaks']
            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./dev/css'));
});

//编译开发环境JS
gulp.task('compileJsDest', function () {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dest/js'))
});

gulp.task('compilefontDev', function () {
    gulp.src('src/font/*')
        .pipe(gulp.dest('dev/font'))
});

//删除开发目录
gulp.task('cleanDev', function () {
    del([
        'dev'
    ]);
});

//删除打包目录
gulp.task('cleanDist', function () {
    del([
        'dist'
    ]);
});

//删除所有编译文件
gulp.task('cleanAll', function () {
    del([
        'dist', 'dev'
    ]);
});

//编译所有文件
gulp.task('compileAlldev', gulpSequence(['compileHTMLDevBefore', 'compileJsDev', 'compileLessDev','minifyImg'],'makeIndex'));

//监听JS
gulp.task('watchJs', function () {
    var watcher = gulp.watch(['src/js/*.js'], ['compileJsDev']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

//监听LESS
gulp.task('watchLess', function () {
    var watcher = gulp.watch(['src/css/**/*.less'], ['compileLessDev']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

//监听HTML
gulp.task('watchHTML', function () {
    var watcher = gulp.watch(['src/html/**/*.html'], ['compileHTMLDevBefore']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

//监听HTML
gulp.task('watchImg', function () {
    var watcher = gulp.watch(['src/img/**/*'], ['minifyImg']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

//开启全部监听
gulp.task('watchAll', ['watchJs', 'watchLess', 'watchHTML','watchImg']);

//启动bs监听开发目录
gulp.task('browser-sync', function () {
    browserSync.watch(["**/*.css", "**/*.html"], function (event, file) {
        if (event === "change") {
            browserSync.reload();
        }
    });
    browserSync.init({
        server: {
            baseDir: "./dev"    //项目开发路径根目录
        }
    });
});

//制作目录
gulp.task('makeIndex', function () {
    "use strict";
    var test = new getFileList();
    test.renderPug();
});


