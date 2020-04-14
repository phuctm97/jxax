import { isObject, isFunction } from 'lodash';

/**
 * @typedef {object} Reporter A workflow reporter.
 * Reporter is designed to be used with `runWorkflow`, a workflow uses a reporter to report its
 * progress, the reporter renders the workflow's progress.
 *
 * @property {({name: string, description: string}) => undefined} newJob Report there's a new job.
 * @property {({name: string, description: string}) => undefined} updateJob Update the current
 * job's progress and description.
 * @property {({name: string, description: string}) => undefined} endJob Report that the current
 * job has finished.
 */

/**
  * Job statuses.
  *
  * @enum {string}
  */
export const JobStatuses = {
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  WARNING: 'warning',
};

/**
 * Result detail types.
 *
 * @enum {string}
 */
export const ResultDetailTypes = {
  VALIDATION_ERROR: 'validation-error',
};

/**
 * Check if an object is a valid reporter.
 *
 * @param {any} obj The object to check.
 * @returns {boolean} Whether the object is a valid reporter.
 */
export function isReporter(obj) {
  return isObject(obj)
    && isFunction(obj.newJob)
    && isFunction(obj.updateJob)
    && isFunction(obj.endJob);
}

/**
 * An empty reporter does nothing.
 *
 * @type {Reporter}
 */
export const emptyReporter = {
  newJob: () => undefined,
  updateJob: () => undefined,
  endJob: () => undefined,
};
