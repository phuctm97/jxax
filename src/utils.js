import {
  isObject, isArray, isNil, difference, merge,
} from 'lodash';
import * as validatejs from 'validate.js';

/**
 * A boolean indicates whether the application is running in development mode.
 * @type {boolean}
 */
export const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Check if a value is a promise.
 *
 * @param {any} val Any value.
 * @returns {boolean} Whether the value is a promise or not.
 */
export function isPromise(val) {
  return !!val && (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function';
}

/**
 * Adds all the values of a collection separated by the specified separator string.
 *
 * @param {string} separator A string used to separate one element of an array from the next in the
 * resulting String. If omitted, the array elements are separated with a comma.
 * @returns {string} The result string.
 */
export function join(collection, separator = ', ') {
  if (isObject(collection)) {
    return Object.values(collection).join(separator);
  }
  if (isArray(collection)) {
    return collection.join(separator);
  }
  throw new TypeError('join.collection must be either an object or an array.');
}

/**
 * Get name of a varible using object instantiation syntax.
 *
 * @example
 * const someVar = something();
 * nameOf({someVar}); // => "someVar"
 *
 * @param {object} obj An object containing the variable's reference as its first prop.
 * @returns {string} The name of the variable.
 */
export function nameOf(obj) {
  return Object.keys(obj)[0];
}

/**
 * Validates the attributes object against the constraints.
 * The attributes must be a plain object or a form element, things like backbone models etc are not
 * supported. See https://validatejs.org/#constraints for constraints details.
 *
 * @param {object} attributes The attributes to validate.
 * @param {object} constraints The constraints object.
 * @returns {object} An object of array of errors message or `undefined` if no error found.
 */
export function validate(attributes, constraints) {
  const unknownKeys = difference(Object.keys(attributes), Object.keys(constraints));
  const unknownOptErrors = unknownKeys ? Object.fromEntries(unknownKeys.map((key) => [key, ['is unknown option']])) : undefined;
  const validationErrors = validatejs(attributes, constraints, { fullMessages: false });
  if (isNil(validationErrors) && isNil(unknownOptErrors)) return undefined;
  if (!isNil(validationErrors) && !isNil(unknownOptErrors)) {
    return merge(validationErrors, unknownOptErrors);
  }
  if (!isNil(validationErrors)) return validationErrors;
  return unknownOptErrors;
}
