const path = require('path');
const webpack = require('webpack');

module.exports = {
  stats: {
    errorDetails: true,
  },
  entry: {
    home: './client/client.js',
  },
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', 'jsx', '.css'],
    modulesDirectories: [
      'node_modules'
    ],
    unsafeCache: true,
  },
};
