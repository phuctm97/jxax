import { isObject, isUndefined, capitalize } from 'lodash';
import { isDevelopment } from '@utils';
import { retry } from '@core/app';
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
 */

/**
 * Apply System Preferences/General settings.
 *
 * @param {SysPrefsGeneralSettings} settings The settings object to apply.
 * @param {object} opts Options.
 */
export default function applySysPrefsGeneralSettings(settings, opts) {
  if (isDevelopment()) {
    if (!isObject(settings)) throw new Error('applySysPrefsGeneralSettings.settings must be an object.');
    if (!isObject(opts)) throw new Error('applySysPrefsGeneralSettings.opts must be an object.');
  }

  const { progress } = opts;
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
    if (!isUndefined(appearance)) {
      progress.description = 'setting appearance';
      selectToggle(window, appearancesMap[appearance]);
    }
    if (!isUndefined(accentColor)) {
      progress.description = 'setting accent color';
      selectToggle(window, accentColorsMap[accentColor]);
    }
    if (!isUndefined(highlightColor)) {
      progress.description = 'setting highlight color';
      selectPopUpButton(window, { name: 'Highlight color:' }, capitalize(highlightColor));
    }
    if (!isUndefined(sidebarIconSize)) {
      progress.description = 'setting sidebar icon size';
      selectPopUpButton(window, { name: 'Sidebar icon size:' }, capitalize(sidebarIconSize));
    }
    if (!isUndefined(autoHideMenuBar)) {
      progress.description = 'setting autohide menu bar';
      selectCheckbox(window, { name: 'Automatically hide and show the menu bar' }, autoHideMenuBar);
    }
    if (!isUndefined(showScrollBars)) {
      progress.description = 'setting show scroll bars trigger';
      selectRadio(window, 1, showScrollBarsTriggersMap[showScrollBars]);
    }
    if (!isUndefined(clickScrollBar)) {
      progress.description = 'setting click scroll bar action';
      retry(() => {
        appearancePreferencesObject.scrollBarAction = clickScrollBarActionsMap[clickScrollBar];
      });
    }
    if (!isUndefined(defaultWebBrowser)) {
      progress.description = 'setting default web browser';
      selectPopUpButton(window, { description: 'Default Web Browser popup' }, defaultWebBrowser);
    }
    if (!isUndefined(askWhenClosingDocuments)) {
      progress.description = 'setting ask when closing documents';
      selectCheckbox(window, { name: 'Ask to keep changes when closing documents' }, askWhenClosingDocuments);
    }
    if (!isUndefined(closeWindowsWhenQuittingApp)) {
      progress.description = 'setting close windows when quitting app';
      selectCheckbox(window, { name: 'Close windows when quitting an app' }, closeWindowsWhenQuittingApp);
    }
    if (!isUndefined(recentItems)) {
      progress.description = 'setting recent items';
      retry(() => {
        appearancePreferencesObject.recentApplicationsLimit = recentItems;
        appearancePreferencesObject.recentDocumentsLimit = recentItems;
        appearancePreferencesObject.recentServersLimit = recentItems;
      });
    }
    if (!isUndefined(allowHandoff)) {
      progress.description = 'setting allow handoff';
      selectCheckbox(window, { name: 'Allow Handoff between this Mac and your iCloud devices' }, allowHandoff);
    }
    if (!isUndefined(useFontSmoothing)) {
      progress.description = 'setting use font smoothing';
      retry(() => {
        appearancePreferencesObject.fontSmoothing = useFontSmoothing;
      });
    }
  });
}
