const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');

const mainConfig = {
    context: __dirname,
    entry: {
        app: './src/app-runner.js',
    },
    module: {
        loaders: [
            { test: /\.mustache$/, loader: 'mustache-loader' },
            { test: /\.html$/, loader: 'html-loader'},
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    output: {
        filename: "js/[name].bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'accomodations',
            filename: 'index.html'
        }),
        new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
    ]
};

const devSetup = parts.devSetup();

const prodSetup = parts.prodSetup();

module.exports = function(env) {
    if (env === 'production') {
        return merge(mainConfig, prodSetup);
    }

    return merge(mainConfig, devSetup);
};



