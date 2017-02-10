var webpack = require('webpack');
var path = require('path');
var config = {};

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    entry: __dirname + '/src/index.js',

    output: {
      path: __dirname + 'dist/',
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'axios',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      loaders: [{
          test: /(\.jsx|\.js)$/,
          loader: 'babel',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /(\.jsx|\.js)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js']
    },
    node: {
      process: false
    },
    devtool: 'source-map'
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];

  if (uglify) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    );
  }

  return config;
}

['axios', 'axios.min'].forEach(function(key) {
  config[key] = generateConfig(key);
});

module.exports = config;
