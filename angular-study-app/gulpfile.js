var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyhtml = require('gulp-minify-html'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    $ = require('gulp-load-plugins')(),
    templateCache = require('gulp-angular-templatecache'),
    gulpsync = $.sync(gulp);

var src = 'src';
var dist = 'dist';

var isProduction = false;

var paths = {
    js: src + '/app/**/*.js',
    less: src + '/less/**/*.less',
    html: src + '/**/*.html'
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false // no change on @keyframes names
};

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

// VENDOR CONFIG
var vendor = {
    // 앱 시작시에 필요한 library
    base: {
        source: require('./vendor.base.json'),
        js: 'base.js',
        css: 'base.css'
    },
    // angular lazy loading 에 사용하기위한 library
    app: {
        source: require('./vendor.json'),
        dest: dist + '/vendor'
    }
};


// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
    return gulp.src(dist + '/')
        .pipe(webserver({
            port: 3000,
            open: true,
            livereload: true
        }));
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// less 파일을 css 로 컴파일한다.
gulp.task('compile-less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/'));
});

gulp.task('template-cache', function () {
    return gulp.src(paths.html)
        .pipe(templateCache('templates.js', {
            module: 'study.templates',
            standalone:true
        }))
        .pipe(gulp.dest(dist + '/js'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
    // livereload.listen();
    gulp.watch(paths.js, ['combine-js']);
    gulp.watch(paths.less, ['compile-less']);
    gulp.watch(paths.html, ['compress-html', 'template-cache']);
    gulp.watch(dist + '/**').on('change', livereload.changed);
});


// VENDOR BUILD
gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']));


gulp.task('vendor:base', function () {
    log('Copying base vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.base.source)
        .pipe($.expectFile(vendor.base.source))
        .pipe(jsFilter)
        .pipe($.concat(vendor.base.js))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest(dist + '/js'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.concat(vendor.base.css))
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(gulp.dest(dist + '/css'))
        .pipe(cssFilter.restore)
        ;
});

// copy file from bower folder into the app vendor folder
gulp.task('vendor:app', function () {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.app.source)
        .pipe($.expectFile(vendor.app.source))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(vendor.app.dest));

});


//기본 task 설정
gulp.task('default', [
    'server', 'vendor', 'combine-js',
    'compile-less', 'compress-html', 'template-cache',
    'watch']);


// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}
