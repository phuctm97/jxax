import { isObject, isUndefined, capitalize } from 'lodash';
import { IS_DEV } from '@utils';
import { createStepper } from '@core/workflow';
import appearancePreferencesObject, { ScrollBarActions } from '@core/appearance';
import {
  selectCheckbox, selectPopUpButton, selectRadio, selectToggle,
} from '@core/uiAutomation';
import runInSystemPrefs from '@sysprefs/app';
import {
  Appearances, AccentColors, ClickScrollBarActions, ShowScrollBarsTriggers,
} from '@sysprefs/general/options';

export * from '@sysprefs/general/options';
export { default as validateSysPrefsGeneralSettings } from '@sysprefs/general/options';

// Map appearances from input values to query values.
const appearancesMap = {
  [Appearances.LIGHT]: { help: 'Use a light appearance for buttons,\nmenus, and windows.' },
  [Appearances.DARK]: { help: 'Use a dark appearance for buttons,\nmenus, and windows.' },
  [Appearances.AUTO]: { help: 'Automatically adjusts the appearance of buttons, menus and windows throughout the day.' },
};

// Map accentColors from input values to query values.
const accentColorsMap = {
  [AccentColors.BLUE]: { name: 'Blue' },
  [AccentColors.PURPLE]: { name: 'Purple' },
  [AccentColors.PINK]: { name: 'Pink' },
  [AccentColors.RED]: { name: 'Red' },
  [AccentColors.ORANGE]: { name: 'Orange' },
  [AccentColors.YELLOW]: { name: 'Yellow' },
  [AccentColors.GREEN]: { name: 'Green' },
  [AccentColors.GRAPHITE]: { name: 'Graphite' },
};

// Map showScrollBarTriggers from input values to query values.
const showScrollBarsTriggersMap = {
  [ShowScrollBarsTriggers.AUTO]: { name: 'Automatically based on mouse or trackpad' },
  [ShowScrollBarsTriggers.WHEN_SCROLLING]: { name: 'When scrolling' },
  [ShowScrollBarsTriggers.ALWAYS]: { name: 'Always' },
};

// Map clickScrollBarActions from input values to query values.
const clickScrollBarActionsMap = {
  [ClickScrollBarActions.JUMP_TO_SPOT_CLICKED]: ScrollBarActions.JUMP_TO_HERE,
  [ClickScrollBarActions.JUMP_TO_NEXT_PAGE]: ScrollBarActions.JUMP_TO_NEXT_PAGE,
};

/**
 * @typedef {import('@sysprefs/general/options').SysPrefsGeneralSettings} SysPrefsGeneralSettings
 * @typedef {import('@core/workflow').Progress} Progress
 */

/**
 * Apply _System Preferences/General_ settings.
 *
 * @param {SysPrefsGeneralSettings} settings The settings object to apply.
 * @param {object} opts Options.
 * @returns {object[]} The job's run result details.
 */
export default function applySysPrefsGeneralSettings(settings, opts = {}) {
  if (IS_DEV) { // Validate arguments.
    if (!isObject(settings)) throw new TypeError('applySysPrefsGeneralSettings.settings must be an object.');
    if (!isObject(opts)) throw new TypeError('applySysPrefsGeneralSettings.opts must be an object.');
  }

  const {
    appearance,
    accentColor,
    highlightColor,
    sidebarIconSize,
    autoHideMenuBar,
    showScrollBars,
    clickScrollBar,
    defaultWebBrowser,
    askWhenClosingDocuments,
    closeWindowsWhenQuittingApp,
    recentItems,
    allowHandoff,
    useFontSmoothing,
  } = settings;

  return runInSystemPrefs('General', ({ window }) => {
    const stepper = createStepper(opts);
    stepper.addStep('set appearance', !isUndefined(appearance), () => {
      selectToggle(window, appearancesMap[appearance]);
    });
    stepper.addStep('set accent color', !isUndefined(accentColor), () => {
      selectToggle(window, accentColorsMap[accentColor]);
    });
    stepper.addStep('set highlight color', !isUndefined(highlightColor), () => {
      selectPopUpButton(window, { name: 'Highlight color:' }, capitalize(highlightColor));
    });
    stepper.addStep('set sidebar icon size', !isUndefined(sidebarIconSize), () => {
      selectPopUpButton(window, { name: 'Sidebar icon size:' }, capitalize(sidebarIconSize));
    });
    stepper.addStep('set autohide menu bar', !isUndefined(autoHideMenuBar), () => {
      selectCheckbox(window, { name: 'Automatically hide and show the menu bar' }, autoHideMenuBar);
    });
    stepper.addStep('set show scroll bars trigger', !isUndefined(showScrollBars), () => {
      selectRadio(window, 1, showScrollBarsTriggersMap[showScrollBars]);
    });
    stepper.addStep('set click scroll bar action', !isUndefined(clickScrollBar), () => {
      appearancePreferencesObject.scrollBarAction = clickScrollBarActionsMap[clickScrollBar];
    });
    stepper.addStep('set default web browser', !isUndefined(defaultWebBrowser), () => {
      selectPopUpButton(window, { description: 'Default Web Browser popup' }, defaultWebBrowser);
    });
    stepper.addStep('set ask when closing documents',
      !isUndefined(askWhenClosingDocuments),
      () => {
        selectCheckbox(window, { name: 'Ask to keep changes when closing documents' }, askWhenClosingDocuments);
      });
    stepper.addStep('set close windows when quitting app',
      !isUndefined(closeWindowsWhenQuittingApp),
      () => {
        selectCheckbox(window, { name: 'Close windows when quitting an app' }, closeWindowsWhenQuittingApp);
      });
    stepper.addStep('set recent items', !isUndefined(recentItems), () => {
      appearancePreferencesObject.recentApplicationsLimit = recentItems;
      appearancePreferencesObject.recentDocumentsLimit = recentItems;
      appearancePreferencesObject.recentServersLimit = recentItems;
    });
    stepper.addStep('set allow handoff', !isUndefined(allowHandoff), () => {
      selectCheckbox(window, { name: 'Allow Handoff between this Mac and your iCloud devices' }, allowHandoff);
    });
    stepper.addStep('set use font smoothing', !isUndefined(useFontSmoothing), () => {
      appearancePreferencesObject.fontSmoothing = useFontSmoothing;
    });
    return stepper.run();
  });
}
