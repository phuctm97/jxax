/**
 * The console reporter module exports a `Reporter` implementation which reports `Workflow`(s)'
 * progresses to the console or terminal to which the application is currently attached.
 */

import { isUndefined, capitalize } from 'lodash';
import * as ansi from 'ansi-escape-sequences';
import { JobStatuses, ResultDetailTypes } from '@core/workflow/reporter';

/**
 * @typedef {import('@core/workflow/reporter').Reporter} Reporter
 */

// Effect options.
const SPINNER_CHARS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SPINNER_FORMAT = 'cyan';
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
const DEFAULT_JOB_FORMAT = 'bold';
const HIGHLIGHT_JOB_FORMAT = ['bold', 'underline'];
const DEFAULT_RUNNING_DESCRIPTION = 'running, please wait...';
const DEFAULT_FINISH_DESCRIPTIONS = {
  default: 'finished',
  [JobStatuses.SUCCEEDED]: 'done',
  [JobStatuses.FAILED]: 'failed',
  [JobStatuses.WARNING]: 'finished ungracefully',
};
const DESCRIPTION_FORMATS = {
  default: 'grey',
  [JobStatuses.SUCCEEDED]: 'green',
  [JobStatuses.FAILED]: 'red',
  [JobStatuses.WARNING]: 'yellow',
};

// Helper function beautifies messages.
function beautifyMessage(message) {
  let m = capitalize(message);
  if (!m.endsWith('.')) m += '.';
  return m;
}

// Helper function breaks a paragraph into lines that don't exceed `max` columns.
function breakParagraph(paragraph, max, { padding, prefixLength } = { padding: '', prefixLength: 0 }) {
  if (prefixLength > max) throw new TypeError('breakParagraph.prefixLength must be smaller than breakParagraph.max.length.');
  if (padding.length >= max) throw new TypeError('breakParagraph.padding must be shorter than breakParagraph.max.');
  if (prefixLength + paragraph.length <= max) return [paragraph, prefixLength + paragraph.length];

  let p = '';
  let lastPrefixLength = 0;
  const paddedMax = max - padding.length;
  let firstStep = true;
  let lastIndex = 0;

  for (;;) {
    if (firstStep && prefixLength === max) {
      firstStep = false;
    }
    if (!firstStep) {
      p += `\n${padding}`;
      if (lastIndex + paddedMax >= paragraph.length) {
        const lastPart = paragraph.substring(lastIndex);
        p += lastPart;
        lastPrefixLength = padding.length + lastPart.length;
        break;
      }
    }

    const nextPart = paragraph.substring(lastIndex,
      lastIndex + (firstStep ? max - prefixLength : paddedMax) + 1);
    const lastSpaceIndex = nextPart.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
      p += `${nextPart.substring(0, nextPart.length - 1)}`;
      lastIndex += nextPart.length - 1;
    } else {
      p += nextPart.substring(0, lastSpaceIndex);
      lastIndex += lastSpaceIndex + 1;
    }

    firstStep = false;
  }

  return [p, lastPrefixLength];
}

// Helper function gets number of columns in the current console/terminal.
function getConsoleColumns() {
  // Import `Foundation` to be able use `NSTask`.
  ObjC.import('Foundation');

  // Launch `NSTask` `tput cols` to get number of cols.
  const { pipe } = $.NSPipe;
  const file = pipe.fileHandleForReading;
  const task = $.NSTask.alloc.init;

  task.launchPath = '/bin/sh';
  task.arguments = ['-c', 'tput cols'];
  task.standardOutput = pipe;

  (() => task.launch)(); // Run the task.

  let data = file.readDataToEndOfFile; // Read the task's output.
  (() => file.closeFile)();

  // Parse the task's output.
  data = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
  const result = ObjC.unwrap(data); // Unwrap `NSString`.
  return parseInt(result, 10);
}

/**
 * Create a console `Reporter`, which reports `Workflow`(s)' progresses to the console or terminal
 * the application is currently attached to. All outputs are printed to `stderr`, not `stdout`.
 *
 * @param {object} opts Options.
 * @param {boolean} opts.color Report in colorful or plain text format?
 * @returns {Reporter} The `Reporter`.
 */
