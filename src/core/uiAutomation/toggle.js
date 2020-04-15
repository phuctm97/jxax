import { retry } from '@core/app';
import query from '@core/uiAutomation/query';

/**
 * Select a toggle element (set its value to be selected).
 *
 * @param {object} parent The toggle's parent object.
 * @param {(number|string|object)} q The query to the toggle.
 */
export default function selectToggle(parent, q) {
  return retry(() => {
    const toggle = query(parent.checkboxes, q, { postQ: { subrole: 'AXToggle' } });

    // Check if value is already set.
    if (toggle.value() === 1) return;

    toggle.actions.byName('AXPress').perform();
  });
}
