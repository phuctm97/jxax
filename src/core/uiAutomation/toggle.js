import { isObject, isSafeInteger } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';

export default function selectToggle(parent, query) {
  if (isDevelopment()) {
    if (!isObject(query) && !isSafeInteger(query)) {
      throw new Error(`${nameOf({ query })} must be either an object or an integer.`);
    }
  }

  return retry(() => {
    const toggle = parent.checkboxes.whose({
      subrole: 'AXToggle',
      ...query,
    })[0];

    if (toggle.value() === 1) return;

    toggle.actions.byName('AXPress').perform();
  });
}
