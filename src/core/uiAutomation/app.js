import {
  isFunction, isString, isSafeInteger, isNil, isUndefined,
} from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import { access, retry } from 'jxax/core/app';
import { accessApplicationProcess } from 'jxax/core/processes';

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
