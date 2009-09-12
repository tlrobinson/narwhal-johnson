(function (global, evalGlobal) {

    var print = function(path) {
        Ruby.puts(path);
    };

    var read = function(path) {
        return Ruby.File.read(path);
    };

    var isFile = function(path) {
        return Ruby.File['file?'](path);
    };
    
    var evaluate = function (text) {
        // TODO maybe something better here:
        return eval(
            "(function(require,exports,module,system,print){" +
            text +
            "/**/\n})"
        );
    }
    
    var prefix = Ruby.ENV['NARWHAL_HOME'];
    var enginePrefix = Ruby.ENV['NARWHAL_ENGINE_HOME'];

    var narwhal = eval(read(prefix + "/narwhal.js"))

    narwhal({
        global: global,
        evalGlobal: evalGlobal,
        engine: 'johnson',
        engines: ['johnson', 'default'],
        prefix: prefix,
        prefixes: [enginePrefix, prefix],
        print: print,
        fs: {
            read: read,
            isFile: isFile
        },
        evaluate: evaluate,
        os : Ruby.RUBY_PLATFORM,
        debug: Ruby.ENV['NARWHAL_DEBUG'],
        verbose: Ruby.ENV['NARWHAL_VERBOSE']
    });

})(this, function () {
    return eval(arguments[0]);
});
