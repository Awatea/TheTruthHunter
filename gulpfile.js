const gulp = require('gulp');

// html, css, js, img
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

// server
const connect = require('gulp-connect');

// errors and building
const runSequence = require('run-sequence');
const del = require('del');
const plumber = require('gulp-plumber');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');

// tests
const mocha = require('gulp-mocha');

// paths
const pathsFrom = {
	'js': './js/*.js',
	'scss': './sass/style.scss',
	'img': './img/*',
	'html': '*.html'
};

const pathsTo = {
	'js': './build/js',
	'css': './build/css',
	'img': './build/img',
	'html': './build'
};

// tasks
gulp.task('test', function() {
	return gulp
		.src(['js/**/*.test.js'], {
			read: false
		})
		.pipe(mocha({
			compilers: ['js:babel-register'], // add "import/export" support in Mocha tests
			reporter: 'nyan'
		}));
});

// server and livereload
gulp.task('connect', function() {
	connect.server({
		root: 'build',
		livereload: true
	});
});

gulp.task('html', ['copyHtml'], function() {
	return gulp.src('*.html')
		.pipe(connect.reload());
});

gulp.task('sass-reload', ['sass'], function() {
	return gulp.src(pathsTo.css + '/style.css')
		.pipe(connect.reload());
});

// copy and concat html, css and js files:
gulp.task('copyHtml', function() {
	return gulp.src(pathsFrom.html)
		.pipe(gulp.dest(pathsTo.html));
});

gulp.task('sass', function() {
	return gulp.src(pathsFrom.scss)
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(pathsTo.css));
});

gulp.task('scripts', function() {
	return gulp.src(pathsFrom.js)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(rollup({}, 'iife'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(pathsTo.js))
		.pipe(connect.reload());
});

// images
gulp.task('imagemin', ['copyImages'], function() {
	return gulp.src('build/img/**/*.{jpg,png,gif}')
		.pipe(imagemin([
			imagemin.optipng({
				optimizationLevel: 3
			}),
			imagemin.jpegtran({
				progressive: true
			})
		]))
		.pipe(gulp.dest('build/img'));
});

gulp.task('favicon', function() {
	return gulp.src('favicon.ico')
	.pipe(gulp.dest('build'));
});

gulp.task('copyImages', function() {
	return gulp.src([
			'img/**/*'
		], {
			base: '.'
		})
		.pipe(gulp.dest('build'));
});

// clean
gulp.task('clean', function() {
	return del('build');
});

// watch
gulp.task('watch', function() {
	gulp.watch('./sass/*.scss', ['sass-reload']);
	gulp.watch(pathsFrom.js, ['scripts']);
	gulp.watch(pathsFrom.html, ['html']);
	gulp.watch(pathsFrom.img, ['copy']);
});

// basic tasks
gulp.task('copy', ['imagemin', 'copyHtml', 'favicon', 'scripts', 'sass']);

gulp.task('build', function(callback) {
	runSequence('clean', 'copy', callback);
});

gulp.task('server', ['connect', 'watch']);

gulp.task('default', function(callback) {
	runSequence('build', 'server', callback);
});
