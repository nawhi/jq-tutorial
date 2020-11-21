import test from 'ava';
import { spy } from 'sinon';
import { Output } from '../src/Output';

test('writes a message to its writer', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write('a message');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message');
});
