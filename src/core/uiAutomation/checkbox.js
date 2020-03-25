import { retry } from '@core/app';
import query from '@core/uiAutomation/query';

/**
 * Select and set value of a checkbox element.
 *
 * @param {object} parent The checkbox's parent object.
 * @param {(number|string|object)} q The query to the checkbox.
 * @param {boolean} val The value to set.
 */
export default function selectCheckbox(parent, q, val) {
  return retry(() => {
    const checkbox = query(parent.checkboxes, q);

    // Check if the value is already set.
    const currVal = checkbox.value() !== 0;
    if (currVal === val) return;

    checkbox.actions.byName('AXPress').perform();
  });
}
