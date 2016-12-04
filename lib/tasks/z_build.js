function Build(gulp, settings, fileProp) {

    gulp.task('build:prod', gulp.series(
        'clear:tempApp',
        'clear:tempPrj',
        'git:clone',
        'create:xml',
        'git:commit',
        'deploy:prod',
        'deploydata:prod'
        , function (done) {
            done();
        }))

    gulp.task('build:dev', gulp.series(
        'clear:tempApp',
        'clear:tempPrj',
        'git:clone',
        'create:xml',
        'git:commit',
        'git:push',
        'deploy:dev',
        'deploydata:dev'
        , function (done) {
            done();
        }))

    gulp.task('build:test', gulp.series(
        'clear:tempApp',
        'clear:tempPrj',
        'git:clone',
        'create:xml',
        'git:commit',
        'git:push',
        'deploy:test',
        'deploydata:test'
        , function (done) {
            done();
        }))



}

module.exports = Build;