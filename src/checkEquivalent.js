const _ = require('lodash');

function get(cb, defaultResult) {
  try {
    return cb();
  } catch (e) {
    return defaultResult;
  }
}

module.exports = function (expected, actual) {
  return _.isEqual(
    get(() => JSON.parse(expected), expected),
    get(() => JSON.parse(actual), actual)
  );
};
