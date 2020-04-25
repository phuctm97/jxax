import * as desktops from '@apps/desktops';
import * as sysprefs from '@apps/sysprefs';

/**
 * The `jxax` CLI's library of `Command`(s).
 */
const library = {
  'desktops.changePicture': desktops.changePicture,
  'desktops.configureScreenSaver': desktops.configureScreenSaver,
  'sysprefs.configureDock': sysprefs.configureDock,
};

export default library;
