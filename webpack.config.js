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
}
