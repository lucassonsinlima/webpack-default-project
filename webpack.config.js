const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {

    entry: ['./src/js/global.js', './src/scss/main.scss'],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    module: {

        loaders: [
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env']
                  }
              }
          },
          { // regular css files
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: ExtractTextPlugin.extract({
              loader: 'css-loader?importLoaders=1',
            })
          },
          { // sass / scss loader for webpack
            test: /\.(sass|scss)$/,
            exclude: /(node_modules|bower_components)/,
            use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          }
        //   {
        //     test: /\.scss$/,
        //     exclude: /(node_modules|bower_components)/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: "style-loader",
        //         use: "css-loader!sass-loader"
        //     })
        // }
      ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].bundle.css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
            files: ['./dist/*']
        }),
    ],
    watch: true,
    devtool: 'source-map'
};
