import test from 'ava';
import { spy } from 'sinon';
import { CLEAR_SCREEN_SEQUENCE, Output } from '../src/Output';

test('writes a clear-screen sequence', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.clearScreen();

  t.deepEqual(writeSpy.firstCall.firstArg, CLEAR_SCREEN_SEQUENCE);
});

test('writes anything', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write('a message');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message');
})
