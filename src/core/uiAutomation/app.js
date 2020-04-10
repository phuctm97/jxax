import {
  isFunction, isString, isSafeInteger, isUndefined, isNil,
} from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';
import { access } from 'jxax/core/app';
import { accessApplicationProcess } from 'jxax/core/processes';

export default function runInApp(appId, fn) {
  if (isDevelopment()) {
    if (!isString(appId) && !isSafeInteger(appId)) throw new Error(`${nameOf({ appId })} must be either a string or an integer.`);
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
  }

  let app;
  let process;
  let window;

  retry(() => {
    app = access(appId);
    app.activate();
  });

  retry(() => {
    process = accessApplicationProcess(appId);
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
