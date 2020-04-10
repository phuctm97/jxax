import {
  isFunction, isString, isSafeInteger, isNil, isUndefined,
} from 'lodash';
import { isDevelopment, nameOf } from '@util';
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
      throw new Error(`${nameOf({ url })} must be either a string or an integer.`);
    }
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
  }

  let app;
  let process;
  let window;

  retry(() => {
    app = access(url);
    app.activate();
  });

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
