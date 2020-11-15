import test from 'ava';
import { spy } from 'sinon';
import { CLEAR_SCREEN_SEQUENCE, DIVIDER, HELP_MESSAGE, Output } from '../src/Output';

test('writes a clear-screen sequence', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.clearScreen();

  t.deepEqual(writeSpy.firstCall.firstArg, CLEAR_SCREEN_SEQUENCE);
});

test('writes a divider', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeDivider();

  t.deepEqual(writeSpy.firstCall.firstArg, DIVIDER);
})

test('writes help message', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeHelpMessage();

  t.deepEqual(writeSpy.firstCall.firstArg, HELP_MESSAGE);
})

test('writes anything with an extra newline', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeLine('a message');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message\n');
})

test('writes anything', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write('a message');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message');
})
