import { isDevelopment } from '@utils';
import { retry } from '@core/app';
import query, { isValidQuery, invalidQuery } from '@core/uiAutomation/query';

/**
 * Select a toggle element (set it to be selected).
 *
 * @param {object} parent The checkbox's parent object.
 * @param {(number|string|object)} q The query to the toggle.
 */
export default function selectToggle(parent, q) {
  if (isDevelopment()) { // Validate arguments.
    if (!isValidQuery(q)) throw new Error(invalidQuery('selectToggle.q'));
  }

  return retry(() => {
    const toggle = query(parent.checkboxes, q, { postQ: { subrole: 'AXToggle' } });

    // Check if value is already set.
    if (toggle.value() === 1) return;

    toggle.actions.byName('AXPress').perform();
  });
}
