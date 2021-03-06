var path = require('path');
var webpack = require('webpack');

module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './assets/js/index',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./web/public/'),
        //naming convention webpack should use for your files
        filename: '[name].js',
    },

    plugins: [

    ],

    module: {
        loaders: [{
            //.js and .jsx files
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url?limit=8192'
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&publicPath=assets/'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream&publicPath=assets/'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml&publicPath=assets/'
        }],
    },

    resolve: {
        //tells webpack where to look for modules
        modulesDirectories: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['', '.js', '.jsx']
    }
};
