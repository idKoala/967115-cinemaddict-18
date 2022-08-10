const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'public', to: 'build'}
            ]
        })
    ],
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: ['babel-loader']
            }
        ]
      }
}