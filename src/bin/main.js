import runWorkflow, { loadJobs } from '@core/workflow';
import createConsoleReporter from '@reporters/console';
import readConfig from '@bin/readConfig';
import library from '@bin/library';


/**
 * The `jxax` CLI application entry.
 *
 * @param {string[]} args The CLI arguments.
 */
export default function main(args) {
  if (args.length !== 1) throw new Error('expected [file] argument');

  const config = readConfig(args[0]);
  const jobs = loadJobs(library, config);
  const reporter = createConsoleReporter();
  if (!runWorkflow(jobs, { reporter })) {
    throw new Error('workflow failed');
  }
}
