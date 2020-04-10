import { access } from '@core/app';

// Get access to `processes` and `applicationProcesses` from `System Events` application.
const { processes, applicationProcesses } = access('System Events');

/**
 * Get access to a process running on this computer.
 *
 * @param {string} name The process's name.
 * @returns {object} The process's object specifier.
 */
export function accessProcess(name) {
  return processes[name];
}

/**
 * Get access to a process launched from an application file.
 *
 * @param {string} name The application's name.
 * @returns {object} The application process's object specifier.
 */
export function accessApplicationProcess(name) {
  return applicationProcesses[name];
}
