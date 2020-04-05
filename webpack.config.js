const path = require('path');

const { DefinePlugin } = require('webpack');

function isDev(env) {
  // Have to explicitly specify env to set to development mode, production mode is set by default.
  return env && env.dev;
}

const Targets = {
  NODE: 'node',
  OSA: 'osa',
};

function isTargetNode(env) {
  // Have to explicitly specify env to target node.
  return env && (env.target === Targets.NODE || env[Targets.NODE]);
}

function isTargetOSA(env) {
  // Target OSA by default.
  return !env || (env.target === Targets.OSA || env[Targets.OSA]);
}

function config(target, env) {
  return {
    mode: isDev(env) ? 'development' : 'production',
    output: {
      filename: `main.${target}.js`,
    },
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
    plugins: [
      new DefinePlugin({
        'process.env.TARGET_ENV': JSON.stringify(target),
      }),
    ],
    // Don't generate source-map for OSA target as osascript doesn't support source-map (yet).
    devtool: (isDev(env) && target !== Targets.OSA) ? 'source-map' : false,
  };
}

module.exports = (env) => {
  const configs = [];
  if (isTargetNode(env)) configs.push(config(Targets.NODE, env));
  if (isTargetOSA(env)) configs.push(config(Targets.OSA, env));
  return configs;
};
