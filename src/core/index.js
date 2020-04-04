const app = Application.currentApplication();
app.strictPropertyScope = true;
app.strictCommandScope = true;
app.strictParameterType = true;

export default app;

export function useApp(appName) {
  return Application(appName);
}
