import {
  isObject, isUndefined, isNil, capitalize,
} from 'lodash';
import { isDevelopment, nameOf } from '@util';
import { retry } from '@core/app';
import appearancePreferencesObject, { ScrollBarActions } from '@core/appearance';
import {
  selectCheckbox, selectPopUpButton, selectRadio, selectToggle,
} from '@core/uiAutomation';
import runInSystemPrefs from '@sysprefs/app';
import validateSettings, {
  Appearances, AccentColors, ClickScrollBarActions, ShowScrollBarsTriggers,
} from '@sysprefs/general/options';

export * from '@sysprefs/general/options';
export { validateSettings as validateSysPrefsGeneralSettings };

const appearancesMap = {
  [Appearances.LIGHT]: { help: 'Use a light appearance for buttons,\nmenus, and windows.' },
  [Appearances.DARK]: { help: 'Use a dark appearance for buttons,\nmenus, and windows.' },
  [Appearances.AUTO]: { help: 'Automatically adjusts the appearance of buttons, menus and windows throughout the day.' },
};

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

const showScrollBarTriggersMap = {
  [ShowScrollBarsTriggers.AUTO]: { name: 'Automatically based on mouse or trackpad' },
  [ShowScrollBarsTriggers.WHEN_SCROLLING]: { name: 'When scrolling' },
  [ShowScrollBarsTriggers.ALWAYS]: { name: 'Always' },
};

const clickScrollBarActionsMap = {
  [ClickScrollBarActions.JUMP_TO_SPOT_CLICKED]: ScrollBarActions.JUMP_TO_HERE,
  [ClickScrollBarActions.JUMP_TO_NEXT_PAGE]: ScrollBarActions.JUMP_TO_NEXT_PAGE,
};

/**
 * @type {import('@sysprefs/options').HighlightColors}
 * @type {import('@sysprefs/options').SidebarIconSizes}
 */

/**
 * Apply System Preferences/General settings.
 *
 * @param {object} settings The settings object to apply.
 * @param {Appearances} settings.appearance
 * @param {AccentColors} settings.accentColor
 * @param {HighlightColors} settings.highlightColor
 * @param {SidebarIconSizes} settings.sidebarIconSize
 * @param {boolean} settings.autoHideMenuBar
 * @param {ShowScrollBarsTriggers} settings.showScrollBars
 * @param {ClickScrollBarActions} settings.clickScrollBar
 * @param {string} settings.defaultWebBrowser
 * @param {boolean} settings.askWhenClosingDocuments
 * @param {boolean} settings.closeWindowsWhenQuittingApp
 * @param {number} settings.recentItems
 * @param {boolean} settings.allowHandoff
 * @param {boolean} settings.useFontSmoothing
 */
export default function applySysPrefsGeneralSettings(settings, opts) {
  const { progress } = opts;

  if (isDevelopment()) {
    if (!isObject(settings)) throw new Error(`${nameOf({ settings })} must be an object.`);
  }

  const errs = validateSettings(settings);
  if (!isNil(errs)) {
    throw new Error(JSON.stringify(errs, null, 2));
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
      progress.description = 'setting show scroll bars';
      selectRadio(window, 1, showScrollBarTriggersMap[showScrollBars]);
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
      progress.description = 'setting font smoothing';
      retry(() => {
        appearancePreferencesObject.fontSmoothing = useFontSmoothing;
      });
    }
  });
}
