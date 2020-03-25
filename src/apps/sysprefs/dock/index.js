import { isUndefined } from 'lodash';
import { createStepper } from '@core/workflow';
import sysEvents from '@core/sysEvents';
import { selectPopUpButton, selectCheckbox } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';
import { TabsWhenOpeningDocumentsPreferences, DoubleClickTitleBarActions } from '@apps/sysprefs/dock/options';

export * from '@apps/sysprefs/dock/options';

// Map tabsWhenOpeningDocumentsPreferences input values to query values.
const tabsWhenOpeningDocumentsPreferencesMap = {
  [TabsWhenOpeningDocumentsPreferences.ALWAYS]: 'Always',
  [TabsWhenOpeningDocumentsPreferences.IN_FULL_SCREEN_ONLY]: 'In Full Screen Only',
  [TabsWhenOpeningDocumentsPreferences.MANUALLY]: 'Manually',
};

/**
 * @typedef {import('./options').SysPrefsDockSettings} SysPrefsDockSettings
 */

/**
 * Configure _System Preferences/Dock_ settings.
 *
 * @param {SysPrefsDockSettings} settings The settings object.
 * @param {object} opts Options.
 */
export function configureDock(settings, opts = {}) {
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

  return runInSysPrefs('Dock', ({ window }) => {
    const stepper = createStepper(opts);

    stepper.addStep('set dock size', !isUndefined(size),
      () => {
        sysEvents.dockPreferences.dockSize = size;
      });
    stepper.addStep('set magnification', !isUndefined(magnification),
      () => {
        sysEvents.dockPreferences.magnification = magnification;
      });
    stepper.addStep('set magnification size', !isUndefined(magnificationSize),
      () => {
        sysEvents.dockPreferences.magnificationSize = magnificationSize;
      });
    stepper.addStep('set location', !isUndefined(location),
      () => {
        sysEvents.dockPreferences.screenEdge = location;
      });
    stepper.addStep('set minimization effect', !isUndefined(minimizeEffect),
      () => {
        sysEvents.dockPreferences.minimizeEffect = minimizeEffect;
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
    stepper.addStep('set minimize windows action', !isUndefined(minimizeToAppIcon),
      () => {
        selectCheckbox(window, { name: 'Minimize windows into application icon' }, minimizeToAppIcon);
      });
    stepper.addStep('set animate', !isUndefined(animate),
      () => {
        sysEvents.dockPreferences.animate = animate;
      });
    stepper.addStep('set autohide', !isUndefined(autohide),
      () => {
        sysEvents.dockPreferences.autohide = autohide;
      });
    stepper.addStep('set show indicators for open applications',
      !isUndefined(showOpenIndicators),
      () => {
        selectCheckbox(window, { name: 'Show indicators for open applications' }, showOpenIndicators);
      });
    stepper.addStep('set show recent apps', !isUndefined(showRecentApps),
      () => {
        selectCheckbox(window, { name: 'Show recent applications in Dock' }, showRecentApps);
      });

    return stepper.run();
  });
}
