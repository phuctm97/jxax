import * as desktops from '@apps/desktops';
import * as sysprefs from '@apps/sysprefs';

/**
 * The `jxax` CLI's library of `Command`(s).
 */
const library = {
  'desktops.changePicture': desktops.changePicture,
  'desktops.configureScreenSaver': desktops.configureScreenSaver,
  'sysprefs.configureGeneral': sysprefs.configureGeneral,
  'sysprefs.configureDock': sysprefs.configureDock,
  'sysprefs.configureMissionControl': sysprefs.configureMissionControl,
};

export default library;
