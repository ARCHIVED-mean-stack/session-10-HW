var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var mongoUri = 'mongodb://localhost/rest-apis'
var db = mongoose.connection;

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync')

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var sassSources = './assets/scss/**/*.scss';
var sassOutput = './assets/css';
var htmlSource = './assets/**/*.html';

gulp.task('sass', function () {
    return gulp.src(sassSources)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(sassOutput))
        .pipe(browserSync.stream())
});

var port = process.env.PORT || 3004;

function listening() {
    browserSync({
        proxy: 'localhost:' + port
        // browser: "google chrome"
    });
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSource).on('change', browserSync.reload);
}



mongoose.connect(mongoUri);

app.use(express.static('assets'))

app.use(bodyParser.json());

db.on('error', function () {
    throw new Error('unable to connect at' + mongoUri);
})

require('./models/pirate');
require('./routes')(app);

// app.listen(3004);
app.listen(port, listening);
console.log('port 3004');
