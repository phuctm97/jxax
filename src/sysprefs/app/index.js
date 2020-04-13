import { isFunction, isString, isEmpty } from 'lodash';
import { isDevelopment } from '@utils';
import { retry } from '@core/app';
import runInApp from '@core/uiAutomation';

/**
 * Invoke a function within _System Preferences_ application by activating the application and
 * navigating to a certain pane (if provided) beforing invoking the function, then quitting the
 * application after the function's invocation has finished. The function receives the application,
 * the application's process and first window as its first argument (as an object).
 *
 * @param {string} pane The _System Preferences_ pane to navigate to before executing the function.
 * Can be ommited by providing '', navigating to a pane step will be then skipped.
 * @param {() => any} fn The function to invoke.
 * @returns {any} Return(s) of `fn`.
 */
export default function runInSystemPrefs(pane, fn) {
  if (isDevelopment()) { // Validate arguments.
    if (!isString(pane)) throw new TypeError('runInSystemPrefs.pane must be a string.');
    if (!isFunction(fn)) throw new TypeError('runInSystemPrefs.fn must be a function.');
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
