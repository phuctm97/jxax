import { isFunction, isString } from 'lodash';
import { isDevelopment } from '@utils';
import { retry } from '@core/app';

/**
 * @typedef {object} Progress A job progress reporter.
 * Progress is designed to be used in workflow's jobs. A job report uses progress to report its
 * progress, progress renders the job's progress. Usually, a progress is created by a workflow
 * using its reporter object and used by workflow's jobs.
 *
 * @property {string} description Update job description.
 */

/**
 * @typedef {object} Stepper A stepper object.
 *
 * @property {(name: string, condition: any, fn: () => void) => void} addStep Add a step to the
 * stepper.
 * @property {() => object[]} run Run the stepper.
 */

/**
 * Create a stepper object. Stepper helps run jobs' tasks as steps and report jobs' progresses as
 * well as results. Use stepper in your jobs to easily integrate your jobs with workflow APIs.
 *
 * @param {object} opts Options.
 * @param {Progress} opts.progress A progress reporter object for the stepper to report its
 * progress.
 * @returns {Stepper} A stepper object.
 */
export default function createStepper(opts = {}) {
  const { progress } = { ...createStepper.defaultOpts, ...opts };
  const steps = [];

  // The stepper's addStep.
  const addStep = (name, condition, fn) => {
    if (isDevelopment()) { // Validate arguments.
      if (!isString(name)) throw new Error('addStep.name must be a string.');
      if (!isFunction(fn)) throw new Error('addStep.fn must be a function.');
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
    effectiveSteps.forEach((step, index) => {
      progress.description = `${step.name} [${index + 1}/${total}]`;
      retry(step.fn);
    });
  };

  return { addStep, run };
}

/**
 * Create stepper default options.
 */
createStepper.defaultOpts = {
  progress: { description: '' },
};
