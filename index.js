#!/usr/bin/env node

var gulp = require('gulp');

//var qvAutomate = function () {

    //function init() {
        _createTasks();
        run();
    //}


    function run() {
        //console.log(gulp)
        //process.emit('senseGo_onRunStart');
        //try {
            gulp.series(['test:a', 'test:b'], function (done) {
                //process.emit('senseGo_onRunFinished');
                //process.emit('senseGo_onEnd');
                done();
            })();
        }
        // catch (ex) {
        //     if (ex) {
        //         //gUtil.log(gUtil.colors.red(ex.name), ex.message);
        //         console.log(ex.message)
        //     }
        // }
    //}

    function _createTasks() {

        //var TaskCreator = require('./taskCreator');
        //var taskCreator = new TaskCreator(gulp, plugins, config);

        //var normalizedPath = path.join(__dirname);

        //fs.readdirSync(normalizedPath).forEach(function (file) {
        require("./lib/qv-automate")('123');
        //done();
        
        

        //});
    }

    // return {
    //     //init: init,
    //     //getConfig: getConfig,
    //     //loadYml: loadYml,
    //     run: run,
    //     gulp: gulp
    //     //tasks: tasks
    //     //plugins: plugins
    // }

//};

//module.exports = new qvAutomate();