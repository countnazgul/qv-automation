var prompt = require('gulp-prompt');
var msg = require('gulp-messenger');

function Prompt(gulp, settings, fileProp) {
    gulp.task('prompt', function (done) {

        try {
            if (fileProp.fileValidated == false) {
                return gulp.src('./lib/qv.vbs')
                    .pipe(prompt.prompt({
                        type: 'list',
                        name: 'qvw',
                        message: 'Which qvw?',
                        choices: fileProp.availableApps
                    }, function (res) {
                        if (res.qvw != 'x) Cancel') {
                            var pos = res.qvw.substring(0, res.qvw.indexOf(')'));
                            if (fileProp.fileValidated == false) {
                                fileProp.fileNameFull = fileProp.availableAppsBack[pos - 1];
                                fileProp.fileName = fileProp.fileNameFull.split('\\');
                                fileProp.fileName = fileProp.fileName[fileProp.fileName.length - 1];
                                fileProp.fileNameBase = fileProp.fileName.replace('.qvw', '');
                                fileProp.fileNameTemp = fileProp.mainTemp + '\\' + fileProp.fileNameBase;                                
                                fileProp.prjFolder = fileProp.fileNameTemp + '\\' + fileProp.fileNameBase + '-prj';
                                fileProp.fileValidated = true;
                                fileProp.repo = settings.apps[pos - 1].git;
                                fileProp.locations = settings.apps[pos - 1].locations;
                                fileProp.datafiles = settings.apps[pos - 1].datafiles;
                                done();
                            }
                        } else {
                            msg.Info('Bye')
                            process.exit(1);
                            done()
                        }
                    }))
            }
            else {
                done()
            }
        } catch (ex) {
            msg.error(ex.message)
        }
    });
}

module.exports = Prompt;