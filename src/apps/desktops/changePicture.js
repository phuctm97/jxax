import { validate } from '@utils';
import { retry } from '@core/app';
import sysEvents from '@core/sysEvents';
import { pathTo, Folders, getRealPath } from '@core/files';

/**
 * @typedef {object} ChangeDesktopPictureArgs Change desktop picture arguments.
 *
 * @property {string} picture Path to the new picture.
 */

// Change desktop arguments contraints.
const constraints = {
  picture: {
    presence: { allowEmpty: false },
    type: 'string',
  },
};

/**
 * Validate change desktop picture arguments.
 *
 * @param {ChangeDesktopPictureArgs} args The arguments.
 */
export function validateChangePicture(args) {
  return validate(args, constraints);
}

/**
 * Change desktop picture.
 *
 * @param {ChangeDesktopPictureArgs} args The arguments
 */
export function changePicture(args) {
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
