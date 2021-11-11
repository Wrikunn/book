//打包任务
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
// css任务
gulp.task('css',()=>{
    return gulp.src('./css/**').pipe(autoprefixer({overrideBrowserslist:["last 5 version","iOS > 3","Firefox > 2"]})).pipe(cssmin()).pipe(gulp.dest('./dist/css'))
})
// sass任务
gulp.task('sass',()=>{   //map文件会报错，先删掉
    return gulp.src('./sass/**').pipe(sass()).pipe(autoprefixer({overrideBrowserslist:["last 5 version","iOS > 3","Firefox > 2"]})).pipe(cssmin()).pipe(gulp.dest('./dist/css'))  //先编译成css，再加兼容性前缀
})


//js打包任务
const uglify = require('gulp-uglify')
const babel = require('gulp-babel') //下载三个，引入一个就可以
gulp.task('js',()=>{
    return gulp.src('./js/**').pipe(babel({presets:['es2015']})).pipe(uglify()).pipe(gulp.dest('./dist/js'))
})


//html打包任务
const htmlmin = require('gulp-htmlmin')
gulp.task('html',(fn)=>{
    gulp.src('./index.html').pipe(htmlmin(
        {
            removeEmptyAttributes:true,
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        }
    )).pipe(gulp.dest('./dist'))
    gulp.src('./point1.html').pipe(htmlmin(
        {
            removeEmptyAttributes:true,
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        }
    )).pipe(gulp.dest('./dist'))
    gulp.src('./point2.html').pipe(htmlmin(
        {
            removeEmptyAttributes:true,
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        }
    )).pipe(gulp.dest('./dist'))
    gulp.src('./car.html').pipe(htmlmin(
        {
            removeEmptyAttributes:true,
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        }
    )).pipe(gulp.dest('./dist'))
    gulp.src('./buy.html').pipe(htmlmin(
        {
            removeEmptyAttributes:true,
            collapseWhitespace:true,
            minifyCSS:true,
            minifyJS:true
        }
    )).pipe(gulp.dest('./dist'))
    fn()
})

//img任务
gulp.task('img',()=>{
    return gulp.src('./img/**').pipe(gulp.dest('./dist/img'))
})
//font任务
gulp.task('font',()=>{  //没压缩直接转移
    return gulp.src('./font/**').pipe(gulp.dest('./dist/font'))
})

//clean任务
const clean = require('gulp-clean')
gulp.task('clean',()=>{
    return gulp.src('./dist').pipe(clean())
})


//websever任务
const webserver = require('gulp-webserver')
gulp.task('websever',()=>{
    return gulp.src('./dist').pipe(webserver({
        host:'localhost',
        port:8080,
        livereload:true,
        open:'./index.html'
    }))
})


//watch任务
gulp.task('watch',(fn)=>{
    gulp.watch('./css/**',gulp.series('css'))
    gulp.watch('./sass/**',gulp.series('sass'))
    gulp.watch('./js/**',gulp.series('js'))
    gulp.watch('./index.html',gulp.series('html'))
    gulp.watch('./img/**',gulp.series('img'))
    fn()
})

//default任务
gulp.task('default',gulp.series('css','clean','css','sass','js','html','img','font','watch','websever'))//直接执行lean会因为没有dist文件而报错