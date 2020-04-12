import { isObject, isArray } from 'lodash';

/**
 * Adds all the values of a collection separated by the specified separator string.
 *
 * @param {string} separator A string used to separate one element of an array from the next in the
 * resulting String. If omitted, the array elements are separated with a comma.
 * @returns {string} The result string.
 */
export default function join(collection, separator = ', ') {
  if (isObject(collection)) {
    return Object.values(collection).join(separator);
  }
  if (isArray(collection)) {
    return collection.join(separator);
  }
  throw new Error('collection must be either an object or an array.');
}
