var git = require('gulp-git');
var msg = require('gulp-messenger');
var plumber = require('gulp-plumber')

function Git(gulp, settings, fileProp, argv) {
    
    gulp.task('git:clone', gulp.series('prompt', 'clear:tempApp', function (done) {
        return git.clone('https://github.com/countnazgul/test-prj', { args: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    }));

    gulp.task('git:add', gulp.series('prompt', function (done) {
        return gulp.src(fileProp.prjFolder + '/*') 
        .pipe(plumber())
        .pipe(git.add({ args: '-u', cwd: fileProp.prjFolder }))
    }));

    gulp.task('git:commit', gulp.series('prompt', function () {
		return git.exec( {args : 'commit -a -m "ttestst"'}, function ( /* err, stdout */) {
			done();
		})
        // return gulp.src(fileProp.prjFolder + '/*')
        //     .pipe(plumber())
        //     .pipe(git.commit("123", {args: '-a', cwd: fileProp.prjFolder}))

    }));

    gulp.task('git:push', function (done) {
        return git.push('origin', 'master', { cwd: fileProp.prjFolder }, function (err) {
            if (err) throw err;
            done();
        });
    });
}

module.exports = Git;