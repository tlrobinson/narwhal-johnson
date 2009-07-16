
var IO = require("./io").IO;

exports.stdin  = new IO(function(){}, null);
exports.stdout = new IO(null, function(string) { print(String(string).replace(/\n$/,"")); });
exports.stderr = new IO(null, function(string) { print(String(string).replace(/\n$/,"")); });

exports.args = [];
exports.args.push(String(Ruby['$0']));
Ruby.ARGV.each(function(v) {
    exports.args.push(String(v));
});

exports.env = {};
Ruby.ENV.each_pair(function(k, v) {
    exports.env[String(k)] = String(v);
});

exports.fs = require('./file');

// default logger
var Logger = require("./logger").Logger;
exports.log = new Logger(exports.stdout);

