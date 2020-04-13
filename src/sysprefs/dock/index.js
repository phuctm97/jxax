import { isObject, isUndefined } from 'lodash';
import { isDevelopment } from '@utils';
import { createStepper } from '@core/workflow';
import dockPreferencesObject from '@core/dock';
import { selectPopUpButton, selectCheckbox } from '@core/uiAutomation';
import runInSystemPrefs from '@sysprefs/app';
import { TabsWhenOpeningDocumentsPreferences, DoubleClickTitleBarActions } from '@sysprefs/dock/options';

export * from '@sysprefs/dock/options';
export { default as validateSysPrefsDockSettings } from '@sysprefs/dock/options';

// Map tabsWhenOpeningDocumentsPreferences input values to query values.
const tabsWhenOpeningDocumentsPreferencesMap = {
  [TabsWhenOpeningDocumentsPreferences.ALWAYS]: 'Always',
  [TabsWhenOpeningDocumentsPreferences.IN_FULL_SCREEN_ONLY]: 'In Full Screen Only',
  [TabsWhenOpeningDocumentsPreferences.MANUALLY]: 'Manually',
};

/**
 * @typedef {import('@sysprefs/dock/options').SysPrefsDockSettings} SysPrefsDockSettings
 * @typedef {import('@core/workflow').Progress} Progress
 */

/**
 * Apply _System Preferences/Dock_ settings.
 *
 * @param {SysPrefsDockSettings} settings The settings object to apply.
 * @param {object} opts Options.
 * @param {Progress} opts.progress A progress reporter object for the job to report its progress.
 * @returns {object[]} The job's run result details.
 */
export default function applySysPrefsDockSettings(settings, opts = {}) {
  if (isDevelopment()) { // Validate arguments.
    if (!isObject(settings)) throw new TypeError('applySysPrefsDockSettings.settings must be an object.');
    if (!isObject(opts)) throw new TypeError('applySysPrefsDockSettings.opts must be an object.');
  }

  const { progress } = opts;
  const {
    size,
    magnification,
    magnificationSize,
    location,
    minimizeEffect,
    preferTabsWhenOpeningDocuments,
    doubleClickTitleBar,
    minimizeToAppIcon,
    animate,
    autohide,
    showOpenIndicators,
    showRecentApps,
  } = settings;

  return runInSystemPrefs('Dock', ({ window }) => {
    const stepper = createStepper({ progress });
    stepper.addStep('set dock size', !isUndefined(size), () => {
      dockPreferencesObject.dockSize = size;
    });
    stepper.addStep('set magnification', !isUndefined(magnification), () => {
      dockPreferencesObject.magnification = magnification;
    });
    stepper.addStep('set magnification size', !isUndefined(magnificationSize), () => {
      dockPreferencesObject.magnificationSize = magnificationSize;
    });
    stepper.addStep('set location', !isUndefined(location), () => {
      dockPreferencesObject.screenEdge = location;
    });
    stepper.addStep('set minimization effect', !isUndefined(minimizeEffect), () => {
      dockPreferencesObject.minimizeEffect = minimizeEffect;
    });
    stepper.addStep('set tabs when opening documents preferences',
      !isUndefined(preferTabsWhenOpeningDocuments),
      () => {
        selectPopUpButton(window, { description: 'prefer tabs options' },
          tabsWhenOpeningDocumentsPreferencesMap[preferTabsWhenOpeningDocuments]);
      });
    stepper.addStep('set double-click windows\' title bar action',
      !isUndefined(doubleClickTitleBar),
      () => {
        const checkboxQ = { name: 'Double-click a window’s title bar to' };
        if (doubleClickTitleBar === DoubleClickTitleBarActions.NONE) {
          selectCheckbox(window, checkboxQ, false);
        } else {
          selectCheckbox(window, checkboxQ, true);
          selectPopUpButton(window, { description: 'double click options' }, doubleClickTitleBar);
        }
      });
    stepper.addStep('set minimize windows action', !isUndefined(minimizeToAppIcon), () => {
      selectCheckbox(window, { name: 'Minimize windows into application icon' }, minimizeToAppIcon);
    });
    stepper.addStep('set animate', !isUndefined(animate), () => {
      dockPreferencesObject.animate = animate;
    });
    stepper.addStep('set autohide', !isUndefined(autohide), () => {
      dockPreferencesObject.autohide = autohide;
    });
    stepper.addStep('set show indicators for open applications',
      !isUndefined(showOpenIndicators),
      () => {
        selectCheckbox(window, { name: 'Show indicators for open applications' }, showOpenIndicators);
      });
    stepper.addStep('set show recent apps', !isUndefined(showRecentApps), () => {
      selectCheckbox(window, { name: 'Show recent applications in Dock' }, showRecentApps);
    });
    return stepper.run();
  });
}
