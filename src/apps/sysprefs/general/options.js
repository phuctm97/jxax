import { isObject, isEmpty } from 'lodash';
import { join, validate } from '@utils';

/**
 * Appearances.
 *
 * @enum {string}
 */
export const Appearances = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

/**
 * Accent colors.
 *
 * @enum {string}
 */
export const AccentColors = {
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  GRAPHITE: 'graphite',
};

/**
 * Highlight colors.
 *
 * @enum {string}
 */
export const HighlightColors = {
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  GRAPHITE: 'graphite',
};

/**
 * Sidebar icon sizes.
 *
 * @enum {string}
 */
export const SidebarIconSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

/**
 * Show scroll bars triggers.
 *
 * @enum {string}
 */
export const ShowScrollBarsTriggers = {
  AUTO: 'auto',
  WHEN_SCROLLING: 'whenScrolling',
  ALWAYS: 'always',
};

/**
 * Click scroll bar actions.
 *
 * @enum {string}
 */
export const ClickScrollBarActions = {
  JUMP_TO_NEXT_PAGE: 'jumpToNextPage',
  JUMP_TO_SPOT_CLICKED: 'jumpToSpotClicked',
};

// Helper function generates inclusion constraints.
function inclusion(vals) {
  return {
    inclusion: {
      within: isObject(vals) ? Object.values(vals) : vals,
      message: `is invalid, must be within [${join(vals)}]`,
    },
  };
}

/**
 * _System Preferences/General_ settings' constraints.
 */
const constraints = {
  appearance: inclusion(Appearances),
  accentColor: inclusion(AccentColors),
  highlightColor: inclusion(HighlightColors),
  sidebarIconSize: inclusion(SidebarIconSizes),
  autoHideMenuBar: { type: 'boolean' },
  showScrollBars: inclusion(ShowScrollBarsTriggers),
  clickScrollBar: inclusion(ClickScrollBarActions),
  defaultWebBrowser: { type: 'string' },
  askWhenClosingDocuments: { type: 'boolean' },
  closeWindowsWhenQuittingApp: { type: 'boolean' },
  recentItems: inclusion([0, 5, 10, 15, 20, 30, 50]),
  allowHandoff: { type: 'boolean' },
  useFontSmoothing: { type: 'boolean' },
};

/**
 * @typedef {object} SysPrefsGeneralSettings The _System Preferences/General_ settings object.
 *
 * @property {Appearances} appearance Appearance.
 * @property {AccentColors} accentColor Accent color.
 * @property {HighlightColors} highlightColor Highlight color.
 * @property {SidebarIconSizes} sidebarIconSize Sidebar icon size.
 * @property {boolean} autoHideMenuBar Automatically hide and show menu bar.
 * @property {ShowScrollBarsTriggers} showScrollBars Show scroll bars trigger.
 * @property {ClickScrollBarActions} clickScrollBar Click scroll bar to.
 * @property {string} defaultWebBrowser Default web browser.
 * @property {boolean} askWhenClosingDocuments Ask to keep changes when closing documents.
 * @property {boolean} closeWindowsWhenQuittingApp Close windows when quitting an app.
 * @property {number} recentItems Number of items to show in Recent items.
 * @property {boolean} allowHandoff Allow Handoff between this Mac and your iCloud devices.
 * @property {boolean} useFontSmoothing Use font smoothing when available.
 */

/**
 * Validate a _System Preferences/General_ settings object, return all errors or `undefined` if no
 * error found. Errors are returned an object whose keys are the invalid attributes' names and
 * values are arrays of error messages.
 *
 * @param {SysPrefsGeneralSettings} settings The settings object to validate.
 * @returns {any} The errors object or `undefined` if no error found.
 */
export default function validateSettings(settings) {
  if (!isObject(settings) || isEmpty(Object.values(settings))) {
    return { '.': ['no argument'] };
  }
  return validate(settings, constraints);
}
