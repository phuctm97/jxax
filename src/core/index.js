/**
 * OSAScript application.
 */
const app = Application.currentApplication();
app.strictPropertyScope = true;
app.strictCommandScope = true;
app.strictParameterType = true;

export default app;

/**
 * Get access to a scriptable application.
 * @param {String} url Application name, bundle ID, path or process ID
 */
export function accessApp(url) {
  return Application(url);
}

/**
 * Pause for a fixed amount of time.
 * @param {Number} secs The number of seconds to delay
 */
export function delay(secs) {
  app.delay(secs);
}
