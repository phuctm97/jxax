import * as validate from 'validate.js';
import { ScreenEdges, MinimizeEffects } from '@core/dock';

export { ScreenEdges, MinimizeEffects };

/**
 * Tabs when opening documents preferences.
 *
 * @enum {string}
 */
export const TabsWhenOpeningDocumentsPreferences = {
  ALWAYS: 'always',
  IN_FULL_SCREEN_ONLY: 'inFullScreenOnly',
  MANUALLY: 'manually',
};

/**
 * Double-click window's title bar actions.
 *
 * @enum {string}
 */
export const DoubleClickTitleBarActions = {
  NONE: 'none',
  ZOOM: 'zoom',
  MINIMIZE: 'minimize',
};

// Helper function generates constraint object for an inclusion constraint.
function inclusionCons(vals) {
  return {
    within: vals,
    message: `is invalid, must be within [${vals.map((val) => JSON.stringify(val)).join(', ')}].`,
  };
}

/**
 * System Preferences/Dock settings' constraints.
 */
const constraints = {
  size: {
    numericality: {
      noStrings: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 1,
    },
  },
  magnification: { type: 'boolean' },
  magnificationSize: {
    numericality: {
      noStrings: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 1,
    },
  },
  position: { inclusion: inclusionCons(Object.values(ScreenEdges)) },
  minimizeEffect: { inclusion: inclusionCons(Object.values(MinimizeEffects)) },
  preferTabsWhenOpeningDocuments: {
    inclusion: inclusionCons(Object.values(TabsWhenOpeningDocumentsPreferences)),
  },
  doubleClickTitleBar: { inclusion: inclusionCons(Object.values(DoubleClickTitleBarActions)) },
  minimizeToAppIcon: { type: 'boolean' },
  animate: { type: 'boolean' },
  autohide: { type: 'boolean' },
  showOpenIndicators: { type: 'boolean' },
  showRecentApps: { type: 'boolean' },
};

/**
 * Validate a System Preferences/Dock settings object, return all errors or undefined if no error
 * found. Errors are returned an object whose keys are the invalid attributes' names and values are
 * arrays of error messages.
 *
 * @param {object} settings The settings object to be validated.
 * @returns {any} The errors object or undefined if no error found.
 */
export default function validateSettings(settings) {
  return validate(settings, constraints, { fullMessages: false });
}
