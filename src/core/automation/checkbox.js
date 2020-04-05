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
