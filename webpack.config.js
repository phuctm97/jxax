const path = require('path');

function isDev(env) {
  return env && (env === 'dev' || env.dev);
}

module.exports = (env) => ({
  mode: isDev(env) ? 'development' : 'production',
  resolve: {
    alias: {
      jxax: path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  devtool: isDev(env) ? 'source-map' : false,
});
