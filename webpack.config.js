const path = require('path');

function isDev(env) {
  return env && (env === 'dev' || env.dev);
}

module.exports = (env) => ({
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      jxax: path.resolve(__dirname, 'src'),
    },
  },
  devtool: isDev(env) ? 'source-map' : false,
});
