import * as getopts from 'getopts';
import runWorkflow, { loadJobs } from '@core/workflow';
import createConsoleReporter from '@reporters/console';
import readConfig from '@bin/readConfig';
import library from '@bin/library';

/**
 * The `jxax` CLI usage.
 */
const USAGE = `
usage: jxax WORKFLOW_FILE [-s|--simple] [--no-color]
  -s, --simple     Print in simple format
    --no-color     Print in plain format
`.trim();

/**
 * The `jxax` CLI application entry.
 *
 * @param {string[]} args The CLI arguments.
 */
export default function main(args) {
  // Parse args.
  const opts = getopts(args, {
    alias: {
      help: 'h',
      simple: 's',
    },
    default: {
      color: true,
      simple: false,
    },
  });

  if (opts.help) { // Print help.
    console.log(`jxax CLI\n\n${USAGE}`);
    return;
  }

  const file = opts._[0];
  if (!file) throw new Error(`expected WORKFLOW_FILE argument\n\n${USAGE}`);

  // Run workflow.
  const config = readConfig(args[0]);
  const jobs = loadJobs(library, config);
  const reporter = createConsoleReporter({ simple: opts.simple, color: opts.color });
  if (!runWorkflow(jobs, { reporter })) {
    throw new Error('workflow failed');
  }
}
