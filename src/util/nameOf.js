/**
 * Get name of a varible using object instantiation syntax.
 * @example
 * const someVar = something();
 * nameOf({someVar}); // => "someVar"
 * @param {Object} obj Object containing variable reference as a prop
 * @returns {String} Name of the variable.
 */
export default function nameOf(obj) {
  return Object.keys(obj)[0];
}
