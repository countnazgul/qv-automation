var msg = require('gulp-messenger');
var fs = require('fs');
var scan = require('gulp-scan');
var plumber = require('gulp-plumber');
var through2 = require('through2');
var intermediate = require('gulp-intermediate');
var xml2json = require('gulp-xml2json');
var del = require('del');
var async = require('async');


function Checks(gulp, settings, fileProp) {

    gulp.task('check:localPath', gulp.series('prompt', function (done) {
        var paths = [];
        return gulp.src(fileProp.prjFolder + '\\LoadScript.txt')
            .pipe(plumber())
            .pipe(scan({
                term: /([A-Z]:\\[^/:\*;\/\:\?<>\|]+)|(\\{2}[^/:\*;\/\:\?<>\|]+)/gm, fn: function (match) {
                    match = match.replace('\n', '').trim();
                    if (paths.indexOf(match) == -1) {
                        paths.push(match);
                        msg.Warning('Network path: ' + match)
                    }
                }
            }))
            .pipe(scan({
                term: /([a-zA-Z]\:|\\\\[^\/\\:*?"<>|]+\\[^\/\\:*?"<>|]+)(\\[^\/\\:*?"<>|]+)+(\.[^\/\\:*?"<>|]+)$/gm, fn: function (match) {
                    match = match.replace('\n', '').replace(';', '').trim();
                    if (paths.indexOf(match) == -1) {
                        msg.Warning('Local path: ' + match)
                        paths.push(match)
                    }
                }
            }))
    }));

    gulp.task('check:synthKeys', gulp.series('prompt', function (done) {

        gulp.src(fileProp.prjFolder + '/AllProperties.xml')
            .pipe(xml2json())
            .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
                var json = JSON.parse(fs.readFileSync(tempDir + '\\' + 'AllProperties.json'));
                var synKeys = 0;

                async.eachSeries(json.AllProperties.FieldProperties[0].FieldProperties, function (FieldProperties, callback) {
                    if (FieldProperties.Name[0].indexOf('$Syn ') > -1) {
                        synKeys++
                    }

                    callback();
                }, function (err) {
                    if (synKeys == 0) {
                        msg.Success('0 Synthetic Keys found');
                    } else {
                        msg.Warning(synKeys + ' Synthetic Key(s) found');
                    }
                })

                del.sync(tempDir, { force: true });
                done();

            }));
    }));

    gulp.task('check:logFile', gulp.series('prompt', function (done) {
        gulp.src(fileProp.prjFolder + '/DocProperties.xml')
            .pipe(xml2json())
            .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
                var json = JSON.parse(fs.readFileSync(tempDir + '\\' + 'DocProperties.json'));

                generateLogFile = json.DocProperties.GenerateLogfile;

                if (generateLogFile == "false") {
                    msg.Warning('Log file is NOT going to be generated after reload!');
                    del.sync(tempDir, { force: true });
                    done();
                }
                else {
                    msg.Success('Log file will be generated upon reload');
                    del.sync(tempDir, { force: true });
                    done();
                }
            }));
    }));

    gulp.task('check:macroOnOpen', gulp.series('prompt', function (done) {
        gulp.src(fileProp.prjFolder + '/DocProperties.xml')
            .pipe(xml2json())
            .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
                var json = JSON.parse(fs.readFileSync(tempDir + '\\' + 'DocProperties.json'));

                onOpenActions = json.DocProperties.OnOpenActionItems.ActionItemDef;
                onOpenMacro = 0;

                async.eachSeries(json.DocProperties.OnOpenActionItems.ActionItemDef, function (ActionItemDef, callback) {
                    if (ActionItemDef.Type == 'TYPE_MACRO') {
                        opOpenMacro++
                    }

                    callback();
                }, function (err) {
                    if (onOpenMacro == 0) {
                        msg.Success('0 OnOpen Macros');
                    } else {
                        msg.Warning(onOpenMacro + ' OnOpen macro(s) found');
                    }
                })

                del.sync(tempDir, { force: true });
                done();
            }));
    }));

    gulp.task('check:macroOnPost', gulp.series('prompt', function (done) {
        gulp.src(fileProp.prjFolder + '/DocProperties.xml')
            .pipe(xml2json({}))
            .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
                var json = JSON.parse(fs.readFileSync(tempDir + '\\' + 'DocProperties.json'));

                onOpenActions = json.DocProperties.OnPostReloadActionItems.ActionItemDef;
                onPost = 0;

                async.eachSeries(json.DocProperties.OnPostReloadActionItems.ActionItemDef, function (ActionItemDef, callback) {
                    if (ActionItemDef.Type == 'TYPE_MACRO') {
                        onPost++
                    }

                    callback();
                }, function (err) {
                    if (onPost == 0) {
                        msg.Success('0 OnOpen Macros');
                    } else {
                        msg.Warning(onPost + ' OnOpen macro(s) found');
                    }
                })

                del.sync(tempDir, { force: true });
                done();
            }));
    }));


    gulp.task('check:macro', gulp.series('prompt', function (done) {
        var macro = fs.readFileSync(fileProp.prjFolder + '/Module.txt');
        macro = macro.toString().trim();

        if (macro.length > 0) {
            msg.Warning('Macro module is not empty');
            done();
        } else {
            msg.Success('Macro module is empty');
            done();
        }
    }));

}

module.exports = Checks;