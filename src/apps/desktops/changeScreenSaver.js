import { isObject, isUndefined } from 'lodash';
import { validate, join } from '@utils';
import { createStepper } from '@core/workflow';
import sysEvents from '@core/sysEvents';

// Helper function generates inclusion constraints.
function inclusion(vals) {
  return {
    inclusion: {
      within: isObject(vals) ? Object.values(vals) : vals,
      message: `is invalid, must be within [${join(vals)}]`,
    },
  };
}

// Change screen saver arguments constraints.
const constraints = {
  screenSaver: {
    presence: { allowEmpty: false },
    type: 'string',
  },
  delayInterval: inclusion([0, 1, 2, 5, 10, 20, 30, 60]),
  mainScreenOnly: { type: 'boolean' },
  showClock: { type: 'boolean' },
};

/**
 * @typedef {object} ConfigureScreenSaverArgs Configure screen saver arguments.
 *
 * @property {string} screenSaver Name of the screen saver.
 * @property {number} delayInterval Number of seconds of idle time before the screen saver starts;
 * zero for never.
 * @property {boolean} mainScreenOnly Should the screen saver be shown only on the main screen?
 * @property {boolean} showClock Should a clock appear over the screen saver?
 */

/**
  * Validate configure screen saver arguments.
  *
  * @param {ConfigureScreenSaverArgs} args The arguments.
  */
export function validateConfigureScreenSaver(args) {
  return validate(args, constraints);
}

/**
 * Configure screen saver.
 *
 * @param {ConfigureScreenSaverArgs} args The arguments.
 * @param {object} opts Options.
 */
export function configureScreenSaver(args, opts = {}) {
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
