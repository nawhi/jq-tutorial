import { checkEquivalent } from '../dist/checkEquivalent';
import test from 'ava';

const cases: [string, string, boolean][] = [
  ['{}', '{"foo": "bar"}', false],
  ['{"foo": "bar"}', '{"foo": "bar"}', true],
  ['{"foo": "bar"}', 'foobar', false],
  ['{"foo":"bar","baz":"qux"}', '{"baz":"qux","foo":"bar"}', true],
  ['{"foo":  "bar", "baz":"qux"}', '{"foo":"bar","baz":"qux"}', true],
  ['[1,2,3,4]', '[4,3,2,1]', false],
  ['foobar', 'foobar', true],
  ['foobar\nbazqux', 'foobar\nbazqux', true],
];

const escape = (s: string) => s.replace('\n', '\\n');

cases.forEach(([a, b, shouldEqual]) => {
  test(`'${escape(a)}' ${shouldEqual ? "==" : "!="} '${escape(b)}'`, t => {
    t.deepEqual(checkEquivalent(a, b), shouldEqual);
  });
});

test('returns false if given two different JSON strings', t => {
  t.false(checkEquivalent('{}', '{"foo": "bar"}'));
});

test('returns true if given identical JSON strings', t => {
  t.true(checkEquivalent('{"foo": "bar"}', '{"foo": "bar"}'));
});

test('returns false if given one valid and one invalid JSON string', t => {
  t.false(checkEquivalent('{"foo": "bar"}', 'foobar'));
});

test('returns true if given two semantically equivalent JSON strings', t => {
  t.true(
    checkEquivalent(
      '{"foo": "bar", "baz": "qux"}',
      '{"baz": "qux", "foo": "bar"}'
    )
  );
});

test('returns true if given two JSON strings differing only in whitespace', t => {
  t.true(
    checkEquivalent(
      '{"foo":   "bar", "baz":"qux"}',
      '{"foo": "bar","baz": "qux"}'
    )
  );
});

test('returns false if given two arrays in different order', t => {
  t.false(checkEquivalent('[1,2,3,4]', '[4,3,2,1]'));
});

test('returns true if given identical non-JSON strings', t => {
  t.true(checkEquivalent('foobar', 'foobar'));
});
