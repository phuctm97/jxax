import { isObject } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';

export const _ = undefined;

export function selectToggle(parent, query) {
  if (isDevelopment()) {
    if (!isObject(query)) throw new Error(`${nameOf({ query })} must be an object.`);
  }

  return retry(() => parent.checkboxes
    .whose({
      subrole: 'AXToggle',
      ...query,
    })[0]
    .actions.byName('AXPress').perform());
}
