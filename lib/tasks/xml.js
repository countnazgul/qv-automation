function XML(gulp) {

    function runQV(callback) {
        require('child_process').exec("qv.vbs " + '"' + fileNameFull + '" ' + fileNameBase + '" "' + mainTemp + '"', function (err, stdout, stderr) {
            if (err) {
                callback();
            }
            callback();
        });
    }

    gulp.task('create:xml', gulp.series('prompt', 'clear:tempPrj', function (done) {
        mkdirp.sync(prjFolder);
        //del.sync('C:/Users/Home/Documents/GitHub/temp/' + fileNameBase + '/' + fileName);

        runQV(function () {
            msg.Success('XML files were successfuly created');
            done();
        });
    }));
}

module.exports = XML;