/**
 * Select a pop up element for getting and setting its value.
 *
 * @param {object} parent The pop up's parent object specifier.
 * @param {string} name The pop up's name.
 * @returns {{get: () => string; set: (val: string) => void}} A getter and a setter for the
 * pop up's value.
 */
export default function popUpButton(parent, name) {
  const q = parent.popUpButtons[name];
  return {
    get: () => q.value(),
    set: (value) => {
      q.actions.AXShowMenu.perform();
      q.menus[0].menuItems[value].actions.AXPress.perform();
    },
  };
}
