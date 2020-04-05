import { accessApp } from 'jxax/core';

const { processes, applicationProcesses } = accessApp('System Events');

export {
  processes,
  applicationProcesses,
};

export function accessProcess(name) {
  return processes[name];
}

export function accessApplicationProcess(name) {
  return applicationProcesses[name];
}
