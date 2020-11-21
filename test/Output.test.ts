import test from 'ava';
import { bold, green, red, white, yellow } from 'colors/safe';
import { spy } from 'sinon';
import { Output } from '../src/Output';
import { Messages } from '../src/Messages';

test('writes a clear-screen sequence', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write(Messages.CLEAR_SCREEN);

  t.deepEqual(writeSpy.firstCall.firstArg, Messages.CLEAR_SCREEN);
});

test('writes a divider', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write(Messages.DIVIDER);

  t.deepEqual(writeSpy.firstCall.firstArg, Messages.DIVIDER);
});

test('writes help message', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write(Messages.HELP);

  t.deepEqual(writeSpy.firstCall.firstArg, Messages.HELP);
});

test('writes problem description', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeProblem({
    prompt: 'Do a thing',
    dataset: 'my-dataset',
    solution: '.',
  });

  const expected =
    `${white(bold('Given: '))}   'my-dataset' (type "data?" to view)\n` +
    `${white(bold('Challenge: '))}Do a thing\n\n`;

  t.deepEqual(writeSpy.firstCall.firstArg, expected);
});

test('writes anything with an extra newline', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write('a message' + '\n');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message\n');
});

test('writes error messages in red', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });
  output.writeError('oh no');

  t.deepEqual(writeSpy.firstCall.firstArg, red('oh no'));
});

test('writes anything', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.write('a message');

  t.deepEqual(writeSpy.firstCall.firstArg, 'a message');
});

test('writes correct answer in green', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeCorrect('[]');

  t.deepEqual(
    writeSpy.firstCall.firstArg,
    `\n\nYou said: \n\n${green('[]')}\n\n ${Messages.TICK} Correct! \n`
  );
});

test('writes incorrect answers with expected', t => {
  const writeSpy = spy();
  const output = new Output({ write: writeSpy });

  output.writeIncorrect('{}', '{\n"foo":"bar"\n}');

  const e = green('{\n"foo":"bar"\n}');
  const a = yellow('{}');
  t.deepEqual(
    writeSpy.firstCall.firstArg,
    `\nExpected:\n${e}\n\n\nYour answer:\n${a}\n\n`
  );
});
