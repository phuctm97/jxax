import { isObject, isArray } from 'lodash';

/**
 * Check if the application is running in development mode.
 *
 * @returns {boolean} Whether the application is running in development mode.
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

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
  throw new Error('collection must be either an object or an array.');
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
