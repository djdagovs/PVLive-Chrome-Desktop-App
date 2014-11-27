var gulp        = require('gulp'),
    traceur     = require('gulp-traceur'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    ngInject    = require('gulp-ng-annotate'),
    sass        = require('gulp-sass'),
    del         = require('del');

gulp.task('default', [
    'js',
    'vendor',
    'sass',
    'html',
    'images',
    'fonts',
    'manifest'
]);

gulp.task('clean', function(cb) {
    del(['compiled'], cb);
});

gulp.task('js', function() {
    var files = [
    '!src/scripts/background.js',
    'src/**/*.js'
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(ngInject())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('compiled/scripts'));
});

gulp.task('vendor', function() {
    var files = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js'
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('compiled/scripts'));
});

gulp.task('sass', function() {
    var files = [
        'src/**/*.scss'
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('compiled/styles'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('compiled'));
});

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('compiled/images'));
});

gulp.task('fonts', function() {
    var files = [
        'src/fonts/*',
        'bower_components/font-awesome/fonts/*'
    ];

    return gulp.src(files)
        .pipe(gulp.dest('compiled/fonts'));
});

gulp.task('manifest', function() {
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('compiled'));
});