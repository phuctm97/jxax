/**
 * The files module exports APIs and commands to work with files.
 */

import app from '@core/app';
import { doShellScript } from '@core/addtions';

// The lazily-loaded absolute path to the current working directory.
let CWD;

/**
 * Get absolute path to the current working directory.
 *
 * @returns {string} The abosulute path to the current working directory.
 */
export function cwd() {
  if (!CWD) CWD = doShellScript('pwd');
  return CWD;
}

/**
 * @typedef {import('@core/app').FilePath} FilePath
 */

/**
 * Domains
 *
 * @enum {string}
 */
export const Domains = {
  SYSTEM: 'system domain',
  USER: 'user domain',
  LOCAL: 'local domain',
};

/**
 * Folders.
 *
 * @enum {object}
 */
export const Folders = {
  HOME: { name: 'home folder' },
  DESKTOP_PICTURES: { name: 'desktop pictures folder', from: Domains.SYSTEM },
};

/**
 * Return the full path to the specified folder.
 *
 * @param {Folders} folder The folder.
 * @returns {FilePath} The path to the specified folder.
 */
export function pathTo(folder) {
  return app.pathTo(folder.name, { from: folder.from ?? Domains.USER, folderCreation: false });
}

/**
 * Get real path to a relative path or home path (absolute path is accepted and returned as is).
 *
 * @param {string} path The relative path.
 * @returns {string} The absolute path.
 */
export function getRealPath(path) {
  if (path.startsWith('/')) return path;
  if (path.startsWith('./')) return `${cwd()}/${path.substring(2)}`;
  if (path.startsWith('~/')) return `${pathTo(Folders.HOME)}/${path.substring(2)}`;
  return `${cwd()}/${path}`;
}
