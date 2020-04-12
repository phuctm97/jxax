/**
 * Appearance Suite: Terms for controlling Appearance preferences.
 * See Script Editor/Library/System Events/Appearance Suite.
 */

import {
  isBoolean, isString, isArray, isSafeInteger, includes, every,
} from 'lodash';
import { join } from '@utils';
import { access } from '@core/app';
import {
  Appearances, FontSmoothingStyles, HighlightColors, ScrollBarActions,
} from '@core/appearance/options';

export * from '@core/appearance/options';

// Get access to `appearancePreferences` from `System Events` application.
const { appearancePreferences } = access('System Events');

/**
 * @typedef {import('@core/app').Color} Color
 */

/**
 * Appearance preferences object.
 */
const appearancePreferencesObject = {
  /**
   * The overall look of buttons, menus and windows.
   * @type {Appearances}
   */
  get appearance() {
    return appearancePreferences.appearance();
  },
  set appearance(val) {
    if (!includes(Appearances, val)) {
      throw new Error(`appearance must be within [${join(Appearances)}].`);
    }
    appearancePreferences.appearance = val;
  },

  /**
   * Is font smoothing on?
   * @type {boolean}
   */
  get fontSmoothing() {
    return appearancePreferences.fontSmoothing();
  },
  set fontSmoothing(val) {
    if (!isBoolean(val)) throw new Error('fontSmoothing must be a boolean.');
    appearancePreferences.fontSmoothing = val;
  },

  /**
   * The method used for smoothing fonts.
   * @type {FontSmoothingStyles}
   */
  get fontSmoothingStyle() {
    return appearancePreferences.fontSmoothingStyle();
  },
  set fontSmoothingStyle(val) {
    if (!includes(FontSmoothingStyles, val)) {
      throw new Error(`fontSmoothingStyle must be within [${join(FontSmoothingStyles)}].`);
    }
    appearancePreferences.fontSmoothingStyle = val;
  },

  /**
   * Color used for hightlighting selected text and lists.
   * @type {(HighlightColors|Color)}
   */
  get highlightColor() {
    return appearancePreferences.highlightColor();
  },
  set highlightColor(val) {
    if (isString(val)) {
      if (!includes(HighlightColors, val)) {
        throw new Error(`highlightColor must be within [${join(HighlightColors)}].`);
      }
    } else if (isArray(val)) {
      if (val.length !== 3 || !every(val, isSafeInteger)) {
        throw new Error('highlightColor must be an array of three integers.');
      }
    } else {
      throw new Error('highlightColor must be either a string or an array of three integers.');
    }
    appearancePreferences.highlightColor = val;
  },

  /**
   * The number of recent applications to track.
   * @type {number}
   */
  get recentApplicationsLimit() {
    return appearancePreferences.recentApplicationsLimit();
  },
  set recentApplicationsLimit(val) {
    if (!isSafeInteger(val)) throw new Error('recentApplicationsLimit must be an integer.');
    appearancePreferences.recentApplicationsLimit = val;
  },

  /**
   * The number of recent documents to track.
   * @type {number}
   */
  get recentDocumentsLimit() {
    return appearancePreferences.recentDocumentsLimit();
  },
  set recentDocumentsLimit(val) {
    if (!isSafeInteger(val)) throw new Error('recentDocumentsLimit must be an integer.');
    appearancePreferences.recentDocumentsLimit = val;
  },

  /**
   * The number of recent servers to track.
   * @type {number}
   */
  get recentServersLimit() {
    return appearancePreferences.recentServersLimit();
  },
  set recentServersLimit(val) {
    if (!isSafeInteger(val)) throw new Error('recentServersLimit must be an integer.');
    appearancePreferences.recentServersLimit = val;
  },

  /**
   * The action performed by clicking the scroll bar.
   * @type {ScrollBarActions}
   */
  get scrollBarAction() {
    return appearancePreferences.scrollBarAction();
  },
  set scrollBarAction(val) {
    if (!includes(ScrollBarActions, val)) {
      throw new Error(`scrollBarAction must be within [${join(ScrollBarActions)}].`);
    }
    appearancePreferences.scrollBarAction = val;
  },

  /**
   * Is smooth scrolling used?
   * @type {boolean}
   */
  get smoothScrolling() {
    return appearancePreferences.smoothScrolling();
  },
  set smoothScrolling(val) {
    if (!isBoolean(val)) throw new Error('smoothScrolling must be a boolean.');
    appearancePreferences.smoothScrolling = val;
  },

  /**
   * Use dark menu bar and dock.
   * @type {boolean}
   */
  get darkMode() {
    return appearancePreferences.darkMode();
  },
  set darkMode(val) {
    if (!isBoolean(val)) throw new Error('darkMode must be a boolean.');
    appearancePreferences.darkMode = val;
  },
};

export default appearancePreferencesObject;
