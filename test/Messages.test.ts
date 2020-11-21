import test from 'ava';
import { Problem } from '../src/Problem';
import { Messages } from '../src/Messages';
import { bold, green, red, white, yellow } from 'colors/safe';

test('formats problem description', t => {
  const p: Problem = {
    prompt: 'Do a thing',
    dataset: 'my-dataset',
    solution: '.',
  };

  t.deepEqual(
    Messages.problem(p),
    `${white(bold('Given: '))}   'my-dataset' (type "data?" to view)\n` +
    `${white(bold('Challenge: '))}Do a thing\n\n`
  );
});

test('formats error message', t => {
  t.deepEqual(Messages.error('oh no'), red('oh no'));
});

test('formats correct answer', t => {
  t.deepEqual(
    Messages.correct('[]'),
    `\n\nYou said: \n\n${green('[]')}\n\n ${Messages.TICK} Correct! \n`
  );
});

test('formats incorrect answer with expected answer', t => {
  const expected = '{\n"foo":"bar"\n}';
  const actual = '{}';

  t.deepEqual(
    Messages.incorrect(expected, actual),
    `\nExpected:\n${green(expected)}\n\n\n` +
    `Your answer:\n${yellow(actual)}\n\n`
  );
});
