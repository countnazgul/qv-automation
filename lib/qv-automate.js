var del = require('del');
var fs = require('fs');
var path = require('path');
var msg = require('gulp-messenger');
var mkdirp = require('mkdirp');
var debug = require('gulp-debug');
var async = require('async');


function Tasks(gulp, argv) {

    var tempFolder = '';

    var user = process.env['USERPROFILE'].split(path.sep)[2];
    var settings = JSON.parse(fs.readFileSync('c:\\users\\' + user + '\\\Documents\\qv-automation\\settings.json'));

    var mainTemp = 'c:\\users\\' + user + '\\\Documents\\qv-automation\\temp';

    var fileProp = {
        fileNameFull: '',
        fileName: '',
        fileNameBase: '',
        fileNameTemp: '',
        prjFolder: '',
        repo: '',
        locations: '',
        datafiles: '',
        mainTemp: 'c:\\users\\' + user + '\\\Documents\\qv-automation\\temp',
        fileValidated: false,
        availableApps: [],
        availableAppsBack: []
    }
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

    async.eachSeries(settings.apps, function (app, callback) {
        fileProp.availableApps.push((settings.apps.indexOf(app) + 1) + ') ' + app.qvw);
        fileProp.availableAppsBack.push(app.qvw);
        callback();
    }, function (err) {
        fileProp.availableApps.push('x) Cancel')
    });

    var normalizedPath = path.join(__dirname, "tasks");
    //require(__dirname + '\\tasks\\' + 'ask.js')(gulp, settings, fileProp, argv);

    fs.readdirSync(normalizedPath).forEach(function (file) {
        require(__dirname + '/tasks/' + file)(gulp, settings, fileProp, argv);
    });
}

module.exports = Tasks;