import { expect } from 'chai';
import { checkEquivalent } from '../dist/checkEquivalent';

describe('checkEquivalent', () => {
  it('returns false if given two different JSON strings', () => {
    expect(checkEquivalent('{}', '{"foo": "bar"}')).to.be
      .false;
  });

  it('returns true if given identical JSON strings', () => {
    expect(
      checkEquivalent('{"foo": "bar"}', '{"foo": "bar"}')
    ).to.be.true;
  });

  it('returns false if given one valid and one invalid JSON string', () => {
    expect(
      checkEquivalent('{"foo": "bar"}', 'foobar')
    ).to.be.false;
  });

  it('returns true if given two semantically equivalent JSON strings', () => {
    expect(checkEquivalent('{"foo": "bar", "baz": "qux"}', '{"baz": "qux", "foo": "bar"}'))
  });

  it('returns true if given two JSON strings differing only in whitespace', () => {
    expect(checkEquivalent('{"foo":   "bar", "baz":"qux"}', '{"foo": "bar","baz": "qux"}')).to.be.true;
  });

  it('returns false if given two arrays in different order', () => {
    expect(checkEquivalent('[1,2,3,4]', '[4,3,2,1]')).to.be.false;
  });

  it('returns true if given identical non-JSON strings', () => {
    expect(
      checkEquivalent('foobar', 'foobar')
    ).to.be.true;
  });
});
