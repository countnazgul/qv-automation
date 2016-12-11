var msg = require('gulp-messenger');

function List(gulp, settings) {

    gulp.task('list:qvw', function (done) {
        try {
            for (var i = 0; i < settings.apps.length; i++) {
                msg.Success(settings.apps[i].qvw + ' --> ' + settings.apps[i].description);
            }

            done();

        } catch (ex) {
            console.log(ex.message);
            done();
        }
    });

    gulp.task('list:tasks', function () {

        msg.Info(`build:dev --> Compоsite task running the following tasks (in this order):
            * clear:tempApp
            * clear:tempPrj
            * git:clone
            * create:xml
            * git:commit
            * git:push
            * deploy:dev
            * deploydata:dev`
        );
        msg.Info('build:prod        --> Same as build:dev but publish the qvw and the data in the prod folder');
        msg.Info('build:test        --> Same as build:dev but publish the qvw and the data in the test folder');
        msg.Info('check:localPath   --> Local and network paths.Like c:\data\qvd or \\data\qvd');
        msg.Info('check:logFile     --> Document Properties -- > Generate Logfile is checked');
        msg.Info('check:synthKeys   --> Synthetic Keys in the data model');
        msg.Info('check:macro       --> Macro module not empty');
        msg.Info('check:macroOnOpen --> Any macro modules on open');
        msg.Info('check:macroOnPost --> Any macro modules on post reload');
        msg.Info('clear:tempAll     --> Remove the content of the root temp folder');
        msg.Info('clear:tempApp     --> Remove the content of temp folder (based on the user input or --qvw argument)');
        msg.Info('clear:tempPrj     --> Remove the content of prj folder (based on the user input or --qvw argument)');
        msg.Info('create:xml        --> This task will create temp folder for specific qvw, open qvw file, remove the data, save it as a copy in the temp folder, open the copy and save it again.After this process the xml files will be in theprj folder');
        msg.Info('deploy:dev        --> Copy the main qvw in thedev folder');
        msg.Info('deploy:prod       --> Copy the main qvw in theprod folder');
        msg.Info('deploy:test       --> Copy the main qvw in thetest folder');
        msg.Info('deploydata:dev    --> Copy all data files in thedev folder.Data files are specified in the settings.json. --data parameter must present as argument');
        msg.Info('deploydata:prod   --> Same as deploydata:prod but deploy to prod folder');
        msg.Info('deploydata:test   --> Same as deploydata:prod but deploy to test folder');
        msg.Info('git:add           --> Add file contents to the index');
        msg.Info('git:clone         --> Clone specific repository in thetemp folder');
        msg.Info('git:commit        --> Commit the changes.If--message is not provided then the default message is used - Commit from qv-automate');
        msg.Info('git:listFiles     --> List all files that are changed');
        msg.Info('git:push          --> Push the commit');
        msg.Info('list:qvw          --> List all qvw files in settings.json');
        msg.Info('list:tasks        --> This task');
        msg.Info('prompt            --> Internal task that is used for user choices');
    });

}

module.exports = List;