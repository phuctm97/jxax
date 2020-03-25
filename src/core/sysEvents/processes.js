/**
 * Processes Suite: Terms and Events for controlling Processes.
 * See `Script Editor.app/Library/System Events/Processes Suite`.
 */

import sysEvents from '@core/sysEvents/app';

/**
 * Get access to a process running on this computer.
 *
 * @param {string} processUrl The process's name or ID.
 * @returns {object} The process's object specifier.
 */
export function accessProcess(processUrl) {
  return sysEvents.processes[processUrl];
}

/**
 * Get access to a process launched from an application file.
 *
 * @param {string} appUrl The application's name, bundle ID, path or process ID.
 * @returns {object} The application process's object specifier.
 */
export function accessApplicationProcess(appUrl) {
  return sysEvents.applicationProcesses[appUrl];
}
