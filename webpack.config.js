'use strict';

module.exports = {
    entry: "./frontend/app",
    output: {
        path: __dirname + "/public",
        filename: "build.js",
        library: "app",
    },
    watch: true,

    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: "source-map",

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public'
    }
}
