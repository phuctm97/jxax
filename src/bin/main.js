import { has } from 'lodash';
import runWorkflow, { createJob } from '@core/workflow';
import createConsoleReporter from '@reporters/console';
import readConfig from '@bin/readConfig';
import library from '@bin/library';

/**
 * @typedef {import('@bin/readConfig').WorkflowConfig}
 * @typedef {import('@core/workflow').Job}
 */

/**
 * Load jobs for a workflow based on its configuration object.
 *
 * @param {WorkflowConfig} config The workflow configuration object.
 * @returns {Job[]} The workflow's jobs.
 */
function loadJobs(config) {
  const jobs = [];

  config.jobs.forEach((jobConfig) => {
    const { uses, args } = jobConfig;
    if (!has(library, uses)) {
      throw new Error(`unknown action '${uses}'`);
    }

    const action = library[uses];
    jobs.push(createJob(uses, action.validate, action.run, args));
  });

  return jobs;
}

/**
 * The `jxax` CLI application entry.
 *
 * @param {string[]} args The CLI arguments.
 */
export default function main(args) {
  if (args.length !== 1) throw new Error('expected [file] argument');

  const config = readConfig(args[0]);
  const jobs = loadJobs(config);
  const reporter = createConsoleReporter();
  if (!runWorkflow(jobs, { reporter })) {
    throw new Error('workflow failed');
  }
}
