function Prompt(gulp) {
    gulp.task('prompt', function () {
        if (fileValidated == false) {
            return gulp.src('')
                .pipe(prompt.prompt({
                    type: 'list',
                    name: 'qvw',
                    message: 'Which qvw?',
                    choices: availableApps
                }, function (res) {
                    if (res.qvw != 'x) Cancel') {
                        var pos = res.qvw.substring(0, res.qvw.indexOf(')'));
                        if (fileValidated == false) {
                            fileNameFull = availableAppsBack[pos - 1];
                            fileName = fileNameFull.split('\\');
                            fileName = fileName[fileName.length - 1];
                            fileNameBase = fileName.replace('.qvw', '');
                            fileNameTemp = mainTemp + '\\' + fileNameBase;
                            prjFolder = fileNameTemp + '\\' + fileNameBase + '-prj';
                            fileValidated = true;
                            repo = settings.apps[pos - 1].git;
                            locations = settings.apps[pos - 1].locations;
                            datafiles = settings.apps[pos - 1].datafiles;
                        }
                    } else {
                        msg.Info('Bye')
                        process.exit(1);
                    }
                }))
        } else {
            return true
        }
    });
}

module.exports = Prompt;