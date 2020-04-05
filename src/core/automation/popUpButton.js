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
