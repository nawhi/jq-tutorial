import { Progress } from './Progress';
import * as fs from 'fs';
import * as path from 'path';
import * as async from 'async';
import { Output } from './Output';
import { runOne } from './runOne';

require('colors');

export const BASE_PATH = path.resolve(__dirname, '..');

const PROGRESS_FILE_PATH = path.resolve(BASE_PATH, '_progress.json');

export default function (
  lessonToRun = process.argv[process.argv.length - 1],
  stdout = new Output(process.stdout),
  stdin = process.stdin
) {
  const progress = new Progress(PROGRESS_FILE_PATH);

  function runLesson(problem, callback) {
    async.map(
      [
        path.resolve(BASE_PATH, 'problems', problem, 'README.md'),
        path.resolve(BASE_PATH, 'problems', problem, 'problem.json'),
      ],
      fs.readFile,
      function (err, results) {
        if (err) throw err;
        const problems = JSON.parse(results[1]);

        stdout.clearScreen();

        // Print README
        stdout.write(results[0]);
        stdout.write(
          'type "data?" to see dataset or "help?" for more options'
        );

        // do problem
        async.mapSeries(problems, runOne(stdin, stdout), callback);
      }
    );
  }

  return new Promise((resolve, reject) => {
    const path1 = path.join(BASE_PATH, 'problems', 'menu.json');
    fs.readFile(path1, function (err, result) {
      const lesson = lessonToRun,
        problems = JSON.parse(result);

      const success = function (lesson) {
        stdout.write(
          [
            '\n \u2605'.yellow +
              ' "' +
              lesson +
              '" completed with a gold star!',
          ].join('\n') + '\n\n'
        );
        progress.save(lesson);
        resolve();
      };

      const usage = function () {
        stdout.write(
          ['Run jq-tutorial with one of the following arguments:']
            .concat(
              problems.map(
                p =>
                  ' ' +
                  (progress.isCompleted(p) ? '✔'.green : '*') +
                  ' ' +
                  p
              )
            )
            .join('\n') + '\n\n'
        );
      };

      if (problems.indexOf(lesson) === -1) {
        usage();
      } else {
        runLesson(lesson, function (err) {
          if (err) throw err;
          success(lesson);
        });
      }
    });
  });
}
