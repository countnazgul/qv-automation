//var gulp = require('gulp');
const del = require('del');
var progress = require('progress-stream');
var fs = require('fs');
var path = require('path');
var msg = require('gulp-messenger');
var prompt = require('gulp-prompt');
var mkdirp = require('mkdirp');
var newer = require('gulp-newer');
//var through = require('through2');
var git = require('gulp-git');
var mod_tab = require('tab');
var argv = require('yargs').argv;
var debug = require('gulp-debug');
var async = require('async');

function Tasks(gulp) {

    var tempFolder = '';

    var user = process.env['USERPROFILE'].split(path.sep)[2];
    var settings = JSON.parse(fs.readFileSync('c:\\users\\' + user + '\\\Documents\\qv-automation\\settings.json'));
    var mainTemp = 'c:\\users\\' + user + '\\\Documents\\qv-automation\\temp';
    //var fileNameFull = 'c:\\Users\\Home\\Documents\\SO_40672979.qvw';
    var fileNameFull, fileName, fileNameBase, fileNameTemp, prjFolder, repo, locations, datafiles;
    var fileValidated = false;
    var availableApps = [];
    var availableAppsBack = [];

    // gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
    // gulp.Gulp.prototype._runTask = function (task) {
    //     this.currentTask = task;
    //     this.__runTask(task);
    // }

    msg.init({
        logToFile: false,
        logTimestampFormat: 'YYYY-MM-DD HH:mm:ss Z',
        logToConsole: true,
        timestamp: true,
        rotateLog: false,
        boldVariables: true,
        useDumpForObjects: false
    });

    for (var i = 0; i < settings.apps.length; i++) {
        availableApps.push((i + 1) + ') ' + settings.apps[i].qvw);
        availableAppsBack.push(settings.apps[i].qvw);
    }

    availableApps.push('x) Cancel')

    var normalizedPath = path.join(__dirname, "tasks");

    fs.readdirSync(normalizedPath).forEach(function (file) {
        require("./tasks/" + file)(gulp);
    });













    // gulp.task('default',
    //     gulp.series(
    //         'clear:temp',
    //         'create:temp',
    //         'creteXml',
    //         'copy:toProdSourceDocs',
    //         'clear:temp',
    //         function (done) {

    //             done();
    //         })
    // );


}

module.exports = Tasks;