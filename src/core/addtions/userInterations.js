/**
 * User Interaction suite provides basic commands for interacting with the user.
 */

import app from '@core/app';
import '@core/addtions/include';

/**
 * @type {import('jxax/core/app/types').path}
 * @type {import('jxax/core/app/types').Color}
 */

/**
 * Beep 1 or more times.
 *
 * @param {number} n Number of times to beep.
 */
export function beep(n = undefined) {
  app.beep(n);
}

/**
 * Choose an application on this machine or the network.
 *
 * @param {object} opts Options.
 * @param {string} opts.withTitle The dialog window title.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {boolean} opts.multipleSelectionsAllowed Allow multiple items to be selected? (default is
 * false).
 * @param {any} opts.as The desired type of result. May be application (the default) or alias.
 * @returns {any} The chosen application.
 */
export function chooseApplication(opts = {}) {
  return app.chooseApplication(opts);
}

/**
 * Choose a color.
 *
 * @param {object} opts Options.
 * @param {Color} opts.defaultColor The default color.
 * @returns {Color} The chosen color.
 */
export function chooseColor(opts = {}) {
  return app.chooseColor(opts);
}

/**
 * Choose a file on a disk or server.
 *
 * @param {object} opts Options.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {string[]} opts.ofType A list of file types or type identifiers, only files of the
 * specified types will be selectable.
 * @param {path} opts.defaultLocation The default file location.
 * @param {boolean} opts.invisibles Show invisible files and folders? (default is false).
 * @param {boolean} opts.multipleSelectionsAllowed Show the contents of packages? (Packages will be
 * treated as folders, default is false).
 * @param {boolean} opts.showingPackageContents Show the contents of packages? (Packages will be
 * treated as folders. Default is false.).
 * @returns {path} The chosen file.
 */
export function chooseFile(opts = {}) {
  return app.chooseFile(opts);
}

/**
 * Get a new file reference from the user, without creating the file.
 *
 * @param {object} opts Options.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {string} opts.defaultName The default name for the new file.
 * @param {path} opts.defaultLocation The default file location.
 * @returns {path} The file the user specified.
 */
export function chooseFileName(opts = {}) {
  return app.chooseFileName(opts);
}

/**
 * Choose a folder on a disk or server.
 *
 * @param {object} opts Options.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {path} opts.defaultLocation The default folder location.
 * @param {boolean} opts.invisibles Show invisible files and folders? (default is false).
 * @param {boolean} opts.multipleSelectionsAllowed Allow multiple items to be selected? (default is
 * false).
 * @param {boolean} opts.showingPackageContents Show the contents of packages? (Packages will be
 * treated as folders. Default is false.).
 * @returns {path} The chosen folder.
 */
export function chooseFolder(opts = {}) {
  return app.chooseFolder(opts);
}

/**
 * Choose one or more items from a list.
 *
 * @param {(string[]|number[])} list A list of items to display.
 * @param {object} opts Options.
 * @param {string} opts.withTitle The dialog window title.
 * @param {string} opts.withPrompt The prompt to be displayed in the dialog box.
 * @param {(string[]|number[])} opts.defaultItems A list of items to initially select (an empty
 * list if no selection).
 * @param {string} opts.okButtonName The name of the OK button.
 * @param {string} opts.cancelButtonName The name of the Cancel button.
 * @param {boolean} opts.multipleSelectionsAllowed Allow multiple items to be selected?
 * @param {boolean} opts.emptySelectionAllowed Can the user make no selection and then choose OK?
 * @returns {(string[]|number[])} The list of selected items.
 */
export function chooseFromList(list, opts = {}) {
  return app.chooseFromList(list, opts);
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
export function displayAlert(text, opts = {}) {
  return app.displayAlert(text, opts);
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
 * @param {(SystemIcons|number|path)} opts.withIcon The resource name or ID of the icon to display,
 * or one of these system icons, or an alias or file reference to a ‘.icns’ file.
 * @param {number} opts.givingUpAfter Number of seconds to wait before automatically dismissing the
 * dialog.
 * @returns {DialogReply} A record containing the button clicked and text entered (if any).
 */
export function displayDialog(text, opts = {}) {
  return app.displayDialog(text, opts);
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
export function displayNotification(text, opts = {}) {
  app.displayNotification(text, opts);
}

/**
 * Speak the given text.
 *
 * @param {string} text The text to speak, which can include intonation characters.
 * @param {object} opts Options.
 * @param {string} opts.displaying The text to display in the feedback window (if different).
 * Ignored unless Speech Recognition is on.
 * @param {string} opts.using The voice to speak with. (Default is the system voice.).
 * @param {number} opts.speakingRate the rate of speech in words per minute. Average human speech
 * occurs at a rate of 180 to 220 words per minute. (Default depends on the voice used. If “using”
 * is not given, the system speaking rate is the default.).
 * @param {number} opts.pitch the base pitch frequency, a real number from 0 to 127. Values
 * correspond to MIDI note values, where 60 is equal to middle C. Typical pitches range from around
 * 30 to 40 for a low-pitched male voice to perhaps 55 to 65 for a high-pitched child’s voice.
 * @param {number} opts.modulation The pitch modulation, a real number from 0 to 127. A value of 0
 * corresponds to a monotone in which all speech is at the base speech pitch. Given a pitch value
 * of 46, a modulation of 2 means the widest range of pitches would be 44 to 48.
 * @param {number} opts.volume The volume, a real number from 0 to 1 (default is the system volume).
 * @param {boolean} opts.stoppingCurrentSpeech Stop any current speech before starting (default is
 * false). When false, “say” waits for previous speech commands to complete before beginning to
 * speak.
 * @param {boolean} opts.waitingUntilCompletion wait for speech to complete before returning
 * (default is true).
 * @param {any} opts.savingTo The alias, file reference or path string of an AIFF file (existing or
 * not) to contain the sound output.
 *
 * @description
 * When “saving to” or voice-modifying parameters other than “using” are given, text is not
 * displayed in the Speech Recognition feedback window, as it is not used to produce the speech in
 * that case.
 */
export function say(text, opts = {}) {
  app.say(text, opts);
}
