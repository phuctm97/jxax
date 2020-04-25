/**
 * The JXA core application module exports APIs for accessing the current OSA application running
 * the script, other scriptable applications and builtin JXA functions.
 */

/**
 * @typedef {object} FilePath The OSA file path object.
 *
 * When you need to interact with files, such as a document in `TextEdit.app`, you will need a file
 * path object, not just a string with a path in it. You can use the `Path` constructor to
 * instantiate file paths.
 *
 * @property {() => string} toString Get the string value of the file path.
 */

/**
 * @typedef {[number, number, number]} Color A list of three integers, each from 0 to 65535,
 * representing red, green, and blue color components.
 */

/**
 * The current OSA application is running the script (most likely is `osascript`).
 */
const app = global.Application.currentApplication();
app.strictPropertyScope = true;
app.strictCommandScope = true;
app.strictParameterType = true;

export default app;

/**
 * Get access to a scriptable application.
 *
 * @description
 * Alias of `global.Application` function.
 *
 * @example
 * access('System Events'); // ~ Application('System Events');
 *
 * @param {(string|number)} appUrl The application's name, bundle ID, path or process ID.
 * @returns {object} The scriptable application's object specifier.
 */
export function access(appUrl) {
  return global.Application(appUrl);
}

/**
 * Instantiate a file path object from a file path string.
 *
 * @description
 * Alias of `global.Path` function.
 *
 * @example
 * path('/path/to/a/file'); // ~ Path('/path/to/a/file/');
 *
 * @param {string} url The file path string.
 * @returns {FilePath} The file path object.
 */
export function path(url) {
  return global.Path(url);
}

/**
 * Pause for a fixed amount of time.
 *
 * @description
 * Alias of `global.delay` function.
 *
 * @param {number} secs The number of seconds to delay.
 */
export function delay(secs) {
  global.delay(secs);
}

/**
 * Retry a function until it either succeeds or exceeds `opts.maxAttempts`. Between each retry
 * attempt there's a delay of `opts.delayInterval` seconds.
 *
 * @param {() => any} fn The function to attempt.
 * @param {object} opts Options.
 * @param {number} opts.maxAttempts The maximum attempts allowed (first invocation is inclusive)
 * (default is `retry.defaultOpts.maxAttempts = 3`).
 * @param {number} opts.delayInterval The delay in seconds between each retry attempt (default is
 * `retry.defaultOpts.delayInterval = 0.5`).
 * @returns {any} Return(s) of `fn`.
 */
export function retry(fn, opts = {}) {
  const { maxAttempts, delayInterval } = { ...retry.defaultOpts, ...opts };
  let attempts = 0;

  for (;;) {
    attempts += 1;

    try {
      return fn();
    } catch (e) {
      if ((e instanceof TypeError) || (attempts >= maxAttempts)) {
        // Error is of type TypeEror or it exceeds max attempts, throw the error and fail.
        // TypeError is thrown directly without retrying as TypeError is mostly non-retriable.
        throw e;
      }
      delay(delayInterval);
    }
  }
}

/**
 * Retry default options.
 */
retry.defaultOpts = {
  maxAttempts: 3,
  delayInterval: 0.5,
};

// Import 'Foundation' in advance for `print` to access 'Foundation' APIs.
ObjC.import('Foundation');

/**
 * Print to standard output.
 *
 * @param  {...any} args Arguments.
 */
export function print(...args) {
  args.forEach((a) => {
    $.NSFileHandle.fileHandleWithStandardOutput.writeData(
      $.NSString.alloc.initWithString(`${String(a)}\n`)
        .dataUsingEncoding($.NSNEXTSTEPStringEncoding),
    );
  });
}
