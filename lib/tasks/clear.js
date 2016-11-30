var del = require('del');
var msg = require('gulp-messenger');

function Clear(gulp, settings, fileProp) {

    gulp.task('clear:tempPrj', gulp.series('prompt', function (done) {
        try {
            del.sync([fileProp.prjFolder + '/*', '!' + fileProp.prjFolder + '.git'], { force: true })
            msg.Success('Temp folder cleared');
            done();
        } catch (ex) {
            msg.Error(ex.message);
            done();
        }

    }));

    gulp.task('clear:tempAll', function () {
        try {
            del.sync(fileProp.mainTemp + '\\temp\\**\\*', { force: true });
            msg.Success('Temp folder cleared');
        } catch (ex) {
            msg.Error(ex.message);
        }
    });

    gulp.task('clear:tempApp', gulp.series('prompt', function (done) {
        try {
            del.sync(fileProp.mainTemp + '\\' + fileProp.fileNameBase + '\\', { force: true });
            msg.Success('Temp folder cleared');
            done();
        } catch (ex) {
            msg.Error(ex.message);
            done();
        }

    }));

}

module.exports = Clear;