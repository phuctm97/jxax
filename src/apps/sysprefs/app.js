import { retry } from '@core/app';
import runInApp from '@core/uiAutomation';

/**
 * Invoke a function within _System Preferences_ application by activating the application and
 * navigating to a certain pane before invoking the function, then quitting the application after
 * the function's invocation has finished. The function receives the application, the application's
 * process and its first window as the first argument (as an object).
 *
 * @param {string} pane The _System Preferences_ pane to navigate to before invoking the function,
 * can be omited (`undefined` or `null` or `''`), navigation will be then skipped.
 * @param {() => any} fn The function to invoke.
 * @returns {any} Return(s) of `fn`.
 */
export default function runInSysPrefs(pane, fn) {
  return runInApp('System Preferences', (context) => {
    if (pane) {
      retry(() => {
        const { app } = context;
        app.currentPane = app.panes.byName(pane);
      });
    }

    return fn(context);
  });
}
