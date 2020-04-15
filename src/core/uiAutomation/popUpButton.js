import { retry } from '@core/app';
import query from '@core/uiAutomation/query';

/**
 * Select and set value of a pop up button element.
 *
 * @param {object} parent The pop up button's parent object.
 * @param {(number|string|object)} q The query to the pop up button.
 * @param {string} val The value to set.
 */
export default function selectPopUpButton(parent, q, val) {
  return retry(() => {
    const popUp = query(parent.popUpButtons, q);

    // Check if value is already set.
    if (popUp.value() === val) return;

    // Show pop up menu and select the `value` item.
    popUp.actions.byName('AXShowMenu').perform();
    popUp.menus.at(0).menuItems.byName(val).actions.byName('AXPress').perform();
  });
}
