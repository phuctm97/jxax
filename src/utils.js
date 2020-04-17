import {
  isObject, isArray, isNil, difference, merge,
} from 'lodash';
import * as validatejs from 'validate.js';

/**
 * A boolean indicates whether the application is running in development mode.
 *
 * @type {boolean}
 */
export const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Check if a value is a `Promise`.
 *
 * @param {any} val The value to check.
 * @returns {boolean} Whether the value is a `Promise`.
 */
export function isPromise(val) {
  return !!val && (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function';
}

/**
 * Add all the values of a collection separated by the specified separator string.
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
 * Add a custom type validation for validations using the `validate` function.
 *
 * @param {string} name The type's name.
 * @param {() => any} validator The type's validator function.
 */
export function addCustomTypeValidation(name, message, validator) {
  validatejs.validators.type.types[name] = validator;
  validatejs.validators.type.messages[name] = message;
}

/**
 * Validates the attributes object against the constraints.
 * The attributes must be a plain object or a form element, things like backbone models etc are not
 * supported. See https://validatejs.org/#constraints for constraints details.
 *
 * @param {object} attributes The attributes to validate.
 * @param {object} constraints The constraints object.
 * @returns {object} An object of array of error messages or `undefined` if no error found.
 */
export function validate(attributes, constraints) {
  const unknownKeys = difference(Object.keys(attributes), Object.keys(constraints));
  const unknownErrs = unknownKeys.length > 0
    ? Object.fromEntries(unknownKeys.map((key) => [key, ['is unknown key']]))
    : undefined;

  const validationErrs = validatejs(attributes, constraints, { fullMessages: false });

  if (isNil(validationErrs) && isNil(unknownErrs)) {
    return undefined;
  }
  if (!isNil(validationErrs) && !isNil(unknownErrs)) {
    return merge(validationErrs, unknownErrs);
  }
  if (!isNil(validationErrs)) {
    return validationErrs;
  }
  return unknownErrs;
}
