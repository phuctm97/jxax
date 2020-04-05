import 'jxax/core/addtions/include';
import app from 'jxax/core';

/**
 * Choose a file on a disk or server.
 * @param {Object} opts Options
 * @param {String} opts.withPrompt The prompt to be displayed in the dialog box
 * @param {Array<String>} opts.ofType A list of file types or type identifiers,
 * only files of the specified types will be selectable
 * @param {Boolean} opts.invisibles Show invisible files and folders? (default is false)
 * @param {Boolean} opts.multipleSelectionsAllowed Show the contents of packages?
 * (Packages will be treated as folders, default is false)
 */
export function chooseFile(opts) {
  return app.chooseFile(opts);
}

/**
 * Alert types.
 * @enum {String}
 */
export const AlertTypes = {
  CRITICAL: 'critical',
  INFORMATIONAL: 'informational',
  WARNING: 'warning',
};

/**
 * Display an alert.
 * @param {String} text The alert text (will be displayed in emphasized system font)
 * @param {Object} opts Options
 * @param {String} opts.message The explanatory message (will be displayed in small system font)
 * @param {AlertTypes} opts.as The type of alert (default is informational)
 * @param {Array<String>} opts.buttons A list of up to three button names
 * @param {Number|String} opts.defaultButton The name or number of the default button
 * @param {Number|String} opts.cancelButton The name or number of the cancel button
 * @param {Number} opts.givingUpAfter Number of seconds to wait before automatically dismissing
 * the alert
 */
export function displayAlert(text, opts) {
  app.displayAlert(text, opts);
}

/**
 * System icons.
 * @enum {String}
 */
export const SystemIcons = {
  STOP: 'stop',
  NOTE: 'note',
  CAUTION: 'caution',
};

/**
 * Display a dialog box, optionally requesting user input.
 * @param {String} text The text to display in the dialog box
 * @param {Object} opts Options
 * @param {String} opts.defaultAnswer The default editable text
 * @param {Boolean} opts.hiddenAnswer Should editable text be displayed as bullets?
 * (default is false)
 * @param {Array<String>} opts.buttons A list of up to three button names
 * @param {Number|String} opts.defaultButton The name or number of the default button
 * @param {Number|String} opts.cancelButton The name or number of the cancel button
 * @param {String} opts.withTitle The dialog window title
 * @param {SystemIcons} opts.withIcon The resource name or ID of the icon to display
 * @param {Number} opts.givingUpAfter Number of seconds to wait before automatically
 * dismissing the dialog
 */
export function displayDialog(text, opts) {
  app.displayDialog(text, opts);
}

/**
 * Display a notification. At least one of the body text and the title must be specified.
 * @param {String} text The body text of the notification
 * @param {Object} opts Options
 * @param {String} opts.withTitle The title of the notification
 * (default is the name of the calling application).
 * @param {String} opts.subtitle The subtitle of the notification
 * @param {String} opts.soundName The name of the sound to play
 */
export function displayNotification(text, opts) {
  app.displayNotification(text, opts);
}

/**
 * Speak the given text.
 * @param {String} text The text to speak, which can include intonation characters
 */
export function say(text) {
  app.say(text);
}
