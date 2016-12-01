var git = require('gulp-git');
var msg = require('gulp-messenger');
var plumber = require('gulp-plumber')
var path = require('path');

function Git(gulp, settings, fileProp, argv) {


    gulp.task('git:clone', gulp.series('prompt', 'clear:tempApp', function (done) {
        return git.clone('https://github.com/countnazgul/test-prj', { args: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    }));

    gulp.task('git:add', gulp.series('prompt', function (done) {
        var folder = fileProp.prjFolder.replace(/\\/, "\\\\");
        return gulp.src(folder)
            .pipe(plumber())
            .pipe(git.add({ cwd: folder }))
    }));

    gulp.task('git:commit', gulp.series('git:add', function () {
        var folder = fileProp.prjFolder.replace(/\\/, "\\\\");
        return gulp.src(fileProp.prjFolder)
            .pipe(plumber())
            .pipe(git.commit('commit message', { cwd: folder }));


    }));

    gulp.task('git:push', function (done) {
        return git.push('origin', 'master', { cwd: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    });
}

module.exports = Git;