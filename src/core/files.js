import { app } from 'jxax/core/standardAdditions';

export function read(...args) {
  return app.read(...args);
}

export function another() {
  throw new Error('Not implemented');
}
