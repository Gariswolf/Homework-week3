// 'use strict' indicate that the code should be executed in "strict mode",
// which means that you can't use undeclared variables.
'use strict';

const { src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');

// Compile Sass to css
sass.compiler = require('node-sass');
function compileSass(){
    return src('./sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

// Uglify CSS
function uglyCSS(){
    return src('./css/**/*.css')
        .pipe(uglifycss({"uglyComments": true}))
        .pipe(dest('./dist'));
}

// Detect and modify changed file
function watchFile(){
    watch('./sass/**/*.sass', compileSass);
    watch('./css/**/*.css', uglyCSS);
}

// Using command "gulp" to start it 
exports.default = watchFile
