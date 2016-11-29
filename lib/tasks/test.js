function testTask(gulp) {

    gulp.task('test:b', function (done) {
        console.log('bbbb');
        done();
    });

    gulp.task('test:a', function (done) {
        console.log('aaaaa');
        done();
    });
}


module.exports = testTask;