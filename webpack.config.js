const webpack = require('webpack');
const path = require('path');
const extractAlias = require('./scripts/extract-webpack-alias-from-jsconfig');

function isDev(env) {
  return env && env.dev;
}

module.exports = (env) => ({
  mode: isDev(env) ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'bin', 'index.js'),
  output: {
    filename: 'jxax.js',
  },
  resolve: {
    alias: extractAlias(path.resolve(__dirname, 'jsconfig.json')),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    // Register OSA run handler.
    new webpack.BannerPlugin({
      banner: [
        'const scpt=this;',
        'this.run=function(args){};',
        'function run(args){return this.run(args);}',
      ].join(''),
      raw: true,
    }),
    // Add shebang.
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env osascript -l JavaScript', raw: true }),
  ],
  performance: {
    hints: false,
  },
});
