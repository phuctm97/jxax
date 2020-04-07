import { isString, isObject } from 'lodash';
import { nameOf } from 'jxax/util';
import { access } from 'jxax/core/app';
import { accessApplicationProcess } from 'jxax/core/processes';

/**
 * Create an application workflow builder.
 *
 * @param {string} app The application's name.
 * @returns {() => () => any} A workflow builder for building workflow within the
 * scope of the application.
 */
export default function createAppWorkflowBuilder(app) {
  let accessibleApp;
  if (isString(app)) accessibleApp = access(app);
  else if (isObject(app)) accessibleApp = app;
  else throw new Error(`${nameOf({ app })} must be a string or an object.`);

  return (workflow) => (...args) => {
    // Activation.
    const name = accessibleApp.name();
    accessibleApp.activate();

    const context = {
      name,
      app: accessibleApp,
      process: accessApplicationProcess(name),
    };

    // Run.
    const result = workflow(context, ...args);

    // Deactivation.
    accessibleApp.quit();

    return result;
  };
}
