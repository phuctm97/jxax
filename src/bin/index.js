/**
 * The `jxax` CLI entry module.
 */

import main from '@bin/main';

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
