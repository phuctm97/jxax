import { retry } from '@core/app';
import query from '@core/uiAutomation/query';

/**
 * Select a radio button (set its value to be selected) in a radio group.
 *
 * @param {object} parent The radio group's parent object.
 * @param {(number|string|object)} groupQ The query to the radio group.
 * @param {(number|string|object)} buttonQ The query to the radio button within the radio group.
 */
export default function selectRadio(parent, groupQ, buttonQ) {
  return retry(() => {
    const radioGroup = query(parent.radioGroups, groupQ);
    const radioButton = query(radioGroup.radioButtons, buttonQ);

    // Check if value is already set.
    if (radioButton.value() === 1) return;

    radioButton.actions.byName('AXPress').perform();
  });
}
