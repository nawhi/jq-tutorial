import * as _ from 'lodash';

function get(cb, defaultResult) {
  try {
    return cb();
  } catch (e) {
    return defaultResult;
  }
}

export const checkEquivalent = function(expected, actual) {
  return _.isEqual(
    get(() => JSON.parse(expected), expected),
    get(() => JSON.parse(actual), actual)
  );
};
