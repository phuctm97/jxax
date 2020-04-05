import { isString, isObject } from 'lodash';
import { nameOf } from 'jxax/util';
import { accessApp } from 'jxax/core';
import { accessApplicationProcess } from 'jxax/core/processes';

export default function createAppWorkflowBuilder(app) {
  let accessibleApp;
  if (isString(app)) accessibleApp = accessApp(app);
  else if (isObject(app)) accessibleApp = app;
  else throw new Error(`${nameOf({ app })} must be a string or an object.`);

  return (workflow) => (...args) => {
    // activation.
    const name = accessibleApp.name();
    accessibleApp.activate();

    const context = {
      name,
      app: accessibleApp,
      process: accessApplicationProcess(name),
    };

    // run.
    const result = workflow(context, ...args);

    // deactivation.
    accessibleApp.quit();

    return result;
  };
}
