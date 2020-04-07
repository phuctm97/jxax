import 'jxax/core/addtions/include';
import app from 'jxax/core/app';

/**
 * @typedef {import('jxax/core/app/types').path}
 */

/**
 * Choose a file on a disk or server.
 *
 * @param {object} opts Options.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {string[]} opts.ofType A list of file types or type identifiers, only files of the
 * specified types will be selectable.
 * @param {boolean} opts.invisibles Show invisible files and folders? (default is false).
 * @param {boolean} opts.multipleSelectionsAllowed Show the contents of packages? (Packages will be
 * treated as folders, default is false).
 * @returns {path} The chosen file.
 */
export function chooseFile(opts) {
  return app.chooseFile(opts);
}

/**
 * Alert types.
 *
 * @enum {string}
 */
export const AlertTypes = {
  CRITICAL: 'critical',
  INFORMATIONAL: 'informational',
  WARNING: 'warning',
};

/**
 * @typedef {object} AlertReply Reply record for the ‘display alert’ command.
 *
 * @property {string} buttonReturned The name of button chosen (empty if ‘giving up after’ was
 * supplied and alert timed out).
 * @property {boolean} gaveUp Did the alert time out? (present only if ‘giving up after’ was
 * supplied).
 */

/**
 * Display an alert.
 *
 * @param {string} text The alert text (will be displayed in emphasized system font).
 * @param {object} opts Options.
 * @param {string} opts.message The explanatory message (will be displayed in small system font).
 * @param {AlertTypes} opts.as The type of alert (default is informational).
 * @param {string[]} opts.buttons A list of up to three button names.
 * @param {(number|string)} opts.defaultButton The name or number of the default button.
 * @param {(number|string)} opts.cancelButton The name or number of the cancel button.
 * @param {number} opts.givingUpAfter Number of seconds to wait before automatically dismissing the
 * alert.
 * @returns {AlertReply} A record containing the button clicked.
 */
export function displayAlert(text, opts) {
  app.displayAlert(text, opts);
}

/**
 * System icons.
 *
 * @enum {string}
 */
export const SystemIcons = {
  STOP: 'stop',
  NOTE: 'note',
  CAUTION: 'caution',
};

/**
 * @typedef DialogReply Reply record for the ‘display dialog’ command.
 *
 * @property {string} buttonReturned Name of button chosen (empty if ‘giving up after’ was supplied
 * and dialog timed out).
 * @property {string} textReturned Text entered (present only if ‘default answer’ was supplied).
 * @property {boolean} gaveUp Did the dialog time out? (present only if ‘giving up after’ was
 * supplied).
 */

/**
 * Display a dialog box, optionally requesting user input.
 *
 * @param {string} text The text to display in the dialog box.
 * @param {object} opts Options.
 * @param {string} opts.defaultAnswer The default editable text.
 * @param {boolean} opts.hiddenAnswer Should editable text be displayed as bullets? (default is
 * false).
 * @param {string[]} opts.buttons A list of up to three button names.
 * @param {(number|string)} opts.defaultButton The name or number of the default button.
 * @param {(number|string)} opts.cancelButton The name or number of the cancel button.
 * @param {string} opts.withTitle The dialog window title.
 * @param {SystemIcons} opts.withIcon The resource name or ID of the icon to display.
 * @param {number} opts.givingUpAfter Number of seconds to wait before automatically dismissing the
 * dialog.
 * @returns {DialogReply} A record containing the button clicked and text entered (if any).
 */
export function displayDialog(text, opts) {
  app.displayDialog(text, opts);
}

/**
 * Display a notification. At least one of the body text and the title must be specified.
 *
 * @param {string} text The body text of the notification.
 * @param {object} opts Options.
 * @param {string} opts.withTitle The title of the notification
 * (default is the name of the calling application).
 * @param {string} opts.subtitle The subtitle of the notification.
 * @param {string} opts.soundName The name of the sound to play.
 */
export function displayNotification(text, opts) {
  app.displayNotification(text, opts);
}

/**
 * Speak the given text.
 * @param {string} text The text to speak, which can include intonation characters.
 */
export function say(text) {
  app.say(text);
}
