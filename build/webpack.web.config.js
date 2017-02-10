/**
 * Created by ebi on 2017/2/7.
 */
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: {
        'app': path.resolve('app', 'app.js')
    },
    output: {
        path: 'dist',
        filename: '[name].js'
    },
    node: {
        global: true
    },
    module: {
        loaders: [
            {
                test: /\.vue(\?[^?]+)?$/,
                loaders: ['vue']
            },
            {
                test:/\.js(\?[^?]+)?$/,
                loader: 'babel',
            }
        ]
    }
};