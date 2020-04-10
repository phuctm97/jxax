import {
  isBoolean, isString, isArray, isSafeInteger, includes, every,
} from 'lodash';
import { access } from 'jxax/core/app';
import { nameOf } from 'jxax/util';
import {
  Appearances, FontSmoothingStyles, HighlightColors, ScrollBarActions,
} from 'jxax/core/appearance/options';

// Get access to `appearancePreferences` from `System Events` application.
const { appearancePreferences } = access('System Events');

/**
 * @typedef {import('jxax/core/appearance/types').Color}
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
    if (!includes(Object.values(Appearances), val)) {
      throw new Error(`${nameOf({ val })} must be within [${Object.values(Appearances).join(', ')}].`);
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
    if (!isBoolean(val)) throw new Error(`${nameOf({ val })} must be a boolean.`);
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
    if (!includes(Object.values(FontSmoothingStyles), val)) {
      throw new Error(`${nameOf({ val })} must be within [${Object.values(FontSmoothingStyles).join(', ')}].`);
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
      if (!includes(Object.values(HighlightColors), val)) {
        throw new Error(`${nameOf({ val })} must be within [${Object.values(HighlightColors).join(', ')}].`);
      }
    } else if (isArray(val)) {
      if (val.length !== 3 || !every(val, isSafeInteger)) {
        throw new Error(`${nameOf({ val })} must be an array of three integer.`);
      }
    } else {
      throw new Error(`${nameOf({ val })} must be either a string or an array of three integer.`);
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
    if (!isSafeInteger(val)) throw new Error(`${nameOf({ val })} must be an integer.`);
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
    if (!isSafeInteger(val)) throw new Error(`${nameOf({ val })} must be an integer.`);
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
    if (!isSafeInteger(val)) throw new Error(`${nameOf({ val })} must be an integer.`);
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
    if (!includes(Object.values(ScrollBarActions), val)) {
      throw new Error(`${nameOf({ val })} must be within [${Object.values(ScrollBarActions).join(', ')}].`);
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
    if (!isBoolean(val)) throw new Error(`${nameOf({ val })} must be a boolean.`);
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
    if (!isBoolean(val)) throw new Error(`${nameOf({ val })} must be a boolean.`);
    appearancePreferences.darkMode = val;
  },
};

export default appearancePreferencesObject;
