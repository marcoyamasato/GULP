const gulp = require('gulp');
const uglify = require('gulp-uglify')

const obfuscate = require('gulp-obfuscate')

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify()) /*comprimindo JS*/
        .pipe(obfuscate()) 
        .pipe(gulp.dest('./build/scripts'))
}


//Sass - Compile e Compressão
// const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps') /* npm install gulp-sourcemaps */

function compileSass(){
    return gulp.src('./source/styles/main.scss') /*Se quiser tudo que for .scss, basta colocar o "*" ao invés do "main"*/ 
        .pipe(sourcemaps.init()) 
        .pipe(sass({
            outputStyle: 'compressed' /*Essa opção "compresse" reduz o tamanho do main.css. Se reparar, vai ver que os códigos ficam em uma linha*/
        }))
        .pipe(sourcemaps.write('./maps')) /* Estamos criando uma pasta .maps (reconhece automatico onde estão os arquivos css) */
        .pipe(gulp.dest('./build/styles'))
}


//Funções aprendizado
function funcaoPadrao(callback){
    setTimeout(function(){        
        console.log('Primeira função feita via GULP');
        callback();
    }, 2000)
}

function dizOi(callback){
    setTimeout(function() {
        console.log('Oi, tudo bem?')
        dizTchau();
        callback();
    }, 1000);
}

function dizTchau(callback){ /*Essa é uma função privada. Não tem return do callback nem export*/ 
    console.log('Tchau')
}


/*Execuções de forma paralela e em série*/ 
// const gulp = require('gulp');
// exports.default = gulp.series(funcaoPadrao, dizOi)
// exports.default = gulp.parallel(funcaoPadrao, dizOi)


exports.javascript = comprimeJavaScript;


exports.sass = compileSass;
exports.dizOi = dizOi;



//Comprimindo imagens
const imagemin = require('gulp-imagemin')

function comprimeImagem(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

exports.images = comprimeImagem;


//Criando um watch -- Ele é utilizado para atualizar em tempo real
// Nesse caso, estamos acompanhando mudanças em todos os arquivos que são .scss e executando a função "comp"

/*

exports.watch = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compileSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagem));
}
*/



exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compileSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagem));
}




