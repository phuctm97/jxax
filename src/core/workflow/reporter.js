import {
  isObject, isFunction, isBoolean, isUndefined,
} from 'lodash';
import { isDevelopment } from '@utils';
import * as ansi from 'ansi-escape-sequences';
import { delay } from '@core/app';

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

// Effect options.
const SPINNER_CHARS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SPINNER_FORMAT = 'cyan';
const CONTROL_CHARS = ansi.cursor.previousLine() + ansi.erase.display();
const FINISH_CHARS = {
  default: '•',
  [JobStatuses.SUCCEEDED]: '✔',
  [JobStatuses.FAILED]: '✖',
  [JobStatuses.WARNING]: '⚠',
};
const FINISH_FORMATS = {
  default: 'grey',
  [JobStatuses.SUCCEEDED]: ['green', 'bold'],
  [JobStatuses.FAILED]: ['red', 'bold'],
  [JobStatuses.WARNING]: ['yellow', 'bold'],
};
const DEFAULT_RUNNING_DESCRIPTION = 'running, please wait...';
const DEFAULT_FINISH_DESCRIPTIONS = {
  default: 'finished',
  [JobStatuses.SUCCEEDED]: 'done',
  [JobStatuses.FAILED]: 'failed',
  [JobStatuses.WARNING]: 'finished ungracefully',
};
const DEFAULT_JOB_FORMAT = 'bold';
const HIGHLIGHT_JOB_FORMAT = ['bold', 'underline'];
const DEFAULT_DESCRIPTION_FORMAT = 'grey';
const DELAY = 0.05;

/**
 * Create a console reporter, which reports workflows' progresses to the console or terminal it's
 * attached to (stderr is used by default).
 *
 * @param {object} opts Options.
 * @param {boolean} opts.color Whether report in colorful format.
 * @returns {Reporter} A console reporter.
 */
export function createConsoleReporter(opts = {}) {
  if (isDevelopment()) { // Validate arguments.
    if (!isObject(opts)) throw new TypeError('createConsoleReporter.opts must be an object.');
    if (!isUndefined(opts.color) && !isBoolean(opts.color)) {
      throw new TypeError('createConsoleReporter.opts.color must be a boolean.');
    }
  }

  // Extract options.
  const { color } = { ...createConsoleReporter.defaultOpts, ...opts };

  // The reporter's variables.
  let jobsCounter = 0;
  let currentJob;
  let spinning = 0;

  // Format messages with colors and styles.
  const format = (str, fmt) => {
    if (!color) return str;
    return ansi.format(str, fmt);
  };

  // Build a message from a job's name and description, accept empty values, in which case default
  // values are used.
  const getMessage = ({ name, description }, { highlight } = {}) => {
    const job = format(name ?? `Job ${jobsCounter}`, highlight ? HIGHLIGHT_JOB_FORMAT : DEFAULT_JOB_FORMAT);
    const desc = format(description ?? DEFAULT_RUNNING_DESCRIPTION, DEFAULT_DESCRIPTION_FORMAT);
    return `${job}: ${desc}`;
  };

  // Build a message from a job's result detail.
  const getDetailMessage = ({
    type, job, argument, message,
  }) => {
    switch (type) {
      case ResultDetailTypes.VALIDATION_ERROR: {
        const finishChar = format(
          FINISH_CHARS[JobStatuses.FAILED],
          FINISH_FORMATS[JobStatuses.FAILED],
        );
        const jobF = format(`${job}:`, 'grey');
        const argF = format(argument, ['red', 'underline']);
        const msgF = format(message, 'red');
        return `${finishChar} ${jobF}${argF} ${msgF}`;
      }
      default: {
        const finishChar = format(FINISH_CHARS.default, FINISH_FORMATS.default);
        return `${finishChar} ${message}`;
      }
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

    // Close the current job.
    currentJob = null;

    // Print the job's finish line.
    const finishChar = format(
      FINISH_CHARS[status] ?? FINISH_CHARS.default,
      FINISH_FORMATS[status] ?? FINISH_FORMATS.default,
    );
    console.log(`${CONTROL_CHARS}${finishChar} ${getMessage({ name, description })}`);

    if (details) {
      // If the job reported its result details, print those details.
      details.forEach((detail, index) => {
        const boxChar = format(index < details.length - 1 ? '┝' : '┕', ['grey']); // Nice box-drawing.
        console.log(`${boxChar} ${getDetailMessage(detail)}`);
      });
    }
  };

  // The reporter's newJob.
  const newJob = (job = {}) => {
    // End the current job if there's one in run.
    if (currentJob) endJob();

    // Update current job and counter.
    currentJob = job;
    jobsCounter += 1;

    // Get next spinner char and increase the spinning counter.
    const spinner = format(SPINNER_CHARS[spinning % SPINNER_CHARS.length], SPINNER_FORMAT);
    spinning += 1;

    // Print a new line reporting the new job.
    console.log(`${spinner} ${getMessage(job, { highlight: true })}`);
    delay(DELAY); // Delay shortly for visualization purpose.
  };

  // The reporter's updateJob.
  const updateJob = (job = {}) => {
    // Update the current job.
    currentJob = { ...currentJob, ...job };

    // Get next spinner char and increase the spinning counter.
    const spinner = format(SPINNER_CHARS[spinning % SPINNER_CHARS.length], SPINNER_FORMAT);
    spinning += 1;

    // Update the job's line.
    console.log(`${CONTROL_CHARS}${spinner} ${getMessage(currentJob, { highlight: true })}`);
    delay(DELAY); // Delay shortly for visualization purpose.
  };

  return { newJob, updateJob, endJob };
}

/**
 * Create console reporter default options.
 */
createConsoleReporter.defaultOpts = {
  color: true,
};

/**
 * Default console reporter.
 */
const defaultReporter = createConsoleReporter();

export default defaultReporter;
