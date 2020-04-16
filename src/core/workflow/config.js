import { has } from 'lodash';

/**
 * @typedef {object} Job
 *
 * `Job` is a part of a `Workflow`. A `Workflow` is a sequential list of `Job`(s).
 *
 * @property {string} name The job's name.
 * @property {() => any} validate The job's validation logic.
 * @property {(object) => any} run The job's execution logic.
 */

/**
 * Create a `Job`.
 *
 * @param {string} name The job's name.
 * @param {() => any} validate The job's `validate` function.
 * @param {(object) => any} run The job's `run` function.
 * @param {object} args The job's arguments.
 * @returns {Job} The `Job`.
 */
export function createJob(name, validate, run, args) {
  return {
    name,
    validate: validate ? () => validate(args) : undefined,
    run: (opts = {}) => run(args, opts),
  };
}

/**
 * @typedef {object} Action
 *
 * `Action` is a usable command or function which can be used in combination with a set of
 * arguments to create `Job`(s).
 *
 * @property {(object) => any} validate The action's validation logic.
 * @property {(object, object) => any} run The action's execution logic.
 */

/**
 * Create a usable `Action`.
 *
 * @param {(object) => any} validate The action's `validate` function.
 * @param {(object, object) => any} run The action's `run` function.
 * @returns {Action} The `Action`.
 */
export function createAction(validate, run) {
  return { validate, run };
}

/**
 * @typedef {object} WorkflowConfig The `Workflow` configuration model.
 *
 * @property {JobConfig[]} jobs The `Workflow`'s `Job` configuration objects.
 */

/**
 * @typedef {object} JobConfig The `Job` configuration model.
 *
 * @property {string} uses The action to use for the job.
 * @property {object} args The job's arguments.
 */

/**
 * Load `Job`(s) for a `Workflow` based on its configuration object.
 *
 * @param {object} library The library of usable `Action`(s).
 * @param {WorkflowConfig} config The `Workflow` configuration object.
 * @returns {Job[]} The `Workflow`'s `Job`(s).
 */
export function loadJobs(library, config) {
  const jobs = [];

  config.jobs.forEach((jobConfig) => {
    const { uses, args } = jobConfig;
    if (!has(library, uses)) {
      throw new Error(`unknown action '${uses}'`);
    }

    const action = library[uses];
    jobs.push(createJob(uses, action.validate, action.run, args ?? {}));
  });

  return jobs;
}
