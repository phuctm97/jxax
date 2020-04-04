/**
 * Regex for testing a valid JavaScript property name which can be referenced using dot notation.
 */
const propNamRegex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

/**
 * Return whether a prop name is valid for dot notation reference.
 * @param {string} val Prop name
 */
export function isValidPropName(val) {
  return propNamRegex.test(val);
}

/**
 * Return referencing expression for a prop.
 * @param {String} prop Prop name
 */
export function getPropReferenceExpression(prop) {
  if (typeof prop !== 'string') throw new Error('Only allow string property');

  const asInt = parseInt(prop, 10);
  if (Number.isSafeInteger(asInt)) return `[${asInt}]`;

  if (isValidPropName(prop)) return `.${prop}`;

  return `["${prop}"]`;
}
