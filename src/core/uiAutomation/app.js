import {
  isFunction, isString, isSafeInteger, isNil, isUndefined,
} from 'lodash';
import { isDevelopment } from '@utils';
import { access, retry } from '@core/app';
import { accessApplicationProcess } from '@core/processes';

/**
 * Invoke a function within an application by activating the application beforing invoking the
 * function and quitting the application after the function's invocation is finished. The function
 * receives the application, the application's process and first window as its first argument.
 *
 * @param {(string|number)} url The application's name, bundle ID, path or process ID.
 * @param {({app: object, process: object, window: object}) => any} fn The function to invoke.
 * @returns {any} Returns of fn.
 */
export default function runInApp(url, fn) {
  if (isDevelopment()) {
    if (!isString(url) && !isSafeInteger(url)) {
      throw new Error('runInApp.url must be either a string or an integer.');
    }
    if (!isFunction(fn)) throw new Error('runInApp.fn must be a function.');
  }

  let app;
  let process;
  let window;

  // Try activate the application.
  retry(() => {
    app = access(url);
    app.activate();
  });

  // Try access the application's process and first window (0th).
  retry(() => {
    process = accessApplicationProcess(url);
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
