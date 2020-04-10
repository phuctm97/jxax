import { isString } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import { retry } from 'jxax/core/app';
import query, { isValidQuery, invalidQuery } from 'jxax/core/uiAutomation/query';

export default function selectPopUpButton(parent, q, val) {
  if (isDevelopment()) {
    if (!isValidQuery(q)) throw new Error(invalidQuery({ q }));
    if (!isString(val)) throw new Error(`${nameOf({ val })} must be a string.`);
  }

  return retry(() => {
    const popUp = query(parent.popUpButtons, q);
    if (popUp.value() === val) return;

    popUp.actions.byName('AXShowMenu').perform();
    popUp.menus.at(0).menuItems.byName(val).actions.byName('AXPress').perform();
  });
}
