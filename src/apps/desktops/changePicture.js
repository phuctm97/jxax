import { retry } from '@core/app';
import sysEvents from '@core/sysEvents';
import { pathTo, Folders, getRealPath } from '@core/files';

function run(args) {
  const { picture } = args;

  retry(() => {
    let pictureAbsPath = picture;

    if (pictureAbsPath.startsWith('~/') || pictureAbsPath.startsWith('./')) {
      // The picture is in home or current folder.
      pictureAbsPath = getRealPath(pictureAbsPath);
    } else if (!pictureAbsPath.startsWith('/')) {
      // The picture is in Apple desktop pictures folder.
      pictureAbsPath = `${pathTo(Folders.DESKTOP_PICTURES)}/${pictureAbsPath}`;

      if (!pictureAbsPath.endsWith('.heic')) { // Default Apple desktop picture extension.
        pictureAbsPath = `${pictureAbsPath}.heic`;
      }
    }

    sysEvents.currentDesktop.picture = pictureAbsPath;
  });
}

/**
 * Change Desktop picture command.
 */
const changePicture = {
  description: 'Change current Desktop picture',
  run,
  args: {
    picture: {
      presence: { allowEmpty: false },
      type: 'string',
      description: 'Path to the new Desktop picture, e.g. ~/Pictures/Wallpaper.jpg, ./images/wallpaper.png, Catalina Rock (default to Apple Desktop pictures)',
    },
  },
};

export default changePicture;
