export interface OutputStream {
  write(message: string): void;
}

export const CLEAR_SCREEN_SEQUENCE = '\u001B[2J\u001B[0;0f';

export class Output {
  constructor(private out: OutputStream) {}

  clearScreen() {
    this.out.write(CLEAR_SCREEN_SEQUENCE);
  }

  write(message: string) {
    this.out.write(message);
  }
}
