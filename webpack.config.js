const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/app-runner.js',
    },
    module: {
        loaders: [
            { test: /\.mustache$/, loader: 'mustache-loader' },
            { test: /\.html$/, loader: 'html-loader'},
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".html"]
    },
    output: {
        path: './build',
        filename: "[name].bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'accomodations',
            filename: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({ filename: '[name].styles.css', disable: false, allChunks: true })
    ],
    devtool: '#inline-source-map',
};

