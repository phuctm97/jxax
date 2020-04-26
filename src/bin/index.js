/**
 * The `jxax` CLI entry module.
 */

import main from '@bin/main';
import runCommand from '@bin/runCommand';

/**
 * System exit codes.
 *
 * @enum {number}
 */
const ExitCodes = {
  SUCCESS: 0,
  FAILURE: 1,
};

/**
 * The script's run handler.
 *
 * @description
 * This is the script's low-level entry, which is invoked directly by the `osascript`.
 *
 * However, this function doesn't contain application entry logic. The application entry is
 * the `main` function in `@bin/main` module. This function guards around the `main` function and
 * translates its success or failure into appropriate system exit codes.
 *
 * @param {string[]} args The run handler's arguments.
 */
scpt.run = (args) => {
  ObjC.import('stdlib');
  try {
    main(args);
    $.exit(ExitCodes.SUCCESS);
  } catch (e) {
    const errorMessage = e.message ?? e.toString();
    console.log(`exit (${ExitCodes.FAILURE}) ${errorMessage}`);
    $.exit(ExitCodes.FAILURE);
  }
};

/**
 * The JXAX scripting library's `runCommand` handler.
 *
 * @description
 * This fucntion is exported as `runCommand` handler in `JXAX` scripting library which is
 * accessible to all OSA scripting components via `Library` function or equivalences.
 *
 * @example
 * const jxax = Library('JXAX');
 * jxax.runCommand('desktops.changePicture', {picture: 'Catalina Rock'});
 *
 * @param {string} uses The command to use.
 * @param {object} args The arguments to supply to the `Command`.
 */
scpt.runCommand = runCommand;
