var path = require('path'), webpack = require('webpack')

module.exports = {
  entry: {
  	index: './index.js'
  },
  output: {
    path: './build',
    filename: '[name].bundle.js',
    publicPath: './build/'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { 
        test: /\.js$/, 
        loader: 'babel-loader', // 通过babel将es6的代码转为es5
        exclude: /node_modules/,
        query: {
          compact: false
        }
      },
      { test: /\.css$/, loader: 'style!css!autoprefixer'},
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.(html|tpl)$/, loader: 'html-loader' },
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  babel: {
    presets: ['es2015']
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}