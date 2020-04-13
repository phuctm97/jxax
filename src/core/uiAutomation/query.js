import { isNil } from 'lodash';

/**
 * Return an error message indicating a query object is invalid.
 *
 * @param {string} q The query object's name.
 * @returns {string} The error message.
 */
export function invalidQuery(q) {
  return `${q} must be either an integer or a string or an object.`;
}

/**
 * Check if an object is a valid query object.
 *
 * @param {(number|string|object)} obj The object to check.
 * @returns {boolean} Whether the object is a valid query object.
 */
export function isValidQuery(obj) {
  return typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'object';
}

/**
 * Build a query on a target object applying `q` and `opts`. If `q` is a string then `byName` query
 * is built, if `q` is a number then `at` query is built, if `q` is a `{id: '...'}` object then
 * `byId` query is built, otherwise `q` must be an object and `whose` query is built along with
 * `opts.preQ` and `opts.postQ`.
 *
 * @param {object} target The target object to build query onto.
 * @param {(number|string|object)} q The query object.
 * @param {object} opts Options.
 * @param {object} opts.preQ The query object to be populated before building the query, has less
 * precedence than `q` and `opts.postQ`.
 * @param {object} opts.postQ The query object to populatated after building the query, has more
 * precedence than `q` and `opts.preQ`.
 * @returns {object} The result query.
 */
export default function query(target, q, { preQ, postQ } = {}) {
  switch (typeof q) {
    case 'number':
      return target.at(q);
    case 'string':
      return target.byName(q);
    case 'object':
      if (!isNil(q.id)) return target.byId(q.id);
      return target.whose({ ...preQ, ...q, ...postQ })[0];
    default:
      throw new TypeError(invalidQuery('query.q'));
  }
}
