import {
  isFunction, isString, isObject, isBoolean, has,
} from 'lodash';
import { IS_DEV } from '@utils';
import { retry } from '@core/app';

/**
 * @typedef {object} Progress A job progress reporter.
 * Progress is designed to be used in workflow's jobs. A job uses a progress to report its
 * progress, the progress renders the job's progress. Usually, a progress is created by a workflow
 * using its reporter and used by workflow's jobs. Progress is not likely to be used publicly.
 *
 * @property {string} description The job's description, writeonly, set to update the job's
 * description.
 */

/**
 * @typedef {object} Stepper A stepper object.
 * Stepper helps run jobs' tasks as steps and reports jobs' progresses as well as results. Use
 * stepper in your jobs to easily integrate your jobs with workflow APIs.
 *
 * @property {(name: string, condition: any, fn: () => void) => void} addStep Add a step to the
 * stepper.
 * @property {() => object[]} run Run the stepper, essentially run all the steps added to the
 * stepper.
 */

/**
 * Create a stepper object.
 *
 * @param {object} opts Options.
 * @param {Progress} opts.progress A progress object for the stepper to report its progress.
 * @param {boolean} opts.summarizeResult Whether to summarize result details?
 * @returns {Stepper} A stepper object.
 */
export default function createStepper(opts = {}) {
  if (IS_DEV) { // Validate arguments.
    if (!isObject(opts)) throw new TypeError('createStepper.opts must be an object.');
    if (has(opts, 'progress') && !isObject(opts.progress)) {
      throw new TypeError('createStepper.opts.progress must be an object.');
    }
    if (has(opts, 'summarizeResult') && !isBoolean(opts.summarizeResult)) {
      throw new TypeError('createStepper.opts.summarizeResult must be a boolean.');
    }
  }

  const { progress, summarizeResult } = { ...createStepper.defaultOpts, ...opts };
  const steps = [];

  // The stepper's addStep.
  const addStep = (name, condition, fn) => {
    if (IS_DEV) { // Validate arguments.
      if (!isString(name)) throw new TypeError('addStep.name must be a string.');
      if (!isFunction(fn)) throw new TypeError('addStep.fn must be a function.');
    }
    steps.push({
      name, condition, fn,
    });
  };

  // The stepper's run.
  const run = () => {
    const effectiveSteps = steps.filter((val) => (
      isFunction(val.condition) ? val.condition() : val.condition
    ));

    const total = effectiveSteps.length;
    const results = summarizeResult ? [] : undefined;

    effectiveSteps.forEach((step, index) => {
      progress.description = `${step.name} (${index + 1}/${total})`;

      if (!summarizeResult) {
        // Don't summarize result, simply run `fn`.
        retry(step.fn);
        return;
      }

      // Try run `fn` and summarize result.
      try {
        retry(step.fn);
        results.push({
          step: step.name,
          succeeded: true,
        });
      } catch (e) {
        results.push({
          step: step.name,
          succeeded: false,
          error: e.message ?? e.toString(),
        });
      }
    });

    return results;
  };

  return { addStep, run };
}

/**
 * Create stepper default options.
 */
createStepper.defaultOpts = {
  progress: { description: '' },
  summarizeResult: true,
};
