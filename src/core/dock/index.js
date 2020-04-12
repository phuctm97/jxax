/**
 * Dock Preferences Suite: Terms and Events for controlling the dock preferences.
 * See Script Editor/Library/System Events/Dock Preferences Suite.
 */

import {
  isBoolean, isNumber, includes, round,
} from 'lodash';
import { join } from '@util';
import { access } from '@core/app';
import { MinimizeEffects, ScreenEdges } from '@core/dock/options';

export * from '@core/dock/options';

// Get access to `dockPreferences` from `System Events` application.
const { dockPreferences } = access('System Events');

/**
 * Dock preferences object.
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
    if (!isBoolean(val)) throw new Error('animate must be a boolean.');
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
    if (!isBoolean(val)) throw new Error('animate must be a boolean.');
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
    if (!isNumber(val)) throw new Error('animate must be a number.');

    const roundedVal = round(val, 2);
    if (roundedVal < 0 || roundedVal > 1) throw new Error('animate must be between 0.00 and 1.00.');

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
    if (!isBoolean(val)) throw new Error('magnification must be a boolean.');
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
    if (!isNumber(val)) throw new Error('magnificationSize must be a number.');

    const roundedVal = round(val, 2);
    if (roundedVal < 0 || roundedVal > 1) throw new Error('magnificationSize must be between 0.00 and 1.00.');

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
      throw new Error(`minimizeEffect must be within [${join(MinimizeEffects)}].`);
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
      throw new Error(`screenEdge must be within [${join(ScreenEdges)}].`);
    }
    dockPreferences.screenEdge = val;
  },
};

export default dockPreferencesObject;
