var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');

// Static Server + watching scss/html files
gulp.task('serve', function() {
  browserSync.init({
    server: "./src"
  });
  gulp.watch("src/*").on('change', browserSync.reload);
});

// Basic copy src -> dist
gulp.task('copy', function() {
  return gulp.src('src/**/*', {dot: true}).pipe(gulp.dest('dist'))
})

// Clean the dist dir
gulp.task('clean:dist', function() {
  return del.sync(['dist/*']);
});

// Build Sequences
// ---------------
gulp.task('default', ['serve']);
gulp.task('build', ['clean:dist', 'copy'])
