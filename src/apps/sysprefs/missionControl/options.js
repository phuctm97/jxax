import { isObject, isEmpty } from 'lodash';
import { validate } from '@utils';

/**
 *  _System Preferences/Mission Control_ settings' constraints.
 */
const constraints = {
  autoRearrangeSpaces: { type: 'boolean' },
  switchSpaceWhenSwithToApp: { type: 'boolean' },
  groupWindowsByApp: { type: 'boolean' },
  displaysHaveSeparateSpaces: { type: 'boolean' },
  missionControlKeyShortcut: { type: 'string' },
  appWindowsKeyShortcut: { type: 'string' },
  showDesktopKeyShortcut: { type: 'string' },
};

/**
 * @typedef {object} SysPrefsMissionControlSettings The _System Preferences/Mission Control_
 * settings object.
 *
 * @property {boolean} autoRearrangeSpaces Automatically rearrange Spaces based on mist recent use.
 * @property {boolean} switchSpaceWhenSwithToApp When switching to an application, switch to a
 * Space with open windows for the application.
 * @property {boolean} groupWindowsByApp Group windows by application.
 * @property {boolean} displaysHaveSeparateSpaces Displays have separate Spaces.
 * @property {string} missionControlKeyShortcut Mission Control keyboard shortcut.
 * @property {string} appWindowsKeyShortcut Application Windows keyboard shortcut.
 * @property {string} showDesktopKeyShortcut Show Desktop keyboarb shortcut.
 */

/**
  * Validate a  _System Preferences/Mission Control_ settings object.
  *
  * @param {displaysHaveSeparateSpaces} settings The seetings object.
  */
export default function validateConfigureMissionControl(settings) {
  if (!isObject(settings) || isEmpty(Object.values(settings))) {
    return { '.': ['no argument'] };
  }
  return validate(settings, constraints);
}
