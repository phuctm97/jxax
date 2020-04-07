/**
 * Check if a value is a promise.
 *
 * @param {any} val Any value.
 * @returns {boolean} Whether the value is a promise or not.
 */
export default function isPromise(val) {
  return !!val && (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function';
}
