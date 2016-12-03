var git = require('gulp-git');
var msg = require('gulp-messenger');
var plumber = require('gulp-plumber');
var async = require('async');
var path = require('path');

function Git(gulp, settings, fileProp, argv) {
    var totalFiles = '';

    gulp.task('git:clone', gulp.series('prompt', 'clear:tempApp', function (done) {
        return git.clone(fileProp.repo, { cwd: fileProp.fileNameTemp }, function (err) {
            if (err) throw err;
            done();
        });
    }));

    gulp.task('git:listFiles', gulp.series('prompt', function (done) {
        var folder = fileProp.prjFolder;//.replace(/\\/, "\\\\");
        return git.exec({ args: 'ls-files --deleted --other', cwd: folder, quiet: true }, function (err, stdout) {
            if (err) throw err;
            stdout = stdout.split('\n')
            totalFiles = stdout;

            async.eachSeries(stdout, function (file, callback) {
                if (file.length > 0) {
                    msg.Info(file);
                }
                callback();
            }, function (err) {
                done();
            });
        });
    }));

    gulp.task('git:add', gulp.series('git:listFiles', function (done) {
        var folder = fileProp.prjFolder.replace(/\\/, "\\\\");
        return gulp.src(folder)
            .pipe(plumber())
            .pipe(git.add({ cwd: folder }))
    }));

    gulp.task('git:commit', gulp.series('git:add', function (done) {
        var folder = fileProp.prjFolder.replace(/\\/, "\\\\");

        if (totalFiles[0] != '') {
            gulp.src(fileProp.prjFolder)
                .pipe(plumber())
                .pipe(git.commit('commit message', { cwd: folder }));
        } else {
            msg.Info('Nothing to commit');
            done();
        }
    }));

    gulp.task('git:push', function (done) {
        return git.push('origin', 'master', { cwd: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    });
}

module.exports = Git;