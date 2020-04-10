import { isObject, isSafeInteger, isBoolean } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';

export default function selectCheckbox(parent, query, val) {
  if (isDevelopment()) {
    if (!isObject(query) && !isSafeInteger(query)) {
      throw new Error(`${nameOf({ query })} must be either an object or an integer.`);
    }
    if (!isBoolean(val)) throw new Error(`${nameOf({ val })} must be a boolean.`);
  }

  return retry(() => {
    const checkbox = typeof query === 'number'
      ? parent.checkboxes.at(query)
      : parent.checkboxes.whose(query)[0];

    const currVal = checkbox.value() !== 0;
    if (currVal === val) return;

    checkbox.actions.byName('AXPress').perform();
  });
}
