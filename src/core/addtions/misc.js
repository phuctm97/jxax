/**
 * Miscellaneous Commands: Other useful commands.
 */

import app from '@core/app';
import '@core/addtions/include';

/**
 * @typedef {import('@core/app').FilePath} FilePath
 */

/**
 * Return the current date and time.
 *
 * @returns {Date} The current date and time.
 */
export function currentDate() {
  return app.currentDate();
}

/**
 * Execute a shell script using the ‘sh’ shell.
 *
 * @param {string} text The shell script to execute.
 * @param {object} opts Options.
 * @param {any} opts.as The desired type of result; default is text (UTF-8).
 * @param {boolean} opts.administratorPrivileges Execute the command as the administrator.
 * @param {string} opts.userName Use this administrator account to avoid a password dialog (If this
 * parameter is specified, the “password” parameter must also be specified.).
 * @param {string} opts.password Use this administrator password to avoid a password dialog.
 * @param {string} opts.withPrompt The rompt to be displayed in the password dialog when the name
 * and password are not specified or are incorrect.
 * @param {string} opts.alteringLineEndings Change all line endings to Mac-style and trim a
 * trailing one (default true).
 * @returns {string} The command output.
 */
export function doShellScript(text, opts = {}) {
  return app.doShellScript(text, opts);
}

/**
 * @typedef {object} VolumeSettings Reply record for the ‘get volume settings’ command.
 *
 * @property {number} outputVolume The sound output volume.
 * @property {number} inputVolume The sound input volume.
 * @property {number} alertVolume The alert volume (as a percentage of the output volume).
 * @property {boolean} outputMuted Is the sound output muted?
 */

/**
 * Get the sound output and input volume settings.
 *
 * @returns {VolumeSettings} A record containing the sound output and input volume settings.
 */
export function getVolumeSettings() {
  return app.getVolumeSettings();
}

/**
 * Set the sound output and/or input volume.
 *
 * @param {VolumeSettings} settings The sound volume settings.
 */
export function setVolume(settings) {
  app.setVolume(settings);
}

/**
 * Test attributes of this computer.
 *
 * @param {any} attr The attribute to test (either a “Gestalt” value or a shell environment
 * variable).
 * @param {object} opts Options.
 * @param {number} opts.has Test specific bits of response (ignored for environment variables).
 * @returns {any} The result of the query (or a list of all environment variables, if no attribute
 * is provided).
 */
export function systemAttribute(attr, opts = {}) {
  return app.systemAttribute(attr, opts);
}

/**
 * @typedef {object} SystemInformation Reply record for the ‘system info’ command.
 *
 * @property {string} applescriptVersion The AppleScript version.
 * @property {string} applescriptStudioVersion The AppleScript Studio version.
 * @property {string} systemVersion The system version.
 * @property {string} shortUserName The current user’s short name.
 * @property {string} longUserName The current user’s long name.
 * @property {number} userID The current user’s ID.
 * @property {string} userLocale The current user’s locale.
 * @property {FilePath} homeDirectory The current user’s home directory.
 * @property {string} bootVolume The boot volume.
 * @property {string} computerName The computer name.
 * @property {string} hostName The host name.
 * @property {string} ipv4Address The IPv4 address.
 * @property {string} primaryEthernetAddress The primary Ethernet address.
 * @property {string} cpuType The CPU type.
 * @property {number} cpuSpeed The clock speed of the CPU in MHz.
 * @property {number} physicalMemory The amount of physical RAM in MB.
 */

/**
  * Get information about the system.
  *
  * @returns {SystemInformation} A record containing the system information.
  */
export function systemInfo() {
  return app.systemInfo();
}

/**
 * Generate a random number.
 *
 * @param {number} number the upper limit (Default is 1.0. If this parameter is specified, the
 * “from” and “to” parameters will be ignored.).
 * @param {object} opts Options.
 * @param {number} opts.from The lowest number to return (default is 0.0).
 * @param {number} opts.to The highest number to return (default is 1.0).
 * @param {number} opts.withSeed A starting point for a repeatable sequence of random numbers. A
 * value of 0 will use a random seed.
 * @returns {number} A number between the “from” and “to” limits, including limit values. If all
 * specified limits are integers, the result is an integer. Otherwise, the result is a real.
 */
export function randomNumber(number = 1, opts = {}) {
  return app.randomNumber(number, opts);
}

/**
 * Rounding directions.
 *
 * @enum {string}
 */
export const RoundingDirections = {
  UP: 'up',
  DOWN: 'down',
  TOWARD_ZERO: 'toward zero',
  TO_NEAREST: 'to nearest',
  AS_TAUGHT_IN_SCHOOL: 'as taught in school',
};

/**
 * Round number to integer.
 *
 * @param {number} number The number to round.
 * @param {object} opts Options.
 * @param {RoundingDirections} opts.rounding The rounding direction; if omitted, rounds to nearest.
 * “to nearest” rounds .5 cases to the nearest even integer in order to decrease cumulative errors.
 * To always round .5 away from zero, use “as taught in school.”
 * @returns {number} The rounded value.
 */
export function round(number, opts = {}) {
  return app.round(number, opts);
}

/**
 * Return the difference between local time and GMT (Universal Time).
 *
 * @returns {number} The difference between current time zone and Universal Time, in seconds.
 */
export function timeToGMT() {
  return app.timeToGMT();
}

/**
 * @typedef {object} POSIXFile A file object specified with a POSIX (slash)-style pathname.
 *
 * @property {string} posixPath The POSIX (slash)-style path of a file or alias object.
 */
