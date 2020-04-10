import { isBoolean } from 'lodash';
import { isDevelopment, nameOf } from '@util';
import { retry } from '@core/app';
import query, { isValidQuery, invalidQuery } from '@core/uiAutomation/query';

export default function selectCheckbox(parent, q, val) {
  if (isDevelopment()) {
    if (!isValidQuery(q)) throw new Error(invalidQuery({ q }));
    if (!isBoolean(val)) throw new Error(`${nameOf({ val })} must be a boolean.`);
  }

  return retry(() => {
    const checkbox = query(parent.checkboxes, q);

    const currVal = checkbox.value() !== 0;
    if (currVal === val) return;

    checkbox.actions.byName('AXPress').perform();
  });
}
