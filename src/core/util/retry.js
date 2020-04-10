import { isFunction, isObject, isNil } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';

export const DEFAULT_RETRY_MAX_ATTEMPTS = 3;
export const DEFAULT_RETY_DELAY_INTERVAL = 0.5;

const defaultOpts = {
  maxAttempts: DEFAULT_RETRY_MAX_ATTEMPTS,
  delayInterval: DEFAULT_RETY_DELAY_INTERVAL,
};

export default function retry(fn, opts = {}) {
  if (isDevelopment()) {
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
    if (!isObject(opts) && !isNil(opts)) throw new Error(`${nameOf({ opts })} must be either an object or nullish (use defaults).`);
  }

  const { maxAttempts, delayInterval } = { ...defaultOpts, ...opts };
  let attempts = 0;

  for (;;) {
    attempts += 1;

    try {
      return fn();
    } catch (e) {
      if (attempts >= maxAttempts) {
        throw e;
      }
      delay(delayInterval);
    }
  }
}
