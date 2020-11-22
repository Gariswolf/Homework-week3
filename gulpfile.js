'use strict'

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function compileSass(done) {
  src('./sass/**/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./css'));
  done();
}
function watchSass() {
    watch('./sass/**/*.sass', compileSass);
}

 exports.watchSass = watchSass

 const uglifycss = require('gulp-uglifycss');

 function uglyCSS(done){
    src('./css/**/*.css')
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(dest('./dist/'));
    done();
}

function watchCSS() {
    watch('./css/*.sass', uglyCSS);
}

exports.default = series(series(compileSass, uglyCSS), series(watchSass, watchCSS))
