import { isObject, isUndefined } from 'lodash';
import { join } from '@utils';
import { createStepper } from '@core/workflow';
import sysEvents from '@core/sysEvents';

function run(args, opts = {}) {
  const {
    screenSaver, delayInterval, mainScreenOnly, showClock,
  } = args;

  const stepper = createStepper(opts);

  stepper.addStep('set screen saver', !isUndefined(screenSaver),
    () => {
      sysEvents.currentScreenSaver = sysEvents.screenSavers.byName(screenSaver);
    });
  stepper.addStep('set delay interval', !isUndefined(delayInterval),
    () => {
      sysEvents.screenSaverPreferences.delayInterval = delayInterval * 60;
    });
  stepper.addStep('set main screen only', !isUndefined(mainScreenOnly),
    () => {
      sysEvents.screenSaverPreferences.mainScreenOnly = mainScreenOnly;
    });
  stepper.addStep('set show clock', !isUndefined(showClock),
    () => {
      sysEvents.screenSaverPreferences.showClock = showClock;
    });

  return stepper.run();
}

function inclusion(vals) {
  return {
    within: isObject(vals) ? Object.values(vals) : vals,
    message: `is invalid, must be within [${join(vals)}]`,
  };
}

/**
 * Configure Screen Saver preferences command.
 */
const configureScreenSaver = {
  description: 'Configure screen saver preferences',
  run,
  args: {
    screenSaver: {
      presence: { allowEmpty: false },
      type: 'string',
      description: 'Name of the new screen saver, which has to added in advance',
    },
    delayInterval: {
      inclusion: inclusion([0, 1, 2, 5, 10, 20, 30, 60]),
      description: 'The time in seconds of inactivity before the screen saver is shown',
    },
    mainScreenOnly: {
      type: 'boolean',
      description: 'Show screen saver in main display only',
    },
    showClock: {
      type: 'boolean',
      description: 'Show a clock along with the screen saver when it\' being shown',
    },
  },
};

export default configureScreenSaver;
