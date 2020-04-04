import enableDevtool from 'jxax/core/devtool';

let devtool;
if (process.env.NODE_ENV === 'development') {
  devtool = enableDevtool({
    'Application.currentApplication().read': () => JSON.stringify({}),
  });
}

const fn = require('jxax/examples/main').default;

fn();

if (devtool) {
  console.log(devtool.toString());
}
