import 'jxax/core/addtions/include';
import app from 'jxax/core/app';

/**
 * @typedef {import('jxax/core/app/types').path}
 */

/**
 * Read data from a file that has been opened for access.
 *
 * @param {path} path The file reference number, alias, or file path.
 * @returns {string} The data read from the file.
 */
export default function readFile(path) {
  return app.read(path);
}
