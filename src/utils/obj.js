export function invert(json) {
  const ret = {};
  Object.entries(json).forEach((k, v) => {
    ret[v] = k;
  });
  return ret;
}

export function another() {
  throw new Error('Not implemented');
}
