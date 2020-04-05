import enableDevtool from 'jxax/core/devtool';
import colors from 'ansi-colors';

let devtool;
if (process.env.TARGET_ENV === 'node') {
  devtool = enableDevtool({
    'Application.currentApplication().read': () => JSON.stringify({}),
    ['Application("System Events")'
    + '.applicationProcesses[Application("System Preferences").name()]'
    + '.windows[0].popUpButtons.whose({"description":"Recent Items"})[0].value']: 'None',
  });
}

require('jxax/examples/uiAutomation');

if (devtool) {
  console.log(colors.bold.whiteBright('⛓Scripting model execution:'));
  console.log(colors.dim(devtool));
}
