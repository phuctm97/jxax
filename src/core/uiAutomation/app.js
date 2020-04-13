import {
  isFunction, isString, isSafeInteger, isNil, isUndefined,
} from 'lodash';
import { IS_DEV } from '@utils';
import { access, retry } from '@core/app';
import { accessApplicationProcess } from '@core/processes';

/**
 * Invoke a function within an application's scope by activating the application before invoking
 * the function and quitting the application after the function's invocation has finished. The
 * function receives the application, the application's process and first window as its first
 * argument (as an object).
 *
 * @param {(string|number)} appUrl The application's name, bundle ID, path or process ID.
 * @param {({app: object, process: object, window: object}) => any} fn The function to invoke.
 * @returns {any} Return(s) of `fn`.
 */
export default function runInApp(appUrl, fn) {
  if (IS_DEV) { // Validate arguments.
    if (!isString(appUrl) && !isSafeInteger(appUrl)) {
      throw new TypeError('runInApp.appUrl must be either a string or an integer.');
    }
    if (!isFunction(fn)) {
      throw new TypeError('runInApp.fn must be a function.');
    }
  }

  let app;
  let process;
  let window;

  // Try activate the application.
  retry(() => {
    app = access(appUrl);
    app.activate();
  });

  // Try access the application's process and first window (0th).
  retry(() => {
    process = accessApplicationProcess(appUrl);
    window = process.windows.at(0);
  });

  let res;
  let err;
  try {
    res = fn({ app, process, window });
  } catch (e) {
    err = e;
  }

  if (!isNil(app)) {
    // If the application is activated, try quit the application before returning or throwing the
    // function's invocation error.
    try {
      app.quit();
    } catch (e) {
      // Ignore quit error.
    }
  }

  if (!isUndefined(err)) {
    throw err;
  }

  return res;
}
