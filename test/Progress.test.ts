import test from 'ava';
import { Progress } from '../src/Progress';
import * as path from 'path';
import sinon = require('sinon');

test('assumes no progress if passed nonexistent file', t => {
  const progress = new Progress('./nonexistent.txt');
  t.false(progress.isCompleted('anything'));
});

test('no progress if file contains empty array', t => {
  const progress = new Progress(EMPTY_PROGRESS_FILE);
  t.false(progress.isCompleted('anything'));
});
test('matches lesson if it was in the progress file', t => {
  const progress = new Progress(FULL_PROGRESS_FILE);
  t.true(progress.isCompleted('completed'));
});

test('does not match lesson that was not in the progress file', t => {
  const progress = new Progress(FULL_PROGRESS_FILE);
  t.false(progress.isCompleted('not-completed'));
});

test('writes a new lesson to the file at the given path', t => {
  const writeSpy = sinon.spy();
  const progress = new Progress('./nonexistent.txt', writeSpy);
  progress.save('my-lesson');
  t.true(writeSpy.calledWith('./nonexistent.txt', ['my-lesson']));
});

test('does not save duplicate lessons', t => {
  const writeSpy = sinon.spy();
  const progress = new Progress(FULL_PROGRESS_FILE, writeSpy);
  progress.save('completed');
  t.true(writeSpy.notCalled);
});

test('does not overwrite lessons already saved', t => {
  const writeSpy = sinon.spy();
  const progress = new Progress(FULL_PROGRESS_FILE, writeSpy);
  progress.save('completed-2');
  t.true(writeSpy.calledWith(FULL_PROGRESS_FILE, ["completed", "completed-2"]));
});

const FULL_PROGRESS_FILE = path.resolve(
  __dirname,
  './fixtures/full-progress.json'
);

const EMPTY_PROGRESS_FILE = path.resolve(
  __dirname,
  './fixtures/empty-progress.json'
);
