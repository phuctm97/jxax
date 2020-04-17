import {
  isObject, isArray, isString, isEmpty, every,
} from 'lodash';
import { validate, addCustomTypeValidation } from '@utils';

// Add `arrayOfString` type validation.
addCustomTypeValidation('arrayOfString', 'must be an array of string',
  (values) => isArray(values) && every(values, isString));

/**
 * The _System Preferences/Spotlight_ settings' constraints.
 */
const constraints = {
  searchResults: { type: 'arrayOfString' },
  allowSpotlightInLookup: { type: 'boolean' },
};

/**
 * @typedef {object} SysPrefsSpotlightSettings The _System Preferences/Spotlight_ settings object.
 *
 * @property {string[]} searchResults The array of categories to be shown in Spotlight's search
 * results.
 * @property {boolean} allowSpotlightInLookup Allow Spotlight Suggestions in Look up.
 */

/**
 * Validate a _System Preferences/Spotlight_ settings object.
 *
 * @param {SysPrefsSpotlightSettings} settings The settings object.
 */
export default function validateConfigureSplotlight(settings) {
  if (!isObject(settings) || isEmpty(Object.values(settings))) {
    return { '.': ['no argument'] };
  }
  return validate(settings, constraints);
}
