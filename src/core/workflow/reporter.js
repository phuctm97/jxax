import { isObject, isFunction } from 'lodash';
import * as ansi from 'ansi-escape-sequences';
import { delay } from '@core/app';

/**
 * @typedef {object} Reporter A workflow reporter.
 *
 * @property {({name: string, description: string}) => undefined} newJob Report there's a new job.
 * @property {({name: string, description: string}) => undefined} updateJob Update the current
 * job's progress or description.
 * @property {({name: string, description: string}) => undefined} endJob Report current job
 * finished.
 */


/**
 * Check if an object is a valid reporter or not.
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
 * Result detail message types.
 *
 * @enum {string}
 */
export const ResultDetailMessageTypes = {
  VALIDATION_ERROR: 'validation-error',
};

// Effect options.
const SPINNER_CHARS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const CONTROL_CHARS = ansi.cursor.previousLine() + ansi.erase.display();
const FINISH_CHARS = {
  default: '•',
  [JobStatuses.SUCCEEDED]: '✔',
  [JobStatuses.FAILED]: '✖',
  [JobStatuses.WARNING]: '⚠',
};
const DEFAULT_RUNNING_DESCRIPTION = 'running, please wait...';
const DEFAULT_FINISH_DESCRIPTIONS = {
  default: 'finished',
  [JobStatuses.SUCCEEDED]: 'done',
  [JobStatuses.FAILED]: 'failed',
  [JobStatuses.WARNING]: 'finished ungracefully',
};
const DELAY = 0.05;

/**
 * Create a console reporter.
 *
 * @returns {Reporter} The created reporter.
 */
export function createConsoleReporter() {
  let jobsCounter = 0;
  let currentJob;
  let spinning = 0;

  // Build a message from a job's name and description, accept empty values, in which case default
  // values are used.
  const getMessage = ({ name, description }) => `${name ?? `Job ${jobsCounter}`}: ${description ?? DEFAULT_RUNNING_DESCRIPTION}`;

  // Build a message from a job's result detail.
  const getDetailMessage = ({
    type, job, argument, message,
  }) => {
    switch (type) {
      case ResultDetailMessageTypes.VALIDATION_ERROR:
        return `${FINISH_CHARS[JobStatuses.FAILED]} ${job}:${argument} ${message}`;
      default:
        return `${FINISH_CHARS.default} ${message}`;
    }
  };

  // The reporter's endJob.
  const endJob = (data = {}) => {
    // Extract status to compute job's result data in the next step.
    const { status } = data;

    // Compute job's result data, combine with appropriate default values.
    const { name, description, details } = {
      ...currentJob,
      ...{
        description: DEFAULT_FINISH_DESCRIPTIONS[status]
          ?? DEFAULT_FINISH_DESCRIPTIONS.default,
      },
      ...data,
    };

    // Close current job.
    currentJob = null;

    // Print job's finish line.
    console.log(`${CONTROL_CHARS}${FINISH_CHARS[status] ?? FINISH_CHARS.default} ${getMessage({ name, description })}`);

    if (details) {
      // If result details are provided, print them.
      details.forEach((detail, index) => {
        const boxChar = index < details.length - 1 ? '┝' : '┕'; // Nice box-drawing.
        console.log(`${boxChar} ${getDetailMessage(detail)}`);
      });
    }
  };

  // The reporter's newJob.
  const newJob = (job = {}) => {
    // End current job if there's one in run.
    if (currentJob) endJob();

    // Update current job and counter.
    currentJob = job;
    jobsCounter += 1;

    // Get next spinner char and increase spinning counter.
    const spinner = SPINNER_CHARS[spinning % SPINNER_CHARS.length];
    spinning += 1;

    // Print a new line reporting the new job.
    console.log(`${spinner} ${getMessage(job)}`);
    delay(DELAY); // Delay shortly for visualization purpose.
  };

  // The reporter's updateJob.
  const updateJob = (job = {}) => {
    // Update current job.
    currentJob = { ...currentJob, ...job };

    // Get next spinner char and increase spinning counter.
    const spinner = SPINNER_CHARS[spinning % SPINNER_CHARS.length];
    spinning += 1;

    // Update the job's line.
    console.log(`${CONTROL_CHARS}${spinner} ${getMessage(currentJob)}`);
    delay(DELAY); // Delay shortly for visualization purpose.
  };

  return { newJob, updateJob, endJob };
}

/**
 * Default console reporter.
 */
const defaultReporter = createConsoleReporter();

export default defaultReporter;
