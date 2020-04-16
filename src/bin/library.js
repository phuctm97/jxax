import { createAction } from '@core/workflow';
import * as sysprefs from '@apps/sysprefs';
import * as desktops from '@apps/desktops';

/**
 * The library of usable `Action`(s).
 */
const library = {
  'sysprefs.configureGeneral': createAction(
    sysprefs.validateConfigureGeneral, sysprefs.configureGeneral,
  ),
  'sysprefs.configureDock': createAction(
    sysprefs.validateConfigureDock, sysprefs.configureDock,
  ),
  'sysprefs.configureMissionControl': createAction(
    sysprefs.validateConfigureMissionControl, sysprefs.configureMissionControl,
  ),
  'desktops.changePicture': createAction(
    desktops.validateChangePicture, desktops.changePicture,
  ),
  'desktops.configureScreenSaver': createAction(
    desktops.validateConfigureScreenSaver, desktops.configureScreenSaver,
  ),
};

export default library;
