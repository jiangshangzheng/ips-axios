const webpack = require('webpack')
const env = require('yargs').argv.env

let libraryName = 'ipshttp'
let plugins = []
let outputFile

if (env === 'build') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }))
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    },
    {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }]
  },
  plugins: plugins
}

module.exports = config
