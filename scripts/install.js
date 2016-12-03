var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var msg = require('gulp-messenger');

var user = process.env['USERPROFILE'].split(path.sep)[2];
var mainTemp = 'c:\\Users\\' + user + '\\\Documents\\qv-automation\\temp';

mkdirp.sync(mainTemp);
fs.createReadStream(__dirname + '\\settings_example.json').pipe(fs.createWriteStream('c:\\Users\\' + user + '\\\Documents\\qv-automation\\settings.json'));

msg.Success('Temp folder and settings file were created at c:\\USsers\\' + user + '\\\Documents\\qv-automation' );
