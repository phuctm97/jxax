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
export default function nameOf(obj) {
  return Object.keys(obj)[0];
}
