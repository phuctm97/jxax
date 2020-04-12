import { isDevelopment } from '@utils';
import { retry } from '@core/app';
import query, { isValidQuery, invalidQuery } from '@core/uiAutomation/query';

/**
 * Select a radio button (set it to be selected) in a radio group.
 *
 * @param {object} parent The checkbox's parent object.
 * @param {(number|string|object)} groupQ The query to the radio group.
 * @param {(number|string|object)} buttonQ The query to the radio button within the radio group.
 */
export default function selectRadio(parent, groupQ, buttonQ) {
  if (isDevelopment()) { // Validate arguments.
    if (!isValidQuery(groupQ)) throw new Error(invalidQuery('selectRadio.groupQ'));
    if (!isValidQuery(buttonQ)) throw new Error(invalidQuery('selectRadio.buttonQ'));
  }

  return retry(() => {
    const radioGroup = query(parent.radioGroups, groupQ);
    const radioButton = query(radioGroup.radioButtons, buttonQ);

    // Check if value is already set.
    if (radioButton.value() === 1) return;

    radioButton.actions.byName('AXPress').perform();
  });
}
