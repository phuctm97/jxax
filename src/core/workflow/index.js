import { isNil } from 'lodash';
import consoleReporter, { JobStatuses, ResultDetailMessageTypes } from '@core/workflow/reporter';

export * from '@core/workflow/reporter';
export { default as consoleReporter } from '@core/workflow/reporter';

const Strings = {
  VALIDATE_CONFIGURATIONS: 'core.validateConfigurations',
  NO_JOB_CONFIGURED: 'no job configured',
};

export function createJob(name, validate, run, args) {
  return {
    name,
    validate: () => validate(args),
    run: (opts) => run(args, opts),
  };
}

export default function runWorkflow(jobs, { reporter } = { reporter: consoleReporter }) {
  if (reporter) {
    reporter.newJob({
      name: Strings.VALIDATE_CONFIGURATIONS,
    });
  }

  if (jobs.length === 0) {
    if (reporter) {
      reporter.endJob({
        status: JobStatuses.FAILED,
        description: Strings.NO_JOB_CONFIGURED,
      });
    }
    return false;
  }

  const errors = [];

  jobs.forEach((job) => {
    if (!job.validate) return;

    if (reporter) {
      reporter.updateJob({
        description: job.name,
      });
    }

    const jobErrors = job.validate();
    if (isNil(jobErrors)) return;

    Object.entries(jobErrors).forEach(([arg, errs]) => {
      errors.push(...errs.map((err) => ({
        type: ResultDetailMessageTypes.JOB_VALIDATION_ERROR,
        job: job.name,
        argument: arg,
        message: err,
      })));
    });
  });

  if (errors.length > 0) {
    if (reporter) {
      reporter.endJob({
        status: JobStatuses.FAILED,
        details: errors,
      });
    }
    return false;
  }

  if (reporter) {
    reporter.endJob({ status: JobStatuses.SUCCEEDED });
  }


  let result = true;
  jobs.forEach((job) => {
    if (reporter) {
      reporter.newJob({
        name: job.name,
      });
    }

    const progress = {
      set description(description) {
        if (!reporter) return;
        reporter.updateJob({ name: job.name, description });
      },
    };

    try {
      job.run({ progress });

      if (reporter) {
        reporter.endJob({
          status: JobStatuses.SUCCEEDED,
        });
      }
    } catch (err) {
      result = false;

      if (reporter) {
        reporter.endJob({
          status: JobStatuses.FAILED,
          description: err.message,
        });
      }
    }
  });

  return result;
}
