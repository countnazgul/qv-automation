function Clear(gulp) {
        gulp.task('clear:tempPrj', gulp.series('prompt', function (done) {
        //console.log(prjFolder)
        return del([prjFolder + '/*', '!' + prjFolder + '.git'], { force: true }, function () {
            msg.Success('Temp folder cleared');
            done();
        });
    }));

    gulp.task('clear:tempAll', function () {
        del([mainTemp + '\\temp\\**\\*'], function () {
            msg.Success('Temp folder cleared');
        });
    });

    gulp.task('clear:tempApp', gulp.series('prompt', function (done) {
        del(mainTemp + '\\' + fileNameBase + '\\', { force: true }, function () {
            msg.Success('Temp folder cleared');
            done();
        });
    }));  
}

module.exports = Clear;