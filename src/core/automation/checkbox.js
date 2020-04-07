/**
 * Select a checkbox element for getting and setting its value.
 *
 * @param {object} parent The checkbox's parent object specifier.
 * @param {string} name The checkbox's name.
 * @returns {{get: () => boolean; set: (val: boolean) => void}} A getter and a setter for the
 * checkbox's value.
 */
export default function checkbox(parent, name) {
  const q = parent.checkboxes[name];
  return {
    get: () => q.value() !== 0,
    set: (value) => {
      if ((q.value() !== 0) === value) return;
      q.actions.AXPress.perform();
    },
  };
}
