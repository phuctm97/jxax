const path = require('path');

/**
 * Helper function infers Webpack `alias`(es) from `jsconfig.json` `compilerOptions.baseUrl` and
 * `compilerOptions.paths`.
 *
 * @param {string} jsconfigPath Path to the `jsconfig.json` (can be either relative or absolute
 * path).
 * @return {object} The Webpack `alias`(es).
 */
module.exports = (jsconfigPath = './jsconfig.json') => {
  const jsconfig = require(jsconfigPath);
  const { paths, baseUrl } = jsconfig.compilerOptions;

  return Object.fromEntries(Object.entries(paths)
    .filter(([, pathValues]) => pathValues.length > 0)
    .map(([pathKey, pathValues]) => {
      const key = pathKey.replace('/*', '');
      const value = path.resolve(path.dirname(jsconfigPath),
        baseUrl, pathValues[0].replace('/*', ''));
      return [key, value];
    }));
};
