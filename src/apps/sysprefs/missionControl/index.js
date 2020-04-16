import { isUndefined } from 'lodash';
import { createStepper } from '@core/workflow';
import { selectCheckbox, selectPopUpButton } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';

export { default as validateConfigureMissionControl } from '@apps/sysprefs/missionControl/options';

/**
 * @typedef {import('./options').SysPrefsMissionControlSettings} SysPrefsMissionControlSettings
 */

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

/**
 * Configure _System Preferences/Mission Control_ settings.
 *
 * @param {SysPrefsMissionControlSettings} settings The settings object.
 * @param {object} opts Options.
 */
export function configureMissionControl(settings, opts = {}) {
  const {
    autoRearrangeSpaces, switchSpaceWhenSwithToApp, groupWindowsByApp, displaysHaveSeparateSpaces,
    missionControlKeyShortcut, appWindowsKeyShortcut, showDesktopKeyShortcut,
  } = settings;

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
