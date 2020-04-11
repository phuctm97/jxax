const path = require('path');
const webpack = require('webpack');

function isDev(env) {
  return env && env.dev;
}

module.exports = (env) => ({
  mode: isDev(env) ? 'development' : 'production',
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src', 'core'),
      '@sysprefs': path.resolve(__dirname, 'src', 'sysprefs'),
      '@util': path.resolve(__dirname, 'src', 'util'),
    },
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
  devtool: isDev(env) ? 'source-map' : false,
});
