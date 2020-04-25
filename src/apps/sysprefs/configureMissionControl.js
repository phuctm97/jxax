import { isUndefined } from 'lodash';
import { createStepper } from '@core/workflow';
import { selectCheckbox, selectPopUpButton } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';

// Helper function converts input keyboard shortcut to keyboard shortcut symbols.
function parseKeyShortcut(s) {
  return s
    .replace('[control][up]', '⌃ ↑')
    .replace('[control][down]', '⌃ ↓')
    .replace('[control]', '⌃')
    .replace('[option]', '⌥')
    .replace('[shift]', '⇧')
    .replace('[command]', '⌘');
}

function run(argss, opts = {}) {
  const {
    autoRearrangeSpaces,
    switchSpaceWhenSwithToApp,
    groupWindowsByApp,
    displaysHaveSeparateSpaces,
    missionControlKeyShortcut,
    appWindowsKeyShortcut,
    showDesktopKeyShortcut,
  } = argss;

  return runInSysPrefs('Mission\nControl', ({ window }) => {
    const stepper = createStepper(opts);

    stepper.addStep('set auto rearrange spaces', !isUndefined(autoRearrangeSpaces),
      () => {
        selectCheckbox(window.groups[1], 'Automatically rearrange Spaces based on most recent use',
          autoRearrangeSpaces);
      });
    stepper.addStep('set switch space when switch to app', !isUndefined(switchSpaceWhenSwithToApp),
      () => {
        selectCheckbox(window.groups[1], 'When switching to an application, switch to a Space with open windows for the application',
          switchSpaceWhenSwithToApp);
      });
    stepper.addStep('set group windows by app', !isUndefined(groupWindowsByApp),
      () => {
        selectCheckbox(window.groups[1], 'Group windows by application', groupWindowsByApp);
      });
    stepper.addStep('set auto displays have separate spaces', !isUndefined(displaysHaveSeparateSpaces),
      () => {
        selectCheckbox(window.groups[1], 'Displays have separate Spaces', displaysHaveSeparateSpaces);
      });
    stepper.addStep('set mission control keyboard shortcut', !isUndefined(missionControlKeyShortcut),
      () => {
        selectPopUpButton(window.groups[0], { description: 'mission control keyboard options' },
          parseKeyShortcut(missionControlKeyShortcut));
      });
    stepper.addStep('set application windows keyboard shortcut', !isUndefined(appWindowsKeyShortcut),
      () => {
        selectPopUpButton(window.groups[0], { description: 'application windows keyboard options' },
          parseKeyShortcut(appWindowsKeyShortcut));
      });
    stepper.addStep('set show desktop keyboard shortcut', !isUndefined(showDesktopKeyShortcut),
      () => {
        selectPopUpButton(window.groups[0], { description: 'desktop window keyboard options' },
          parseKeyShortcut(showDesktopKeyShortcut));
      });

    return stepper.run();
  });
}

/**
 * Configure System Preferences/Mission Control command.
 */
const configureMissionControl = {
  description: 'Configure System Preferences/Mission Control',
  run,
  args: {
    autoRearrangeSpaces: {
      type: 'boolean',
      description: 'Automatically rearrange Spaces based on mist recent use',
    },
    switchSpaceWhenSwithToApp: {
      type: 'boolean',
      description: 'When switching to an application, switch to Space with open windows for the application',
    },
    groupWindowsByApp: {
      type: 'boolean',
      description: 'Group windows by application',
    },
    displaysHaveSeparateSpaces: {
      type: 'boolean',
      description: 'Displays have separate Spaces',
    },
    missionControlKeyShortcut: {
      type: 'string',
      description: 'Mission Control keyboard shortcut',
    },
    appWindowsKeyShortcut: {
      type: 'string',
      description: 'Application Windows keyboard shortcut',
    },
    showDesktopKeyShortcut: {
      type: 'string',
      description: 'Show Desktop keyboarb shortcut',
    },
  },
};

export default configureMissionControl;
