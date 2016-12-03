var mod_tab = require('tab');
var progress = require('progress-stream');
var async = require('async');
var mkdirp = require('mkdirp');
var fs = require('fs');
var debug = require('gulp-debug');
var msg = require('gulp-messenger');

function Deploy(gulp, settings, fileProp, argv) {

    function deploy(env) {
        var _target = fileProp.locations[env];

        mkdirp.sync(_target);
        var stat = fs.statSync(fileProp.fileNameFull);
        var str = progress({
            length: stat.size,
            time: 100
        });

        var out = new mod_tab.TableOutputStream({
            'columns': [
                {
                    label: '%',
                    width: 6
                },
                {
                    label: 'eta (s)',
                    width: 10
                },
                {
                    label: 'runtime (s)',
                    width: 12
                },
                {
                    label: 'length (mb)',
                    width: 15
                },
                {
                    label: 'remaining (mb)',
                    width: 15
                },
                {
                    label: 'speed (mb/s)',
                    width: 15
                }
            ],
            'columnSeparator': '|',
            'rowSeparator': '\n'
        });

        str.on('progress', function (progress) {
            out.writeRow({
                '%': Math.round(progress.percentage) + '%',
                'eta (s)': progress.eta,
                'runtime (s)': progress.runtime,
                'length (mb)': (progress.length / 1024 / 1024).toFixed(2),
                'remaining (mb)': (progress.remaining).toFixed(2),
                'speed (mb/s)': (progress.speed / 1024 / 1024).toFixed(2)
            });
        });

        fs.createReadStream(fileProp.fileNameFull)
            .pipe(str)
            .pipe(fs.createWriteStream(_target + '\\' + fileProp.fileName))
    }

    function deployData(env, callback1) {
        if (argv.data) {
            dataLocations = argv.data.split(',');

            return async.eachSeries(dataLocations, function (dataLocation, callback) {
                return async.eachSeries(fileProp.datafiles, function (datafile, callback2) {
                    if (dataLocation == Object.keys(datafile)[0]) {
                        var key = Object.keys(datafile)[0];
                        var _target = datafile[key][env];
                        var _source = datafile[key]['dev'] + '/' + datafile[key]['filter']
                        mkdirp.sync(_target);
                        gulp.src(_source)
                            .pipe(debug({ title: '' }))
                            .pipe(gulp.dest(_target))
                            .on('end', function () { callback2() })
                    } else {
                        callback2();
                    }
                }, function (err) {
                    callback();
                });
            }, function (err) {
                callback1()
            });
        } else {
            msg.Error('Missing data argument. Please run the task with "data" argument. For exmple: qv-automate deploydata:prod --data=qvd,csv,excel')
        }
    }

    gulp.task('deploy:prod', gulp.series('prompt', function (done) {
        deploy('prod');
        done();
    }));

    gulp.task('deploy:dev', gulp.series('prompt', function (done) {
        deploy('dev');
        done();
    }));

    gulp.task('deploy:test', gulp.series('prompt', function (done) {
        deploy('test');
        done();
    }));

    gulp.task('deploydata:prod', gulp.series('prompt', function (done) {
        deployData('deployProd', function () {
            done();
        });
    }));

    gulp.task('deploydata:dev', gulp.series('prompt', function (done) {
        deployData('deployDev', function () {
            done();
        });
    }));

    gulp.task('deploydata:test', gulp.series('prompt', function (done) {
        deployData('deployTest', function () {
            done();
        });
    }));

}

module.exports = Deploy;