import { createAction } from '@core/workflow';
import * as sysprefs from '@apps/sysprefs';

/**
 * The library of usable `Action`(s).
 */
const library = {
  'sysprefs.configureGeneral': createAction(sysprefs.validateConfigureGeneral, sysprefs.configureGeneral),
  'sysprefs.configureDock': createAction(sysprefs.validateConfigureDock, sysprefs.configureDock),
};

export default library;
