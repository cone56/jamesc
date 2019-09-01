const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');

const {src, dest, watch, series} = gulp;

// Static Server + watching src files
const serve = () => {
  browserSync.init({server: './src'});
  watch('src/*').on('change', browserSync.reload);
};

// Basic copy src -> dist
const copy = () => src('src/**/*', {dot: true}).pipe(dest('dist'))

// Clean the dist dir
const clean = () => del(['dist/*']);

exports.default = serve;
exports.serve = serve;
exports.build = series(clean, copy)
