import {
  isObject, isString, isArray, isEmpty, isNil, has,
} from 'lodash';
import { safeLoad as loadYAML, YAMLException } from 'js-yaml';
import { doShellScript, read } from '@core/addtions';

// The lazily-loaded absolute path to the current working directory.
let CWD;

/**
 * Get absolute path to the current working directory.
 *
 * @returns {string} The abosulute path to the current working directory.
 */
function getCwd() {
  if (!CWD) CWD = doShellScript('pwd');
  return CWD;
}

/**
 * Get real path to a relative path (absolute path is accepted and returned as is).
 *
 * @param {string} path The relative path.
 * @returns {string} The absolute path.
 */
function getRealPath(path) {
  if (path.startsWith('/')) return path;
  if (path.startsWith('./')) return `${getCwd()}/${path.substring(2)}`;
  return `${getCwd()}/${path}`;
}

/**
 * Read content of a file from a path (both absolute and relative values are applicable).
 *
 * @param {string} path The path to the file.
 * @returns {string} The file's content.
 */
function readFile(path) {
  try {
    const realpath = getRealPath(path);
    return read(Path(realpath));
  } catch (e) {
    // Translate read error.
    throw new Error(`failed to read '${path}', the file doesn't exist or isn't accessible`);
  }
}

/**
 * Validate a workflow configuration object and return an array of errors or `undefined` if no
 * error found.
 *
 * @param {object} obj The configuration object.
 * @returns {(object[]|undefined)} An array of error messages or `undefined`.
 */
function validateConfig(obj) {
  if (!isObject(obj)) { // Validate root object.
    return ['must be a mapping'];
  }

  // Track all errors.
  const errors = [];

  if (!has(obj, 'jobs')) { // Check for key 'jobs' availabilty.
    errors.push('missing key \'jobs\'');
  } else {
    // Validate 'jobs'.
    const { jobs } = obj;
    if (!isArray(jobs)) {
      errors.push('\'jobs\' must be a list of mapping');
    } else {
      // Validate each job.
      jobs.forEach((job, index) => {
        const jobExpr = `jobs[${index}]`;

        if (!isObject(job)) {
          errors.push(`'${jobExpr}' must be a mapping`);
          return;
        }

        const { uses, args } = job;
        if (!has(job, 'uses')) errors.push(`missing key '${jobExpr}.uses'`);
        else if (!isString(uses) || isEmpty(uses)) errors.push(`'${jobExpr}.uses' must be a non-empty string`);
        if (!isNil(args) && !isObject(args)) errors.push(`'${jobExpr}.args' must be a mapping`);

        Object.keys(job)
          .filter((k) => k !== 'uses' && k !== 'args')
          .forEach((k) => errors.push(`unexpected key '${jobExpr}.${k}'`));
      });
    }
  }

  // Check for unexpected keys in root object.
  Object.keys(obj)
    .filter((k) => k !== 'jobs')
    .forEach((k) => errors.push(`unexpected key '${k}'`));

  return errors;
}

/**
 * @typedef {object} WorkflowConfig The workflow configuration model.
 *
 * @property {JobConfig[]} jobs The workflow's job configuration objects.
 */

/**
 * @typedef {object} JobConfig The job configuration model.
 *
 * @property {string} uses The action to use for the job.
 * @property {object} args The job's arguments.
 */

/**
 * Read, parse, validate and return a workflow configuration object from a YAML file.
 *
 * @param {string} path The path to the YAML file.
 * @returns {WorkflowConfig} The workflow configuration object.
 */
export default function readConfig(path) {
  const content = readFile(path);

  // Try parse `content` as YAML.
  let config;
  try {
    config = loadYAML(content);
  } catch (e) {
    if (e instanceof YAMLException) {
      // Translate YAML error.
      throw new Error(`failed to parse '${path}' as a YAML file, ${e.message}`);
    }
    throw e;
  }

  // Validate parsed configuration object.
  const errors = validateConfig(config);
  if (!isEmpty(errors)) {
    throw new Error(`configuration is invalid: ${errors.join(', ')}`);
  }

  return config;
}
