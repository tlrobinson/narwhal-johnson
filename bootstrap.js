(function (evalGlobal) {

    var _print = function(path) {
        Ruby.puts(path);
    };

    var _read = function(path) {
        return Ruby.File.read(path);
    };

    var _isFile = function(path) {
        return Ruby.File['file?'](path);
    };
    
    var prefix = Ruby.ENV['NARWHAL_HOME'];

    eval(_read(prefix + "/narwhal.js"))({
        global: this,
        evalGlobal: evalGlobal,
        platform: 'johnson',
        platforms: ['johnson', 'default'],
        print: _print,
        evaluate: function (text) {
            // TODO maybe something better here:
            return eval(
                "(function(require,exports,module,system,print){" +
                text +
                "/**/\n})"
            );
        },
        fs: {
            read: _read,
            isFile: _isFile
        },
        prefix: prefix,
        debug: true,
        verbose: true
    });

}).call(this, function () {
    return eval(arguments[0]);
});
