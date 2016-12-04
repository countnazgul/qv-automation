var del = require('del');
var msg = require('gulp-messenger');
var mkdirp = require('mkdirp');

var cleared = {
    tempPrj: false,
    tempAll: false,
    tempApp: false
};

function Clear(gulp, settings, fileProp) {

    gulp.task('clear:tempPrj', gulp.series('prompt', function (done) {
        if (cleared.tempPrj == false) {
            try {
                del.sync(fileProp.prjFolder + '\\**\\*', { force: true })
                mkdirp.sync(fileProp.prjFolder);
                msg.Success('Temp prj folder cleared');
                cleared.tempPrj = true;
                done();
            } catch (ex) {
                msg.Error(ex.message);
                done();
            }
        } else {
            done();
        }
    }));

    gulp.task('clear:tempAll', function (done) {
        if (cleared.tempAll == false) {
            try {
                del.sync(fileProp.mainTemp + '\\temp\\**\\*', { force: true });
                mkdirp.sync(fileProp.mainTemp + '\\temp');
                msg.Success('Temp all folder cleared');
                cleared.tempAll = true;
                done();
            } catch (ex) {
                msg.Error(ex.message);
                done();
            }
        } else {
            done();
        }
    });

    gulp.task('clear:tempApp', gulp.series('prompt', function (done) {
        if (cleared.tempApp == false) {
            try {
                del.sync(fileProp.mainTemp + '\\' + fileProp.fileNameBase + '\\**\\*', { force: true });
                mkdirp.sync(fileProp.mainTemp + '\\' + fileProp.fileNameBase);
                msg.Success('Temp app folder cleared');
                cleared.tempApp = true;
                done();
            } catch (ex) {
                msg.Error(ex.message);
                done();
            }
        } else {
            done();
        }

    }));

}

module.exports = Clear;