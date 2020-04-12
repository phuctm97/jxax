import { isNil } from 'lodash';

/**
 * Returns an error message indicating a query object is invalid.
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
 * @param {(number|string|object)} q The query object.
 * @returns {boolean} Whether the query object is valid.
 */
export function isValidQuery(q) {
  return typeof q === 'number' || typeof q === 'string' || typeof q === 'object';
}

/**
 * Build a query on a target object applying q and opts object. If q is a string then `byName`
 * query is built, if q is a number then `at` query is built, if q is a `{id: '...'}` object then
 * `byId` query is built, otherwise q must be an object and `whose` query is built along with
 * opts.preQ and opts.postQ.
 *
 * @param {object} target The target object to build query onto.
 * @param {(number|string|object)} q The query object.
 * @param {object} opts Options.
 * @param {object} opts.preQ The query object to be populated before building the query, the main
 * query object will override common values (if any).
 * @param {object} opts.postQ The query object to populatated after building the query, this query
 * object will override all common values with q and opts.preQ (if any).
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
      throw new Error(invalidQuery('query.q'));
  }
}
