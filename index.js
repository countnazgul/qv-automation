#!/usr/bin/env node

var gulp = require('gulp');
var argv = require('yargs').argv;

var tasks = argv._;

//var qvAutomate = function () {

init();

function init() {
    _createTasks();
    run();
}


function run() {
    try {
        gulp.series(tasks, function (done) {
            done();
        })();
    }
    catch (ex) {
        if (ex) {
            console.log(ex.message)
        }
    }
}

function _createTasks() {
    require("./lib/qv-automate")(gulp, argv);
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