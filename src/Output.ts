export interface OutputStream {
  write(message: string): void;
}

export const CLEAR_SCREEN_SEQUENCE = '\u001B[2J\u001B[0;0f';
export const DIVIDER = '\n\n--------------------------------\n\n';
export const HELP_MESSAGE =
  `Enter your answer or one of the following:
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
    this.out.write(DIVIDER);
  }

  writeHelpMessage() {
    this.out.write(HELP_MESSAGE);
  }

  writeLine(message: string) {
    this.out.write(message + '\n');
  }
}
