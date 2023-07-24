const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Função para comprimir as imagens
function comprimeImagens() {
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

// Função para comprimir o JS
function comprimeJavaScript() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}


// Função para compilar o SASS (nao precisa de um callback pq tem um return)
function compilaSass() {
  return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
}

/*function funcaoPadrao(callback) {
  setTimeout(function() {
    console.log('Olá, Gulp!')
    callback();
  }, 2000);
}*/ 

/*function dizOi(callback) {
  setTimeout(function() {
    console.log('Oi!')
    dizTchau();
    callback();
  }, 2000);
}*/

/*function dizTchau() {
  console.log('Tchau!')
}*/

//exports.default = funcaoPadrao; // gulp para executar a funcaoPadrao (default) utilizamos o comando 'npm run gulp funcaoPadrao'
//exports.default = gulp.series(funcaoPadrao, dizOi); // gulp com funcoes seriadas para executar utilizamos o comando 'npm run gulp'
//exports.default = gulp.parallel(funcaoPadrao, dizOi); // gulp com funcoes paralelas para executar utilizamos o comando 'npm run gulp'
//exports.oi = dizOi; // gulp oi
//callback sempre é a última função a ser executada e nao pode estar em uma funcao interna (nao exportada)
//exports.sass = compilaSass; // gulp sass

exports.default = function() {
  gulp.watch('./source/styles/*.scss',{ ignoreInitial: false }, gulp.series(compilaSass))
  gulp.watch('./source/scripts/*.js',{ ignoreInitial: false }, gulp.series(comprimeJavaScript))
  gulp.watch('./source/images/*',{ ignoreInitial: false }, gulp.series(comprimeImagens))
}

//exports.javascript = comprimeJavaScript; // gulp javascript
//exports.images = comprimeImagens; // gulp images