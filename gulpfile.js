const gulp = require('gulp')
const rm = require('gulp-rm') //удалуние
const sass = require('gulp-sass')
const concat = require('gulp-concat') //склейка
const sassGlob = require('gulp-sass-glob') //пути sass
const browserSync = require('browser-sync').create() //лок. сервер
const autoprefixer = require('gulp-autoprefixer') // префиксер
const px2rem = require('gulp-smile-px2rem') //px to rem
const gcmq = require('gulp-group-css-media-queries'); // группировка медиа
const cleanCSS = require('gulp-clean-css') //минификация css
const sourcemaps = require('gulp-sourcemaps') //sourcemaps
const babel = require('gulp-babel')
const uglify = require('gulp-uglify'); // минификация js
const svgSprite = require('gulp-svg-sprite') //склейка свг
const svgo = require('gulp-svgo') // чистка свг
const pug = require('gulp-pug'); //пуг

const reload = browserSync.reload
sass.compiler = require('node-sass')

const style = [
    "node_modules/normalize.css/normalize.css",
    'node_modules/slick-carousel/slick/slick.css',  
    'node_modules/jquery-modal/jquery.modal.min.css',
    "src/scss/main.scss"
];
const lib = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/jquery-modal/jquery.modal.min.js',
    'src/js/**/*.js'
];


gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: true
    });
});

gulp.task("clean", () => {
    return gulp.src('dist/**/*', { read: false })
        .pipe(rm())
});

gulp.task("icons", () => {
    return gulp.src('src/img/icons/*.svg')
        .pipe(svgo({
                plugins: [
                    {
                        removeAttrs: { attrs: '(fill|stroke|style|width|height|data.*)' }
                    }
                ]
            }))
        .pipe(svgSprite({
            mode:{
                symbol:{ sprite: "../sprite.svg" }
            }
        }))
        .pipe(gulp.dest('dist/img/icons'))
});

gulp.task('pug', () => {
    return gulp.src('src/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
});

gulp.task("scripts", () => {
    return gulp.src(lib)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js', { newLine: ";" }))
        //.pipe(babel({
        //    presets: ['@babel/env']
        //}))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({ stream: true }))
});

gulp.task('sass', () => {
    return gulp.src(style)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        /*.pipe(px2rem({
            dpr: 1,             
            rem: 16,            
            one: false          
          }))*/
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({ stream: true }))
});

gulp.task("fonts", () => {
    return gulp.src("src/fonts/**/*.{woff,woff2}")
        .pipe(gulp.dest('dist/fonts'))
        .pipe(reload({ stream: true }))
});

gulp.task("images", () => {
    return gulp.src('src/img/**/*.{png,gif,jpg,svg}')
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({ stream: true }))
});


gulp.watch("./src/scss/**/*.scss", gulp.series("sass"));
gulp.watch("./src/fonts/**/*.{woff,woff2}", gulp.series("fonts"));
gulp.watch("./src/img/**/*.{png,gif,jpg,svg}", gulp.series("images"));
gulp.watch("./src/pages/**/*.pug", gulp.series("pug"));
gulp.watch("./src/js/**/*.js", gulp.series("scripts"));

gulp.task("default", gulp.series("clean", gulp.parallel("fonts","images", "pug", "sass", "scripts"), "server"));