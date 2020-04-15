import { isUndefined, capitalize } from 'lodash';
import { createStepper } from '@core/workflow';
import sysEvents from '@core/sysEvents';
import {
  selectCheckbox, selectPopUpButton, selectRadio, selectToggle,
} from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';
import {
  Appearances, AccentColors, ClickScrollBarActions, ShowScrollBarsTriggers,
} from '@apps/sysprefs/general/options';

export * from '@apps/sysprefs/general/options';

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
  [ClickScrollBarActions.JUMP_TO_SPOT_CLICKED]: 'jump to here',
  [ClickScrollBarActions.JUMP_TO_NEXT_PAGE]: 'jump to next page',
};

/**
 * @typedef {import('./options').SysPrefsGeneralSettings} SysPrefsGeneralSettings
 */

/**
 * Configure _System Preferences/General_ settings.
 *
 * @param {SysPrefsGeneralSettings} settings The settings object.
 * @param {object} opts Options.
 */
export function configureGeneral(settings, opts = {}) {
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

  return runInSysPrefs('General', ({ window }) => {
    const stepper = createStepper(opts);

    stepper.addStep('set appearance', !isUndefined(appearance),
      () => {
        selectToggle(window, appearancesMap[appearance]);
      });
    stepper.addStep('set accent color', !isUndefined(accentColor),
      () => {
        selectToggle(window, accentColorsMap[accentColor]);
      });
    stepper.addStep('set highlight color', !isUndefined(highlightColor),
      () => {
        selectPopUpButton(window, { name: 'Highlight color:' }, capitalize(highlightColor));
      });
    stepper.addStep('set sidebar icon size', !isUndefined(sidebarIconSize),
      () => {
        selectPopUpButton(window, { name: 'Sidebar icon size:' }, capitalize(sidebarIconSize));
      });
    stepper.addStep('set autohide menu bar', !isUndefined(autoHideMenuBar),
      () => {
        selectCheckbox(window, { name: 'Automatically hide and show the menu bar' }, autoHideMenuBar);
      });
    stepper.addStep('set show scroll bars trigger', !isUndefined(showScrollBars),
      () => {
        selectRadio(window, 1, showScrollBarsTriggersMap[showScrollBars]);
      });
    stepper.addStep('set click scroll bar action', !isUndefined(clickScrollBar),
      () => {
        sysEvents.appearancePreferences.scrollBarAction = clickScrollBarActionsMap[clickScrollBar];
      });
    stepper.addStep('set default web browser', !isUndefined(defaultWebBrowser),
      () => {
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
    stepper.addStep('set recent items', !isUndefined(recentItems),
      () => {
        sysEvents.appearancePreferences.recentApplicationsLimit = recentItems;
        sysEvents.appearancePreferences.recentDocumentsLimit = recentItems;
        sysEvents.appearancePreferences.recentServersLimit = recentItems;
      });
    stepper.addStep('set allow handoff', !isUndefined(allowHandoff),
      () => {
        selectCheckbox(window, { name: 'Allow Handoff between this Mac and your iCloud devices' }, allowHandoff);
      });
    stepper.addStep('set use font smoothing', !isUndefined(useFontSmoothing),
      () => {
        sysEvents.appearancePreferences.fontSmoothing = useFontSmoothing;
      });

    return stepper.run();
  });
}
