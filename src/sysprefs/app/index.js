import { isFunction, isString, isEmpty } from 'lodash';
import { isDevelopment, nameOf } from '@utils';
import { retry } from '@core/app';
import runInApp from '@core/uiAutomation';

/**
 * Invoke a function within System Preferences application by activating the application and
 * navigating to a certain pane (if provided) beforing invoking the function, then quitting the
 * application after the function's invocation is finished. The function receives the application,
 * the application's process and first window as its first argument.
 *
 * @param {string} pane The system preferences pane to be navigated to before executing the
 * function. Can be ommited be providing '', navigating to a pane step will be skipped.
 * @param {() => any} fn The function to execute.
 * @returns {any} Returns of fn.
 */
export default function runInSystemPrefs(pane, fn) {
  if (isDevelopment()) {
    if (!isString(pane)) throw new Error(`${nameOf({ pane })} must be a string.`);
    if (!isFunction(fn)) throw new Error(`${nameOf({ fn })} must be a function.`);
  }

  return runInApp('System Preferences', (context) => {
    if (!isEmpty(pane)) {
      retry(() => {
        const { app } = context;
        app.currentPane = app.panes.byName(pane);
      });
    }

    return fn(context);
  });
}
