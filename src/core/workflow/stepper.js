import { isFunction } from 'lodash';
import { retry } from '@core/app';

/**
 * @typedef {object} Progress The `Workflow`'s `Job`(s)' progress reporter.
 *
 * `Progress` is designed to be used within `Workflow`'s `Job`(s). A `Job` uses a `Progress` to
 * report its progress, the `Progress` renders the `Job`'s progress. Usually, a `Progress` is
 * created internally by a `Workflow` using its `Reporter` and used by the `Workflow`'s `Job`(s).
 * `Progress` is unlikely to be used externally.
 *
 * @property {string} description The progress's description, `write only`, set to update the
 * progress's latest information.
 */

/**
 * @typedef {object} Stepper
 *
 * `Stepper` is a helper API to run a `Job`' tasks as steps in combination with reporting the
 * `Job`'s progress and result. Using `Stepper` is a convenient and easy way to integrate `Job`(s)
 * with `Workflow` APIs.
 *
 * @property {(name: string, condition: any, fn: () => void) => void} addStep Add a step to the
 * stepper.
 * @property {() => object[]} run Run the stepper, essentially run all the steps added to the
 * stepper.
 */

/**
 * Create a `Stepper` object.
 *
 * @param {object} opts Options.
 * @param {Progress} opts.progress A `Progress` object for the `Stepper` to report its progress.
 * @returns {Stepper} The `Stepper` object.
 */
export default function createStepper(opts = {}) {
  const { progress } = { ...createStepper.defaultOpts, ...opts };
  const steps = [];

  // The stepper's addStep.
  const addStep = (name, condition, fn) => {
    steps.push({ name, condition, fn });
  };

  // The stepper's run.
  const run = () => {
    const effectiveSteps = steps.filter((val) => (
      isFunction(val.condition) ? val.condition() : val.condition
    ));

    const total = effectiveSteps.length;
    const results = [];

    effectiveSteps.forEach((step, index) => {
      progress.description = `${step.name} (${index + 1}/${total})`;

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
};
