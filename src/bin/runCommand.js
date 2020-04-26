import { has } from 'lodash';
import { runCommand as run } from '@core/workflow';
import library from '@bin/library';

/**
 * Run a JXAX `Command`.
 *
 * @param {string} uses The command to use.
 * @param {object} args The arguments to supply to the `Command`.
 */
export default function runCommand(uses, args) {
  if (!has(library, uses)) {
    throw new Error(`unknown command '${uses}'`);
  }

  run(library[uses], args);
}
