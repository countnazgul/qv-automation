var mkdirp = require('mkdirp');
var msg = require('gulp-messenger');
var spawn = require('child_process').exec;
var del = require('del');

function XML(gulp, settings, fileProp) {

    function runQV(callback) {

        require('child_process').exec("./lib/qv.vbs " + '"' + fileProp.fileNameFull + '" ' + fileProp.fileNameBase + '" "' + fileProp.mainTemp + '"', function (err, stdout, stderr) {
            if (err) {
                callback();
            }
            callback();
        });
    }

    gulp.task('create:xml', gulp.series('clear:tempPrj', function (done) {

        try {
            mkdirp.sync(fileProp.prjFolder);

            return spawn(__dirname + "\\..\\qv.vbs " + '"' + fileProp.fileNameFull + '" "' + fileProp.fileNameBase + '" "' + fileProp.mainTemp + '"', function (err, stdout, stderr) {
                if (err) {
                    msg.Error(err);
                    done();
                } else {
                    msg.Success('xml files are created. ' + fileProp.prjFolder)
                    done();
                }
            });

        } catch (ex) {
            msg.error(ex.message);
            done();
        }
    }));
}

module.exports = XML;