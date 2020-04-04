const app = Application.currentApplication();
app.strictPropertyScope = true;
app.strictCommandScope = true;
app.strictParameterType = true;

export {
  app,
};

export function another() {
  throw new Error('Not implemented');
}
