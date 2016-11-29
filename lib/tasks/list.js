var msg = require('gulp-messenger');

function List(gulp, settings) {

    gulp.task('list:qvw', function () {
        try {
            for (var i = 0; i < settings.apps.length; i++) {
                msg.Success(settings.apps[i].qvw + ' --> ' + settings.apps[i].description);
            }
        } catch (ex) {
            console.log(ex.message)
        }
    })
}

module.exports = List;