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
