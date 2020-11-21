import { Problem } from './Problem';
import { bold, green, red, white, yellow } from 'colors/safe';

export interface OutputStream {
  write(message: string): void;
}

export const CLEAR_SCREEN_SEQUENCE = '\u001B[2J\u001B[0;0f';
export const DIVIDER = '\n\n--------------------------------\n\n';
export const HELP_MESSAGE = `Enter your answer or one of the following:
  * help?   show this help message
  * prompt? show the original challenge prompt
  * data?   show the challenge data set

`;
export const TICK = green('✔');

export class Output {
  constructor(private out: OutputStream) {}

  clearScreen() {
    this.out.write(CLEAR_SCREEN_SEQUENCE);
  }

  write(message: string) {
    this.out.write(message);
  }

  writeDivider() {
    this.out.write(DIVIDER);
  }

  writeHelpMessage() {
    this.out.write(HELP_MESSAGE);
  }

  writeError(error: string) {
    this.out.write(red(error));
  }

  writeLine(message: string) {
    this.out.write(message + '\n');
  }

  writeProblem(problem: Problem) {
    this.out.write(
      [
        white(bold('Given: ')) +
          "   '" +
          problem.dataset +
          '\' (type "data?" to view)',
        white(bold('Challenge: ')) + problem.prompt + '\n',
      ].join('\n') + '\n'
    );
  }

  writeCorrect(answer: string) {
    this.out.write(
      `\n\nYou said: \n\n${green(answer)}\n\n ${TICK} Correct! \n`
    );
  }

  writeIncorrect(answer: string, expected: string) {
    const e = green(expected);
    const a = yellow(answer);
    this.out.write(`\nExpected:\n${e}\n\n\nYour answer:\n${a}\n\n`);
  }
}
