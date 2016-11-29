function Git(gulp) {

    gulp.task('git:clone', gulp.series('prompt', 'clear:tempApp', function (done) {
        return git.clone('https://github.com/countnazgul/test-prj', { args: prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    }));

    gulp.task('git:add', gulp.series('prompt', function (done) {
        return gulp.src(prjFolder + '/*')
            .pipe(git.add({ args: '', cwd: prjFolder }))
            .pipe(done());            
            
    }));

    gulp.task('git:commit', gulp.series('prompt', function (done) {
        //console.log(prjFolder)
        return gulp.src(prjFolder + '/*')
            .pipe(git.commit('initial commit', { cwd: prjFolder, multiline: true, args: '' }));
    }));

    gulp.task('git:push', function () {
        git.push('origin', 'master', { cwd: prjFolder }, function (err) {
            if (err) throw err;
        });
    });
}

module.exports = Git;