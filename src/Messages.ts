import { bold, green, red, white, yellow } from 'colors/safe';
import { Problem } from './Problem';

export class Messages {
  static CLEAR_SCREEN = '\u001B[2J\u001B[0;0f';
  static DIVIDER = '\n\n--------------------------------\n\n';
  static HELP = `Enter your answer or one of the following:
  * help?   show this help message
  * prompt? show the original challenge prompt
  * data?   show the challenge data set

`;

  static TICK = green('✔');
  static STAR = yellow('★');

  static correct(answer: string) {
    return `\n\nYou said: \n\n${green(answer)}\n\n ${
      this.TICK
    } Correct! \n`;
  }

  static incorrect(expected: string, answer: string) {
    return `\nExpected:\n${green(expected)}\n\n\nYour answer:\n${yellow(
      answer
    )}\n\n`;
  }

  static problem(problem: Problem) {
    return (
      [
        white(bold('Given: ')) +
          "   '" +
          problem.dataset +
          '\' (type "data?" to view)',
        white(bold('Challenge: ')) + problem.prompt + '\n',
      ].join('\n') + '\n'
    );
  }

  static error(error: string) {
    return red(error);
  }

  static lessonCompleted(lesson: string) {
    return `\n ${this.STAR} "${lesson}" completed with a gold star!\n\n`;
  }
}