export default function createConsoleReporter(opts = {}) {
  const { color } = { ...createConsoleReporter.defaultOpts, ...opts };
  let cols = 80; // Default console columns.

  // The reporter's variables.
  let jobsCounter = 0;
  let currentJob;
  let spinning = 0;
  let previousLines = 0;

  // Format messages with colors and styles.
  const format = (str, fmt) => {
    if (!color) return str;
    return ansi.format(str, fmt);
  };

  // Build a message from a job's name and description, accept empty values, in which case default
  // values are used.
  const getMessage = ({ name, description }, { highlight, status } = {}) => {
    const [job, jobPrefixLength] = breakParagraph(name ?? `Job ${jobsCounter}`, cols,
      { padding: '  ', prefixLength: 2 });
    const jobF = format(job, highlight ? HIGHLIGHT_JOB_FORMAT : DEFAULT_JOB_FORMAT);
    const [colon, jobColonPrefixLength] = breakParagraph(': ', cols,
      { padding: '  ', prefixLength: jobPrefixLength });
    const [desc] = breakParagraph(description ?? DEFAULT_RUNNING_DESCRIPTION, cols,
      { padding: '  ', prefixLength: jobColonPrefixLength });
    const descF = format(desc, DESCRIPTION_FORMATS[status] ?? DESCRIPTION_FORMATS.default);
    return `${jobF}${colon}${descF}`;
  };

  // Build a message from a job's result detail.
  const getDetailMessage = ({
    type, step, succeeded, job, argument, message, error,
  }) => {
    switch (type) {
      case ResultDetailTypes.VALIDATION_ERROR: {
        const finishChar = format(
          FINISH_CHARS[JobStatuses.FAILED],
          FINISH_FORMATS[JobStatuses.FAILED],
        );
        const jobF = format(job, [DESCRIPTION_FORMATS.default, 'italic']);
        const colonF = format(':', DESCRIPTION_FORMATS.default);
        const argF = format(argument, [DESCRIPTION_FORMATS[JobStatuses.FAILED], 'underline', 'bold']);
        const msgF = format(message, DESCRIPTION_FORMATS[JobStatuses.FAILED]);
        return `${finishChar} ${jobF}${colonF}${argF} ${msgF}`;
      }
      default: {
        if (isUndefined(step) || isUndefined(succeeded)) {
          return undefined; // Unknown detail, skip it.
        }

        let finishChar;
        let msgF;
        if (succeeded) {
          finishChar = format(
            FINISH_CHARS[JobStatuses.SUCCEEDED],
            FINISH_FORMATS[JobStatuses.SUCCEEDED],
          );
          msgF = `${format(beautifyMessage(step), DESCRIPTION_FORMATS.default)}`;
        } else {
          finishChar = format(FINISH_CHARS[JobStatuses.FAILED], FINISH_FORMATS[JobStatuses.FAILED]);
          msgF = `${
            format(capitalize(step), [DESCRIPTION_FORMATS[JobStatuses.FAILED], 'underline'])}${
            format(': ', DESCRIPTION_FORMATS.default)}${
            format(beautifyMessage(error), DESCRIPTION_FORMATS[JobStatuses.FAILED])
          }`;
        }
        return `${finishChar} ${msgF}`;
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
    const controlChars = ansi.cursor.previousLine(previousLines) + ansi.erase.display();
    const finishChar = format(
      FINISH_CHARS[status] ?? FINISH_CHARS.default,
      FINISH_FORMATS[status] ?? FINISH_FORMATS.default,
    );
    console.log(`${controlChars}${finishChar} ${getMessage({ name, description }, { status })}`);

    if (details) {
      // If the job reported its result details, print those details.
      details.forEach((detail, index) => {
        const message = getDetailMessage(detail);
        if (!message) return; // Unknow result detail, can not format as message, skip it.

        const boxChar = format(index < details.length - 1 ? '┝' : '┕', FINISH_FORMATS.default); // Nice box-drawing.
        console.log(`${boxChar} ${message}`);
      });
    }
  };

  // The reporter's newJob.
  const newJob = (job = {}) => {
    // Update console columns.
    cols = getConsoleColumns();

    // End the current job if there's one in run.
    if (currentJob) endJob();

    // Update current job and counter.
    currentJob = job;
    jobsCounter += 1;

    // Get next spinner char and increase the spinning counter.
    const spinner = format(SPINNER_CHARS[spinning % SPINNER_CHARS.length], SPINNER_FORMAT);
    spinning += 1;

    // Print a new line reporting the new job.
    const message = getMessage(job, { highlight: true });
    previousLines = message.split('\n').length; // Track previous lines to erase in next print.
    console.log(`${spinner} ${message}`);
  };

  // The reporter's updateJob.
  const updateJob = (job = {}) => {
    // Update the current job.
    currentJob = { ...currentJob, ...job };

    // Get next spinner char and increase the spinning counter.
    const controlChars = ansi.cursor.previousLine(previousLines) + ansi.erase.display();
    const spinner = format(SPINNER_CHARS[spinning % SPINNER_CHARS.length], SPINNER_FORMAT);
    spinning += 1;

    // Update the job's line.
    const message = getMessage(currentJob, { highlight: true });
    previousLines = message.split('\n').length; // Track previous lines to erase in next print.
    console.log(`${controlChars}${spinner} ${message}`);
  };

  // The reporter's close.
  const close = () => {
    // Do nothing.
  };

  return {
    newJob, updateJob, endJob, close,
  };
}

/**
 * Create console reporter default options.
 */
createConsoleReporter.defaultOpts = {
  color: true,
};
