import MockedScriptingModel from 'jxax/core/devtool/scriptingModel';

/**
 * Turn on devtool by injecting mocked scripting model.
 * @param {Object} mocks Mocks
 */
export default function enableDevtool(mocks = {}) {
  const model = new MockedScriptingModel(mocks);

  global.Application = model.createDynamic('Application', { callable: true });

  return model;
}
