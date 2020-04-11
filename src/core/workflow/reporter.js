import * as ansi from 'ansi-escape-sequences';
import { delay } from '@core/app';

export const JobStatuses = {
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  WARNING: 'warning',
};

export const ResultDetailMessageTypes = {
  JOB_VALIDATION_ERROR: 'job-validation-error',
};

const SPINNER_CHARS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const CONTROL_CHARS = ansi.cursor.previousLine() + ansi.erase.display();
const DELAY = 0.05;

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

export function createConsoleReporter() {
  let jobsCounter = 0;
  let currentJob;
  let spinning = 0;

  const getMessage = ({ name, description }) => `${name ?? `Job ${jobsCounter}`}: ${description ?? DEFAULT_RUNNING_DESCRIPTION}`;

  const getDetailMessage = ({
    type, job, argument, message,
  }) => {
    switch (type) {
      case ResultDetailMessageTypes.JOB_VALIDATION_ERROR:
        return `${FINISH_CHARS[JobStatuses.FAILED]} ${job}:${argument} ${message}`;
      default:
        return `${FINISH_CHARS.default} ${message}`;
    }
  };

  const endJob = (data = {}) => {
    const { status } = data;

    const { name, description, details } = {
      ...currentJob,
      ...{
        description: DEFAULT_FINISH_DESCRIPTIONS[status]
          ?? DEFAULT_FINISH_DESCRIPTIONS.default,
      },
      ...data,
    };
    currentJob = null;

    console.log(`${CONTROL_CHARS}${FINISH_CHARS[status] ?? FINISH_CHARS.default} ${getMessage({ name, description })}`);

    if (details) {
      details.forEach((detail, index) => {
        const boxChar = index < details.length - 1 ? '┝' : '┕';
        console.log(`${boxChar} ${getDetailMessage(detail)}`);
      });
    }
  };

  const newJob = (job = {}) => {
    if (currentJob) endJob();
    currentJob = job;
    jobsCounter += 1;

    const spinner = SPINNER_CHARS[spinning % SPINNER_CHARS.length];
    spinning += 1;

    console.log(`${spinner} ${getMessage(job)}`);
    delay(DELAY);
  };

  const updateJob = (job = {}) => {
    currentJob = { ...currentJob, ...job };

    const spinner = SPINNER_CHARS[spinning % SPINNER_CHARS.length];
    spinning += 1;

    console.log(`${CONTROL_CHARS}${spinner} ${getMessage(currentJob)}`);
    delay(DELAY);
  };

  return { newJob, updateJob, endJob };
}

/**
 * Default console reporter.
 */
const consoleReporter = createConsoleReporter();

export default consoleReporter;
