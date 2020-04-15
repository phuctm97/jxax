/**
 * @typedef {object} Reporter The `Workflow`'s progress reporter.
 *
 * `Reporter` is designed to be used with `runWorkflow` function. A `Workflow` uses a `Reporter` to
 * report its progress, the `Reporter` renders the `Workflow`'s progress.
 *
 * @property {({name: string, description: string}) => undefined} newJob Report there's a new job.
 * @property {({name: string, description: string}) => undefined} updateJob Update the current
 * job's progress and description.
 * @property {({name: string, description: string}) => undefined} endJob Report that the current
 * job has finished.
 * @property {() => undefined} close Summarize, report results and close the reporter.
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
 * An empty reporter does nothing.
 *
 * @type {Reporter}
 */
export const emptyReporter = {
  newJob: () => undefined,
  updateJob: () => undefined,
  endJob: () => undefined,
  close: () => undefined,
};
