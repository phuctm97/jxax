import 'jxax/core/addtions/include';
import app from 'jxax/core';

/**
 * Read data from a file that has been opened for access.
 * @param {String} path The file reference number, alias, or file path
 */
export default function readFile(ref) {
  return app.read(ref);
}
