const path = require('path');

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
  devtool: isDev(env) ? 'source-map' : false,
});
