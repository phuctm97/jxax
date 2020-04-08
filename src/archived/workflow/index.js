import {
  isFunction, isSafeInteger, isNumber, isNil, isBoolean,
} from 'lodash';
import { nameOf } from 'jxax/util';
import { delay } from 'jxax/core/app';
import {
  MIN_ATTEMPTS, MAX_ATTEMPTS, MIN_DELAY, MAX_DELAY,
} from 'jxax/archived/workflow/options';

export default class WorkflowBuilder {
  constructor() {
    this.begins = [];
    this.ends = [];
    this.runs = [];
    this.retryOpts = null;
    this.ignoreErrorOpt = false;
  }

  begin(fn) {
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
    this.begins.unshift(fn);
    return this;
  }

  end(fn) {
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
    this.ends.push(fn);
    return this;
  }

  run(fn) {
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
    this.runs.push(fn);
    return this;
  }

  retry(maxAttempts = 3, delayInternal = 0.5) {
    if (!isSafeInteger(maxAttempts)) throw new Error(`${nameOf({ maxAttempts })} must be a safe integer.`);
    if (maxAttempts <= MIN_ATTEMPTS || maxAttempts >= MAX_ATTEMPTS) {
      throw new Error(`${nameOf({ maxAttempts })} must be a greater than ${MIN_ATTEMPTS} and less than ${MAX_ATTEMPTS}.`);
    }
    if (!isNumber(delayInternal)) throw new Error(`${nameOf({ delayInternal })} must be a number.`);
    if (delayInternal <= MIN_DELAY || delayInternal >= MAX_DELAY) {
      throw new Error(`${nameOf({ delayInternal })} must be a greater than ${MIN_DELAY} and less than ${MAX_DELAY}.`);
    }

    this.retryOpts = { maxAttempts, delayInternal };
    return this;
  }

  ignoreError(ignoreError = true) {
    if (!isBoolean(ignoreError)) throw new Error(`${nameOf({ ignoreError })} must be a boolean`);
    this.ignoreErrorOpt = ignoreError;
    return this;
  }

  build() {
    return (...args) => {
      let attempts = 0;

      for (;;) {
        attempts += 1;

        try {
          this.begins.forEach((fn) => fn(...args));
          this.runs.forEach((fn) => fn(...args));
          this.ends.forEach((fn) => fn(...args));
          break;
        } catch (e) {
          let retry = false;
          if (!isNil(this.retryOpts)) {
            if (attempts <= this.retryOpts.maxAttempts) {
              retry = true;
              delay(this.retryOpts.delayInternal);
            }
          }

          if (!retry) {
            if (!this.ignoreErrorOpt) throw e;
            break;
          }
        }
      }
    };
  }
}
