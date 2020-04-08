/**
 * The OSA application that is running the script (OSAScript).
 */
const app = Application.currentApplication();
app.strictPropertyScope = true;
app.strictCommandScope = true;
app.strictParameterType = true;

export default app;

/**
 * Get access to a scriptable application.
 *
 * @param {string} url The application's name, bundle ID, path or process ID.
 * @returns {object} The scriptable application's object specifier.
 */
export function access(url) {
  return Application(url);
}

/**
 * Pause for a fixed amount of time.
 *
 * @param {number} secs The number of seconds to delay.
 */
export function delay(secs) {
  global.delay(secs);
}
