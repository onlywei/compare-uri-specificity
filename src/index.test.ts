import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { compareUriSpecificity } from './index.js';

describe('compareUriSpecificity', () => {
  it('compares URIs with different segment lengths', () => {
    assert.equal(compareUriSpecificity('/foo/bar', '/foo'), -1);
    assert.equal(compareUriSpecificity('/foo', '/foo/bar'), 1);
    assert.equal(compareUriSpecificity('/a/b/c', '/x/y'), -1);
  });

  it('handles equal length URIs with different specificities', () => {
    assert.equal(compareUriSpecificity('/foo/bar', '/foo/*'), -1);
    assert.equal(compareUriSpecificity('/foo/*', '/foo/bar'), 1);
  });

  it('handles URIs with equal specificity', () => {
    assert.equal(compareUriSpecificity('/foo/bar', '/foo/baz'), 0);
    assert.equal(compareUriSpecificity('/foo/*/bar', '/foo/*/baz'), 0);
  });

  it('handles trailing slashes correctly', () => {
    assert.equal(compareUriSpecificity('/foo/', '/foo'), 0);
    assert.equal(compareUriSpecificity('/foo///', '/foo'), 0);
  });

  it('compares partial segment matches correctly', () => {
    assert.equal(compareUriSpecificity('/foo', '/food'), 1);
    assert.equal(compareUriSpecificity('/food', '/foo'), -1);
  });

  it('throws error for invalid URIs', () => {
    assert.throws(() => compareUriSpecificity('foo//bar', '/foo'), /Invalid URI format/);
    assert.throws(() => compareUriSpecificity('/foo', 'foo//bar'), /Invalid URI format/);
  });

  it('throws error for non-string inputs', () => {
    // @ts-expect-error Testing invalid input type
    assert.throws(() => compareUriSpecificity(null, '/foo'), /URI must be a string/);
    // @ts-expect-error Testing invalid input type
    assert.throws(() => compareUriSpecificity('/foo', undefined), /URI must be a string/);
  });
});
