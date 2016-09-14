var gulp = require('gulp'),
    gutil = require('gulp-util'),
    htmlMin = require('gulp-htmlmin'),
    imageMin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename');


gulp.task('minifyHTML', function() {

    gulp.src('nonminhtml/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));

});

gulp.task('minImages', ['resizeImage'], function() {

    gulp.src('old_images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist'));

});

gulp.task('resizeImage', function() {

    gulp.src('old_images/pizzeria.jpg')
        .pipe(imageResize({
            width: 115,
            height: 87,
            imageMagick: true
        }))
        .pipe(rename({
            suffix: '_small'
        }))
        .pipe(gulp.dest('old_images'));

});