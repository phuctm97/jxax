/**
 * Select a radio (group) element for getting and setting its value.
 *
 * @param {object} parent The radio's parent object specifier.
 * @param {number} index The radio's index in its parent.
 * @returns {{get: () => string; set: (val: string) => void}} A getter and a setter for the
 * radio's value.
 */
export default function radio(parent, index) {
  const q = parent.radioGroups[index];
  return {
    get: () => q.radioButtons.whose({ value: 1 })[0].name(),
    set: (value) => q.radioButtons.whose({ name: value })[0].actions.AXPress.perform(),
  };
}
