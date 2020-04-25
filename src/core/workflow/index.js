/**
 * The workflow module exports APIs for running automation tasks as workflows and jobs. Workflows
 * can be easily configured, while jobs are extensible, which facilitates flexible and extensible
 * automations.
 */

import {
  isArray, isEmpty, isNil, has, every,
} from 'lodash';
import { validateCommandArgs } from '@core/workflow/command';
import {
  emptyReporter, JobStatuses, ResultDetailTypes,
} from '@core/workflow/reporter';

export * from '@core/workflow/command';
export * from '@core/workflow/reporter';
export { default as createStepper } from '@core/workflow/stepper';

/**
 * @typedef {import('@core/workflow/command').Command} Command
 * @typedef {import('@core/workflow/reporter').Reporter} Reporter
 * @typedef {import('@core/workflow/reporter').Progress} Progress
 */

/**
 * @typedef {object} Job
 *
 * `Job` is a part of a `Workflow`. A `Workflow` is a sequential list of `Job`(s).
 *
 * @property {string} name The job's name.
 * @property {() => any} validate The job's validation logic.
 * @property {(object) => any} run The job's automation logic.
 */

/**
 * Create a `Job` from a `Command` and a set of arguments.
 *
 * @param {string} name The job's name.
 * @param {Command} command The `Command` to use.
 * @param {object} args The arguments.
 * @returns {Job} The `Job`.
 */
export function createJob(name, command, args) {
  return {
    name,
    validate: () => validateCommandArgs(command, args),
    run: (opts = {}) => command.run(args, opts),
  };
}

/**
 * @typedef {object} JobConfig The `Job` configuration model.
 *
 * @property {string} name The job's name.
 * @property {string} uses The command to use for the job.
 * @property {object} args The job's arguments.
 */

/**
 * @typedef {object} WorkflowConfig The `Workflow` configuration model.
 *
 * @property {JobConfig[]} jobs The `Workflow`'s `Job` configuration objects.
 */

/**
 * Load `Job`(s) for a `Workflow` based on its configuration object.
 *
 * @param {object} library A library of `Command`(s) to load from.
 * @param {WorkflowConfig} config The `Workflow` configuration object.
 * @returns {Job[]} The `Workflow`'s `Job`(s).
 */
export function loadJobs(library, config) {
  const jobs = [];

  config.jobs.forEach((jobConfig) => {
    const { name, uses, args } = jobConfig;
    if (!has(library, uses)) {
      throw new Error(`unknown command '${uses}'`);
    }

    const command = library[uses];
    jobs.push(createJob(name ?? uses, command, args));
  });

  return jobs;
}

// Some texts.
const Strings = {
  VALIDATE_CONFIGURATIONS: 'validate',
  NO_JOB_CONFIGURED: 'no job configured',
};

/**
 * Run a `Workflow`, which is essentially a sequential list of `Job`(s).
 *
 * @param {Job[]} jobs The `Workflow`'s `Job`(s).
 * @param {object} opts Options.
 * @param {Reporter} opts.reporter A `Reporter` object for the `Workflow` to report its progress
 * and result.
 * @returns {boolean} Whether the `Workflow` succeeded or failed. The `Workflow` is considered
 * succeeded only if all of its Job(s) succeeded, otherwise the `Workflow` failed.
 */
export default function runWorkflow(jobs, opts = {}) {
  const { reporter } = { ...runWorkflow.defaultOpts, ...opts };

  // Run validation.
  reporter.newJob({ name: Strings.VALIDATE_CONFIGURATIONS });

  if (isEmpty(jobs)) {
    // Fail if there's no job.
    reporter.endJob({
      status: JobStatuses.FAILED,
      description: Strings.NO_JOB_CONFIGURED,
    });
    return false;
  }

  // Track validation errors.
  const errors = [];

  jobs.forEach((job) => {
    if (!job.validate) return; // The job has no validation, ignore.

    // Report progress.
    reporter.updateJob({ description: job.name });

    const jobErrors = job.validate();
    if (isNil(jobErrors)) return; // No error.

    // Put the job's validation errors into the shared errors.
    Object.entries(jobErrors).forEach(([arg, errs]) => {
      errors.push(...errs.map((err) => ({
        type: ResultDetailTypes.VALIDATION_ERROR,
        job: job.name,
        argument: arg,
        message: err,
      })));
    });
  });

  if (!isEmpty(errors)) {
    // Validation has error(s), report the errors and fail.
    reporter.endJob({
      status: JobStatuses.FAILED,
      details: errors,
    });
    return false;
  }

  // Validation succeeded.
  reporter.endJob({ status: JobStatuses.SUCCEEDED });

  // Run jobs.
  let result = true;
  jobs.forEach((job) => {
    // Report progress.
    reporter.newJob({ name: job.name });

    // Build `Progress` object for the job to report its progress.
    /** @type {Progress} */
    const progress = {
      set description(description) { reporter.updateJob({ name: job.name, description }); },
    };

    try {
      // Try run the job and get its result.
      const details = job.run({ progress });

      if (isArray(details) && !isEmpty(details)
        && every(details, (detail) => has(detail, 'step') && has(detail, 'succeeded'))) {
        // Summarize and report the job's result.
        const numberOfProblems = details.filter((detail) => !detail.succeeded).length;
        reporter.endJob({
          status: numberOfProblems === 0 ? JobStatuses.SUCCEEDED : JobStatuses.WARNING,
          description: numberOfProblems === 0
            ? `(${details.length}/${details.length})` : `${numberOfProblems} problems`,
          details,
        });
      } else {
        // Undefined result, simply report the job succeeded.
        reporter.endJob({ status: JobStatuses.SUCCEEDED });
      }
    } catch (err) {
      // The job failed, workflow failed.
      result = false;

      // Report failure.
      reporter.endJob({
        status: JobStatuses.FAILED,
        description: err.message,
      });
    }
  });

  // Summarize result.
  reporter.close();
  return result;
}

/**
 * Run workflow default options.
 */
runWorkflow.defaultOpts = {
  reporter: emptyReporter,
  verbose: true,
};
