import path from 'path';
import fs from 'fs';
import readline from 'readline';
import * as async from 'async';
import * as _ from 'lodash';
import { runJq } from './runJq';
import { checkEquivalent } from './checkEquivalent';
import { BASE_PATH } from './app';

export function runOne(input, output) {
  return (problem, callback) => {
    const datafile = path.resolve(
      BASE_PATH,
      'data/' + problem.dataset + '.json',
    );
    const solution = problem.solution;

    const dataset = fs.readFileSync(datafile);

    const rl = readline.createInterface({
      input: input,
      output: output,
    });

    output.writeDivider();
    output.writeProblem(problem);
    rl.prompt();

    rl.on('line', function(answer) {
      switch (answer) {
        case '?':
        case 'help?':
          output.writeHelpMessage();
          rl.prompt();
          break;
        case 'prompt?':
          output.writeProblem(problem);
          rl.prompt();
          break;
        case 'data?':
          output.write(dataset.toString());
          rl.prompt();
          break;
        default:
          async.parallel(
            {
              actual: _.partial(runJq, datafile, answer),
              expected: _.partial(runJq, datafile, solution),
            },
            function(err, { actual, expected }) {
              if (err) {
                output.write(err.red);
                return rl.prompt();
              }
              if (checkEquivalent(expected, actual)) {
                output.write(
                  '\n\nYou said: \n\n' +
                  actual.green +
                  '\n\n ✔'.green +
                  ' Correct! ' +
                  '\n',
                );
                rl.close();
                callback(null);
              } else {
                output.write('\nExpected:\n');
                output.write(expected.green + '\n');

                output.write('\nYour answer:\n');
                output.write(actual.yellow + '\n');

                rl.prompt();
              }
            },
          );
      }
    });
  };
}
