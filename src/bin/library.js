import applySysPrefsGeneralSettings, { validateSysPrefsGeneralSettings } from '@apps/sysprefs/general';
import applySysPrefsDockSettings, { validateSysPrefsDockSettings } from '@apps/sysprefs/dock';

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
  'sysprefs.configureGeneral': action(validateSysPrefsGeneralSettings, applySysPrefsGeneralSettings),
  'sysprefs.configureDock': action(validateSysPrefsDockSettings, applySysPrefsDockSettings),
};

export default library;
