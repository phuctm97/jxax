export default function radio(parent, index) {
  const q = parent.radioGroups[index];
  return {
    get: () => q.radioButtons.whose({ value: 1 })[0].name(),
    set: (value) => q.radioButtons.whose({ name: value })[0].actions.AXPress.perform(),
  };
}
