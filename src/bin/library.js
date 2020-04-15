import * as sysprefs from '@apps/sysprefs';

/**
 * Create an usable action.
 *
 * @param {() => undefined} validate The action's validate function.
 * @param {() => undefined} run The action's run function.
 */
function action(validate, run) {
  return { validate, run };
}

/**
 * The library of usable actions.
 */
const library = {
  'sysprefs.configureGeneral': action(sysprefs.validateConfigureGeneral, sysprefs.configureGeneral),
  'sysprefs.configureDock': action(sysprefs.validateConfigureDock, sysprefs.configureDock),
};

export default library;
