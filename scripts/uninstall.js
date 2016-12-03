var del = require('del');
var msg = require('gulp-messenger');
var path = require('path');

var user = process.env['USERPROFILE'].split(path.sep)[2];
var mainTemp = 'c:\\Users\\' + user + '\\\Documents\\qv-automation';

del.sync(mainTemp, { force: true });

msg.Success('Temp folder was removed')