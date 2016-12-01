var git = require('gulp-git');
var msg = require('gulp-messenger');

function Git(gulp, settings, fileProp, argv) {
    
    gulp.task('git:clone', gulp.series('prompt', 'clear:tempApp', function (done) {
        return git.clone('https://github.com/countnazgul/test-prj', { args: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    }));

    gulp.task('git:add', gulp.series('prompt', function (done) {
        return git.exec({ args: 'add .', log: false, cwd: fileProp.prjFolder }, function ( /* err, stdout */) {
            done();
        })
    }));

    gulp.task('git:commit', gulp.series('git:add', function (done) {
        return gulp.src('./')
            .pipe(git.commit(argv.message))
            // .on('end', function () {
            //     console.log('asd')
            // });
    }));

    gulp.task('git:push', function (done) {
        return git.push('origin', 'master', { cwd: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    });
}

module.exports = Git;