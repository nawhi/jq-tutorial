import { Problem } from './Problem';
import { Messages } from './Messages';

export interface OutputStream {
  write(message: string): void;
}

export class Output {
  constructor(private out: OutputStream) {}

  write(message: string) {
    this.out.write(message);
  }

  writeError(e: string) {
    this.write(Messages.error(e));
  }

  writeProblem(p: Problem) {
    this.write(Messages.problem(p));
  }

  writeCorrect(answer: string) {
    this.write(Messages.correct(answer));
  }

  writeIncorrect(answer: string, expected: string) {
    this.write(Messages.incorrect(expected, answer));
  }
}
