'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader'})
            }, /*
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader' ]})
            }*/
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ],

    devtool: "source-map",

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public'
    }
}
