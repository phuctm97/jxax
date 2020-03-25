/**
 * File Read/Write Suite: Commands for reading and writing information in a file.
 */

import app from '@core/app';
import '@core/addtions/include';

/**
 * @typedef {import('@core/app').FilePath} FilePath
 */

/**
 * Open a disk file for the read and write commands.
 *
 * @param {FilePath} file The file or alias to open for access. If the file does not exist, a new
 * file is created.
 * @param {object} opts Options.
 * @param {boolean} opts.writePermission Whether to allow writing to the file.
 * @returns {number} A file reference number; use for ‘read’, ‘write’, and ‘close access’.
 */
export function openForAccess(file, opts = {}) {
  return app.openForAccess(file, opts);
}

/**
 * Close a file that was opened for access.
 *
 * @param {any} file The file reference number, alias, or file reference of the file to close.
 */
export function closeAccess(file) {
  app.closeAccess(file);
}

/**
 * Read data from a file that has been opened for access.
 *
 * @param {any} file The file reference number, alias, or file path.
 * @param {object} opts Options.
 * @param {number} opts.from Starting from this position; if omitted, start at last position read
 * from.
 * @param {number} opts.for The number of bytes to read from current position; if omitted, read
 * until the end of the file…
 * @param {number} opts.to …or stop at this position…
 * @param {string} opts.before …or read up to but not including this character…
 * @param {string} opts.until …or read up to and including this character.
 * @param {string} opts.usingDelimiter The value that separates items to read…
 * @param {string[]} opts.usingDelimiters …or a list of values that separate items to read.
 * @param {any} opts.as The form in which to read and return data (default is text).
 * @returns {any} The data read from the file.
 */
export function read(file, opts = {}) {
  return app.read(file, opts);
}

/**
 * Write data to a file that was opened for access with write permission.
 *
 * @param {any} data The data to write to the file.
 * @param {object} opts Options.
 * @param {any} opts.to The file reference number, alias, or file reference of the file to write to.
 * @param {number} opts.startingAt Start writing at this position in the file.
 * @param {number} opts.for The number of bytes to write; if not specified, write all the data
 * provided.
 * @param {any} opts.as How to write the data: as text, data, list, etc. Default is text.
 */
export function write(data, opts) {
  app.write(data, opts);
}

/**
 * Return the length, in bytes, of a file.
 *
 * @param {any} file A file reference number, alias, or file reference of a file.
 * @returns The total number of bytes in the file.
 */
export function getEof(file) {
  return app.getEof(file);
}

/**
 * Set the length, in bytes, of a file.
 *
 * @param {any} file A file reference number, alias, or file reference of a file.
 * @param {object} opts Options.
 * @param {any} opts.to The new length of the file, in bytes. Any data beyond this position is lost.
 */
export function setEof(file, opts) {
  app.setEof(file, opts);
}
