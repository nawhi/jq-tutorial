require('colors');
const fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  exec = require('child_process').exec,
  _ = require('lodash'),
  async = require('async');

export function runApp(
  lessonToRun = process.argv[process.argv.length - 1],
  stdout = process.stdout,
  stdin = process.stdin,
) {
  function runJq(datafile, str, callback) {
    exec("jq '" + str + "' " + datafile, function (
      err,
      stdout,
      stderr
    ) {
      const errorMessage = err && err.message;
      callback(errorMessage || stderr, stdout);
    });
  }

  function clearscreen() {
    // ref: http://stackoverflow.com/questions/8813142
    stdout.write('\u001B[2J\u001B[0;0f');
  }

  function divider() {
    stdout.write(
      '\n\n--------------------------------\n\n'
    );
  }

  function runOne(problem, callback) {
    const datafile = path.resolve(
      __dirname,
      'data/' + problem.dataset + '.json'
    );
    const solution = problem.solution;

    const dataset = fs.readFileSync(datafile);

    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    });

    const writeAndPrompt = function (what) {
      stdout.write(what + '\n');
      rl.prompt();
    };

    const helpMessage = function () {
      writeAndPrompt(
        [
          'Enter your answer or one of the following:',
          '  * help?   show this help message',
          '  * prompt? show the original challenge prompt',
          '  * data?   show the challenge data set',
        ].join('\n')
      );
    };

    const problemPrompt = function () {
      writeAndPrompt(
        [
          'Given: '.bold.white +
            "   '" +
            problem.dataset +
            '\' (type "data?" to view)',
          'Challenge: '.bold.white + problem.prompt + '\n',
        ].join('\n')
      );
    };

    divider();
    problemPrompt();

    rl.on('line', function (answer) {
      switch (answer) {
        case '?':
        case 'help?':
          helpMessage();
          break;
        case 'prompt?':
          problemPrompt();
          break;
        case 'data?':
          writeAndPrompt(dataset);
          break;
        default:
          async.parallel(
            {
              actual: _.partial(runJq, datafile, answer),
              expected: _.partial(
                runJq,
                datafile,
                solution
              ),
            },
            function (err, results) {
              if (err) {
                stdout.write(err.red);
                return rl.prompt();
              }

              if (
                _.isEqual(results.expected, results.actual)
              ) {
                rl.close();
                callback(null);
              } else {
                stdout.write('\nExpected:\n');
                stdout.write(results.expected.green + '\n');

                stdout.write('\nYour answer:\n');
                stdout.write(results.actual.yellow + '\n');
                rl.prompt();
              }
            }
          );
      }
    });
  }

  function show(problem, callback) {
    async.map(
      [
        path.resolve(
          __dirname,
          'problems',
          problem,
          'README.md'
        ),
        path.resolve(
          __dirname,
          'problems',
          problem,
          'problem.json'
        ),
      ],
      fs.readFile,
      function (err, results) {
        if (err) throw err;
        const problems = JSON.parse(results[1]);

        clearscreen();

        // Print README
        stdout.write(results[0]);
        stdout.write(
          'type "data?" to see dataset or "help?" for more options'
        );

        // do problem
        async.mapSeries(problems, runOne, callback);
      }
    );
  }

  fs.readFile(
    path.resolve(__dirname, 'menu.json'),
    function (err, result) {
      const lesson = lessonToRun,
        problems = JSON.parse(result);

      const success = function (lesson) {
        stdout.write(
          [
            '\u2605'.yellow +
              ' "' +
              lesson +
              '" completed with a gold star!',
          ].join('\n') + '\n\n'
        );
      };

      const usage = function () {
        stdout.write(
          ['Run jq-tutorial with one of the following:']
            .concat(problems)
            .join('\n  * ') + '\n\n'
        );
      };

      if (problems.indexOf(lesson) === -1) {
        usage();
      } else {
        show(lesson, function (err) {
          if (err) throw err;
          success(lesson);
        });
      }
    }
  );
}
