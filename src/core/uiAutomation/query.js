import { nameOf } from 'jxax/util';

export function invalidQuery(q) {
  return `${nameOf(q)} must be either an integer or a string or an object.`;
}

export function isValidQuery(q) {
  return typeof q === 'number' || typeof q === 'string' || typeof q === 'object';
}

export default function query(target, q, { preQ, postQ } = {}) {
  switch (typeof q) {
    case 'number':
      return target.at(q);
    case 'string':
      return target.byName(q);
    case 'object':
      if (q.id !== undefined && q.id !== null) return target.byId(q.id);
      return target.whose({ ...preQ, ...q, ...postQ })[0];
    default:
      throw new Error(invalidQuery({ q }));
  }
}
