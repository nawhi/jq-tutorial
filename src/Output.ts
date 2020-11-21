import { Problem } from './Problem';
import { green } from 'colors/safe';
import { Messages } from './Messages';

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

export class Output {
  constructor(private out: OutputStream) {}

  clearScreen() {
    this.out.write(CLEAR_SCREEN_SEQUENCE);
  }

  write(message: string) {
    this.out.write(message);
  }

  writeDivider() {
    this.out.write(Messages.DIVIDER);
  }

  writeHelpMessage() {
    this.out.write(Messages.HELP);
  }

  writeError(e: string) {
    this.out.write(Messages.error(e));
  }

  writeLine(message: string) {
    this.out.write(message + '\n');
  }

  writeProblem(p: Problem) {
    this.out.write(
      Messages.problem(p)
    );
  }

  writeCorrect(answer: string) {
    this.out.write(Messages.correct(answer));
  }

  writeIncorrect(answer: string, expected: string) {
    this.out.write(Messages.incorrect(expected, answer));
  }
}
