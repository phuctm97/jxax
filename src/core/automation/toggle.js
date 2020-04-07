/**
 * Select a toggle element for getting and setting its value.
 *
 * @param {object} parent The toggle's parent object specifier.
 * @param {string[]} choices The toggle's choices.
 * @returns {{get: () => string; set: (val: string) => void}} A getter and a setter for the
 * toggle's value.
 */
export default function toggle(parent, choices) {
  const q = (opts) => parent.checkboxes.whose({
    subrole: 'AXToggle',
    _or: choices.map((name) => ({ name })),
    ...opts,
  })[0];

  return {
    get: () => q({ value: 1 }).name(),
    set: (value) => q({ name: value }).actions.AXPress.perform(),
  };
}
