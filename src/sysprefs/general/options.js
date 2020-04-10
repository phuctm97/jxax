import * as validate from 'validate.js';

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

// Helper function generates constraint object for an inclusion constraint.
function inclusionCons(vals) {
  return {
    within: vals,
    message: `is invalid, must be within [${vals.map((val) => JSON.stringify(val)).join(', ')}].`,
  };
}

/**
 * System Preferences/General settings' constraints.
 */
const constraints = {
  appearance: { inclusion: inclusionCons(Object.values(Appearances)) },
  accentColor: { inclusion: inclusionCons(Object.values(AccentColors)) },
  highlightColor: { inclusion: inclusionCons(Object.values(HighlightColors)) },
  sidebarIconSize: { inclusion: inclusionCons(Object.values(SidebarIconSizes)) },
  autoHideMenuBar: { type: 'boolean' },
  showScrollBars: { inclusion: inclusionCons(Object.values(ShowScrollBarsTriggers)) },
  clickScrollBar: { inclusion: inclusionCons(Object.values(ClickScrollBarActions)) },
  defaultWebBrowser: { type: 'string' },
  askWhenClosingDocuments: { type: 'boolean' },
  closeWindowsWhenQuittingApp: { type: 'boolean' },
  recentItems: { inclusion: inclusionCons([0, 5, 10, 15, 20, 30, 50]) },
  allowHandoff: { type: 'boolean' },
  useFontSmoothing: { type: 'boolean' },
};

/**
 * Validate a System Preferences/General settings object, return all errors or undefined if no
 * error found. Errors are returned an object whose keys are the invalid attributes' names and
 * values are arrays of error messages.
 *
 * @param {object} settings The settings object to be validated.
 * @returns {any} The errors object or undefined if no error found.
 */
export function validateSettings(settings) {
  return validate(settings, constraints, { fullMessages: false });
}
