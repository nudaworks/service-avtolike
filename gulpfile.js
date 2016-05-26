'use strict';

const gulp = require('gulp');
const styl = require('gulp-stylus');
const concat = require('gulp-concat');
const ftp = require('vinyl-ftp');
const rename = require('gulp-rename');


gulp.task('def', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl'
        ])
        .pipe(concat('default.styl'))
        .pipe(styl())
        .pipe(rename('default.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('xenon', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/xenon/*.styl'
        ])
        .pipe(concat('xenon.styl'))
        .pipe(styl())
        .pipe(rename('xenon.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('chip', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/chip/*.styl'
        ])
        .pipe(concat('chip.styl'))
        .pipe(styl())
        .pipe(rename('chip.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('parking', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/parking/*.styl'
        ])
        .pipe(concat('parking.styl'))
        .pipe(styl())
        .pipe(rename('parking.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('drl', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/drl/*.styl'
        ])
        .pipe(concat('drl.styl'))
        .pipe(styl())
        .pipe(rename('drl.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('projector', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/projector/*.styl'
        ])
        .pipe(concat('projector.styl'))
        .pipe(styl())
        .pipe(rename('projector.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('camera', function(){
    return gulp.src([
            'constr/styl/_presets/*.styl',
            'constr/styl/_minor/*.styl',
            'constr/styl/default/*.styl',
            'constr/styl/camera/*.styl'
        ])
        .pipe(concat('camera.styl'))
        .pipe(styl())
        .pipe(rename('camera.css'))
        .pipe(gulp.dest('./constr/cache'));
});

gulp.task('deploy', function(){
    var connection = ftp.create({
        host: 'xenonlp.tmweb.ru',
        user: 'xenonlp_service',
        password: 'E8Ak9Yzq',
        parallel: 10
    });
    var globs = [
        'constr/**',
        'ctrl/**',
        'proc/**',
        '.htaccess',
        'gulpfile.js',
        'index.php',
        'package.json',
        'robots.txt'
    ];
    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(connection.newer('./services.avtolike.ru/public_html/'))
        .pipe(connection.dest('./services.avtolike.ru/public_html/'));
});


gulp.task('default', function(){
    gulp.watch('constr/**/*.styl', ['camera', 'chip', 'def', 'drl', 'parking', 'projector', 'xenon']);
});


