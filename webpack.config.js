// webpack.config.js
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    path: path.join(__dirname, 'server', 'dist', 'js'),
    filename: 'bundle.js'
  },
  devtool: 'nosources-source-map',
  module: {
    loaders: [
          {
            test: /\.js$/,
            include: [
                              path.join(__dirname, 'client'),
                              path.join(__dirname,'server/shared')
                    ],
            loaders: [ 'babel', 'json' ]
          },
          {
              test: /\.css$/,  
              include: /node_modules/,  
              loaders: ['style-loader', 'css-loader'],
         }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin()
  ],
  node: {
        net : 'empty',
        dns : 'empty'
    }
};