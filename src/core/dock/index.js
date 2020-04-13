/**
 * Dock Preferences Suite: Terms and Events for controlling the dock preferences.
 * See `Script Editor.app/Library/System Events/Dock Preferences Suite`.
 */

import {
  isBoolean, isNumber, includes, round,
} from 'lodash';
import { join } from '@utils';
import { access } from '@core/app';
import { MinimizeEffects, ScreenEdges } from '@core/dock/options';

export * from '@core/dock/options';

// Get access to `dockPreferences` from `System Events` application.
const { dockPreferences } = access('System Events');

/**
 * The dock preferences object exports APIs for getting and changing dock preferences.
 */
const dockPreferencesObject = {
  /**
   * Is the animation of opening applications on or off?
   * @type {boolean}
   */
  get animate() {
    return dockPreferences.animate();
  },
  set animate(val) {
    if (!isBoolean(val)) throw new TypeError('dockPreferencesObject.animate must be a boolean.');
    dockPreferences.animate = val;
  },

  /**
   * Is autohiding the dock on or off?
   * @type {boolean}
   */
  get autohide() {
    return dockPreferences.autohide();
  },
  set autohide(val) {
    if (!isBoolean(val)) throw new TypeError('dockPreferencesObject.autohide must be a boolean.');
    dockPreferences.autohide = val;
  },

  /**
   * Size/height of the items (between 0.0 (minimum) and 1.0 (maximum)).
   * @type {number}
   */
  get dockSize() {
    return dockPreferences.dockSize();
  },
  set dockSize(val) {
    if (!isNumber(val)) throw new TypeError('dockPreferencesObject.dockSize must be a number.');

    const roundedVal = round(val, 2);
    if (roundedVal < 0 || roundedVal > 1) throw new TypeError('dockPreferencesObject.dockSize must be between 0.00 and 1.00.');

    dockPreferences.dockSize = roundedVal;
  },

  /**
   * Is magnification on or off?
   * @type {boolean}
   */
  get magnification() {
    return dockPreferences.magnification();
  },
  set magnification(val) {
    if (!isBoolean(val)) throw new TypeError('dockPreferencesObject.magnification must be a boolean.');
    dockPreferences.magnification = val;
  },

  /**
   * Maximum magnification size when magnification is on (between 0.0 (minimum) and 1.0 (maximum)).
   * @type {number}
   */
  get magnificationSize() {
    return dockPreferences.magnificationSize();
  },
  set magnificationSize(val) {
    if (!isNumber(val)) throw new TypeError('dockPreferencesObject.magnificationSize must be a number.');

    const roundedVal = round(val, 2);
    if (roundedVal < 0 || roundedVal > 1) throw new TypeError('dockPreferencesObject.magnificationSize must be between 0.00 and 1.00.');

    dockPreferences.magnificationSize = roundedVal;
  },

  /**
   * Minimization effect.
   * @type {MinimizeEffects}
   */
  get minimizeEffect() {
    return dockPreferences.minimizeEffect();
  },
  set minimizeEffect(val) {
    if (!includes(MinimizeEffects, val)) {
      throw new TypeError(`dockPreferencesObject.minimizeEffect must be within [${join(MinimizeEffects)}].`);
    }
    dockPreferences.minimizeEffect = val;
  },

  /**
   * Location on screen.
   * @type {ScreenEdges}
   */
  get screenEdge() {
    return dockPreferences.screenEdge();
  },
  set screenEdge(val) {
    if (!includes(ScreenEdges, val)) {
      throw new TypeError(`dockPreferencesObject.screenEdge must be within [${join(ScreenEdges)}].`);
    }
    dockPreferences.screenEdge = val;
  },
};

export default dockPreferencesObject;
