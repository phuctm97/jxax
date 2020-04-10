import { isObject, isSafeInteger, isString } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';

export default function selectPopUpButton(parent, query, val) {
  if (isDevelopment()) {
    if (!isObject(query) && !isSafeInteger(query)) {
      throw new Error(`${nameOf({ query })} must be either an object or an integer.`);
    }
    if (!isString(val)) throw new Error(`${nameOf({ val })} must be a string.`);
  }

  return retry(() => {
    const popUp = typeof query === 'number'
      ? parent.popUpButtons.at(query)
      : parent.popUpButtons.whose(query)[0];

    if (popUp.value() === val) return;

    popUp.actions.byName('AXShowMenu').perform();
    popUp.menus.at(0).menuItems.byName(val).actions.byName('AXPress').perform();
  });
}
