/*
    The script will provide 4 (at least) tasks
        * clean
        * build
        * copy to server
        * commit to git
        (+ combination between them)

    * Build
        * clean temp folder
        * open the qvw without data
        * create -prj file in the temp folder
        * SaveAs qvw in temp folder
        * close no data qvw
        * open no data qvw and save it (this will populate the -prj folder)
        * close no data qvw
        * quit qv
        * delete no data qvw

    * Copy - copy the main qvw into the source docs folder

    * Commit to Git - commit the 
*/


var gulp = require('gulp');
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

var tempFolder = '';

var settings = JSON.parse(fs.readFileSync('settings.json'));
var user = process.env['USERPROFILE'].split(path.sep)[2];
var mainTemp = 'c:\\users\\' + user + '\\\Documents\\qv-automation\\temp';
//var fileNameFull = 'c:\\Users\\Home\\Documents\\SO_40672979.qvw';
var fileNameFull, fileName, fileNameBase, fileNameTemp, prjFolder, repo;
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

function runQV(callback) {
    console.log(fileNameFull)
    console.log(fileNameBase)
    require('child_process').exec("qv.vbs " + fileNameFull + ' ' + fileNameBase+ ' ' + mainTemp , function (err, stdout, stderr) {
        if (err) {
            callback();
        }
        callback();
    });
}

function deploy(env) {
    var _target = settings.locations[env];
    mkdirp.sync(_target);
    var stat = fs.statSync(fileNameFull);
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

    fs.createReadStream(fileNameFull)
        .pipe(str)
        .pipe(fs.createWriteStream(_target + '\\' + fileName))
}

gulp.task('list:qvw', function () {
    for (var i = 0; i < settings.apps.length; i++) {
        msg.Success(settings.apps[i].qvw + ' --> ' + settings.apps[i].description);
    }
})

gulp.task('prompt', function () {
    if (fileValidated == false) {
        return gulp.src('')
            .pipe(prompt.prompt({
                type: 'list',
                name: 'qvw',
                message: 'Whic h qvw?',
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
                        prjFolder = fileNameTemp + '/' + fileNameBase + '-prj';
                        fileValidated = true;
                        repo = settings.apps[pos - 1].git
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

gulp.task('create:xml', ['prompt', 'clear:tempPrj'], function () {
    mkdirp.sync(prjFolder);
    //del.sync('C:/Users/Home/Documents/GitHub/temp/' + fileNameBase + '/' + fileName);

    runQV(function () {
        msg.Success('XML files were successfuly created');
    });
});

gulp.task('watch', ['prompt'], function () {
    gulp.watch(fileNameFull, ['create:xml'])
    // .pipe(through.obj(function (chunk, enc, cb) { 
    //     console.log('changed');
    //     cb(null, chunk)
    // }))
})

gulp.task('clear:tempAll', function () {
    del([mainTemp + '\\temp\\**\\*'], function () {
        msg.Success('Temp folder cleared');
    });
});

gulp.task('clear:tempApp', ['prompt'], function () {
    del([mainTemp + '\\temp\\' + fileNameBase + '\\*'], function () {
        msg.Success('Temp folder cleared');
    });
});

gulp.task('clear:tempPrj', ['prompt'], function () {
    return del([prjFolder + '/*', '!'+prjFolder+'.git'], {force:true}, function () {
        msg.Success('Temp folder cleared');
    });
});

gulp.task('deploy:prod', ['prompt'], function () {
    deploy('prod');
});

gulp.task('deploy:dev', ['prompt'], function () {
    deploy('dev');
});

gulp.task('deploy:test', ['prompt'], function () {
    deploy('test');
});

gulp.task('git:clone', ['prompt', 'clear:tempApp'], function(){
  git.clone('https://github.com/countnazgul/test-prj', {args: prjFolder}, function (err) {
    if (err) throw err;
  });
});

gulp.task('git:add', ['prompt'], function(){
  return gulp.src(prjFolder + '/*')
    .pipe(git.add({args: '', cwd: prjFolder}));
});

gulp.task('git:commit', ['prompt'], function(){
    console.log(prjFolder)
  return gulp.src(prjFolder + '/*')
    .pipe(git.commit('initial commit', { cwd: prjFolder, multiline: true, args: '' }));
});

gulp.task('git:push', function(){
  git.push('origin', 'master', {cwd: prjFolder},  function (err) {
    if (err) throw err;
  });
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


