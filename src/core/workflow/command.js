import {
  isNil, isEmpty, isArray, every, omit, has,
} from 'lodash';
import { validate } from '@utils';

/**
 * @typedef {object} Command
 *
 * `Command` is the most important concept in JXAX.
 * `Command` is an extensible automation unit in JXAX.
 * A `Command` is essentially a function which requires a set of arguments and performs certain
 * automation.
 *
 * @property {string} description A quick summary about the command.
 * @property {object} args The command arguments schema.
 * @property {(object) => any} run The command's automation logic.
 */

/**
 * Validate a set of arguments against a `Command#args` schema.
 *
 * @param {Command} command The command.
 * @param {object} args The arguments.
 */
export function validateCommandArgs(command, args) {
  // Filter out `description` field.
  const constraints = Object.fromEntries(Object.entries(command.args)
    .map(([key, value]) => [key, omit(value, 'description')]));
  return validate(args, constraints);
}

/**
 * Run a `Command`.
 *
 * @param {Command} command The command.
 * @param {object} args The arguments.
 */
export function runCommand(command, args) {
  // Run validation.
  const errors = validateCommandArgs(command, args);
  if (!isNil(errors)) { // Validation failed.
    const errorMsgs = [];
    Object.entries(errors).forEach(([arg, errs]) => {
      errorMsgs.push(...errs.map((err) => `${arg} ${err}`));
    });

    throw new Error(errorMsgs.join(', '));
  }

  // Run command.
  const results = command.run(args);

  // Parse resutls.
  if (isArray(results) && !isEmpty(results)
      && every(results, (detail) => has(detail, 'step') && has(detail, 'succeeded'))) {
    // Parse result details and get error messages (if any).
    const errorMsgs = results.filter((detail) => !detail.succeeded)
      .map((detail) => `${detail.step} ${detail.error}`);

    if (!isEmpty(errorMsgs)) { // Error occurred.
      throw new Error(errorMsgs.join(', '));
    }
  }
}
