var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');


gulp.task('scripts', function() {
    return gulp.src(['scripts/jquery-2.2.1.min.js', 'scripts/bootstrap.min.js', 'scripts/holder.js','scripts/perMove.js'])
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(rename('dist.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('jsie', function() {
    return gulp.src(['js/html5shiv.js','js/respond.min.js'])
        .pipe(concat('IE9.js'))
        .pipe(uglify())
        .pipe(rename('IE9.min.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('server', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});


gulp.task('copy-index', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('css', function() {
    return gulp.src('css/**/*')
        .pipe(concat('perCss.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    return gulp.src(['js/*.js', 'scripts/*.js']).pipe(gulp.dest('dist/scripts'));
});

gulp.task('data', function() {
    return gulp.src(['xml/*.xml', 'json/*.json']).pipe(gulp.dest('dist/data'));
});


gulp.task('build', ['copy-index', 'images', 'data'], function() {
    console.log('yes');
});

gulp.task('watch', function() {
    gulp.watch('index.html', ['copy-index']);
    gulp.watch('images/**/*.{jpg,png,ico}', ['images']);
    gulp.watch('scripts/*.js', ['scripts']);
    gulp.watch('css/**/*', ['css']);
    gulp.watch(['xml/*.xml', 'json/*.json'], ['data']);
});

gulp.task('default', ['server', 'watch']);


  
