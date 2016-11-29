function List(gulp) {
    gulp.task('list:qvw', function () {
        for (var i = 0; i < settings.apps.length; i++) {
            msg.Success(settings.apps[i].qvw + ' --> ' + settings.apps[i].description);
        }
    })
}

module.exports = List;