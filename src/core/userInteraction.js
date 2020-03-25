import { app } from 'jxax/core/standardAdditions';

export function chooseFile(...args) {
  return app.chooseFile(...args);
}

export function delay(...args) {
  app.delay(...args);
}

export function displayAlert(...args) {
  app.displayAlert(...args);
}

export function displayDialog(...args) {
  app.displayDialog(...args);
}

export function displayNotification(...args) {
  app.displayNotification(...args);
}

export function say(...args) {
  app.say(...args);
}
