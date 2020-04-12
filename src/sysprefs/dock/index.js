import { isObject, isNil, isUndefined } from 'lodash';
import { isDevelopment, nameOf } from '@utils';
import { retry } from '@core/app';
import dockPreferencesObject from '@core/dock';
import { selectPopUpButton, selectCheckbox } from '@core/uiAutomation';
import runInSystemPrefs from '@sysprefs/app';
import validateSettings, { TabsWhenOpeningDocumentsPreferences, DoubleClickTitleBarActions } from '@sysprefs/dock/options';

export * from '@sysprefs/dock/options';
export { validateSettings as validateSysPrefsDockSettings };

const tabsWhenOpeningDocumentsPreferencesMap = {
  [TabsWhenOpeningDocumentsPreferences.ALWAYS]: 'Always',
  [TabsWhenOpeningDocumentsPreferences.IN_FULL_SCREEN_ONLY]: 'In Full Screen Only',
  [TabsWhenOpeningDocumentsPreferences.MANUALLY]: 'Manually',
};

/**
 * @type {import('@sysprefs/dock/options').ScreenEdges}
 * @type {import('@sysprefs/dock/options').MinimizeEffects}
 */

/**
 * Apply System Preferences/Dock settings.
 *
 * @param {object} settings The settings object to apply.
 * @param {number} settings.size
 * @param {boolean} settings.magnification
 * @param {boolean} settings.magnificationSize
 * @param {ScreenEdges} settings.position
 * @param {MinimizeEffects} settings.minimizeEffect
 * @param {TabsWhenOpeningDocumentsPreferences} settings.preferTabsWhenOpeningDocuments
 * @param {DoubleClickTitleBarActions} settings.doubleClickTitleBar
 * @param {boolean} settings.minimizeToAppIcon
 * @param {boolean} settings.animate
 * @param {boolean} settings.autohide
 * @param {boolean} settings.showOpenIndicators
 * @param {boolean} settings.showRecentApps
 */
export default function applySysPrefsDockSettings(settings, opts) {
  const { progress } = opts;

  if (isDevelopment()) {
    if (!isObject(settings)) throw new Error(`${nameOf({ settings })} must be an object.`);
  }

  const errs = validateSettings(settings);
  if (!isNil(errs)) {
    throw new Error(JSON.stringify(errs, null, 2));
  }

  const {
    size,
    magnification,
    magnificationSize,
    position,
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
    if (!isUndefined(size)) {
      progress.description = 'setting size';
      retry(() => {
        dockPreferencesObject.dockSize = size;
      });
    }
    if (!isUndefined(magnification)) {
      progress.description = 'setting magnification';
      retry(() => {
        dockPreferencesObject.magnification = magnification;
      });
    }
    if (!isUndefined(magnificationSize)) {
      progress.description = 'setting magnification size';
      retry(() => {
        dockPreferencesObject.magnificationSize = magnificationSize;
      });
    }
    if (!isUndefined(position)) {
      progress.description = 'setting position';
      retry(() => {
        dockPreferencesObject.screenEdge = position;
      });
    }
    if (!isUndefined(minimizeEffect)) {
      progress.description = 'setting minimization effect';
      retry(() => {
        dockPreferencesObject.minimizeEffect = minimizeEffect;
      });
    }
    if (!isUndefined(preferTabsWhenOpeningDocuments)) {
      progress.description = 'setting tabs when opening documents preferences';
      selectPopUpButton(window, { description: 'prefer tabs options' },
        tabsWhenOpeningDocumentsPreferencesMap[preferTabsWhenOpeningDocuments]);
    }
    if (!isUndefined(doubleClickTitleBar)) {
      progress.description = 'setting double-click windows\' title bar action';
      const checkboxQ = { name: 'Double-click a window’s title bar to' };
      if (doubleClickTitleBar === DoubleClickTitleBarActions.NONE) {
        selectCheckbox(window, checkboxQ, false);
      } else {
        selectCheckbox(window, checkboxQ, true);
        selectPopUpButton(window, { description: 'double click options' }, doubleClickTitleBar);
      }
    }
    if (!isUndefined(minimizeToAppIcon)) {
      progress.description = 'setting minimize windows action';
      selectCheckbox(window, { name: 'Minimize windows into application icon' }, minimizeToAppIcon);
    }
    if (!isUndefined(animate)) {
      progress.description = 'setting animation';
      retry(() => {
        dockPreferencesObject.animate = animate;
      });
    }
    if (!isUndefined(autohide)) {
      progress.description = 'setting autohide';
      retry(() => {
        dockPreferencesObject.autohide = autohide;
      });
    }
    if (!isUndefined(showOpenIndicators)) {
      progress.description = 'setting show indicators for open applications';
      selectCheckbox(window, { name: 'Show indicators for open applications' }, showOpenIndicators);
    }
    if (!isUndefined(showRecentApps)) {
      progress.description = 'setting show recent apps';
      selectCheckbox(window, { name: 'Show recent applications in Dock' }, showRecentApps);
    }
  });
}
