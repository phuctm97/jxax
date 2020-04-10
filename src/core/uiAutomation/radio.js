import { isObject, isSafeInteger } from 'lodash';
import { isDevelopment, nameOf } from 'jxax/util';
import retry from 'jxax/core/util/retry';

export default function selectRadio(parent, groupQuery, buttonQuery) {
  if (isDevelopment()) {
    if (!isObject(groupQuery) && !isSafeInteger(groupQuery)) {
      throw new Error(`${nameOf({ groupQuery })} must be either an object or an integer.`);
    }
    if (!isObject(buttonQuery) && !isSafeInteger(buttonQuery)) {
      throw new Error(`${nameOf({ buttonQuery })} must be either an object or an integer.`);
    }
  }

  return retry(() => {
    const radioGroup = (typeof groupQuery === 'number')
      ? parent.radioGroups.at(groupQuery)
      : parent.radioGroups.whose(groupQuery)[0];

    const radioButton = (typeof buttonQuery === 'number')
      ? radioGroup.radioButtons.at(buttonQuery)
      : radioGroup.radioButtons.whose(buttonQuery)[0];

    if (radioButton.value() === 1) return;

    radioButton.actions.byName('AXPress').perform();
  });
}
