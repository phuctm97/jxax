import * as desktops from '@apps/desktops';
import * as sysprefs from '@apps/sysprefs';

/**
 * The `jxax` CLI's library of `Command`(s).
 */
const library = {
  'sysprefs.configureGeneral': sysprefs.configureGeneral,
  'sysprefs.configureDock': sysprefs.configureDock,
  'sysprefs.configureMissionControl': sysprefs.configureMissionControl,
  'sysprefs.configureSpotlight': sysprefs.configureSpotlight,
  'desktops.changePicture': desktops.changePicture,
  'desktops.configureScreenSaver': desktops.configureScreenSaver,
};

export default library;
