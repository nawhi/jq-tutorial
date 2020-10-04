var fs = require('fs'),
  path = require('path'),
  readline = require('readline'),
  exec = require('child_process').exec,
  _ = require('lodash'),
  colors = require('colors'),
  async = require('async');

function run(datafile, str, callback) {
  exec("jq '" + str + "' " + datafile, function (
    err,
    stdout,
    stderr
  ) {
    var errorMessage = err && err.message;
    callback(errorMessage || stderr, stdout);
  });
}

function clearscreen() {
  // ref: http://stackoverflow.com/questions/8813142
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

function divider() {
  process.stdout.write(
    '\n\n--------------------------------\n\n'
  );
}

function runOne(problem, callback) {
  var datafile = path.resolve(
    __dirname,
    'data/' + problem.dataset + '.json'
  );
  var solution = problem.solution;

  var dataset = fs.readFileSync(datafile);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  var writeAndPrompt = function (what) {
    process.stdout.write(what + '\n');
    rl.prompt();
  };

  var helpMessage = function () {
    writeAndPrompt(
      [
        'Enter your answer or one of the following:',
        '  * help?   show this help message',
        '  * prompt? show the original challenge prompt',
        '  * data?   show the challenge data set',
      ].join('\n')
    );
  };

  var problemPrompt = function () {
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
            actual: _.partial(run, datafile, answer),
            expected: _.partial(run, datafile, solution),
          },
          function (err, results) {
            if (err) {
              process.stderr.write(err.red);
              return rl.prompt();
            }

            if (
              _.isEqual(results.expected, results.actual)
            ) {
              rl.close();
              callback(null);
            } else {
              process.stdout.write('\nExpected:\n');
              process.stdout.write(
                results.expected.green + '\n'
              );

              process.stdout.write('\nYour answer:\n');
              process.stdout.write(
                results.actual.yellow + '\n'
              );
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
      var problems = JSON.parse(results[1]);

      clearscreen();

      // Print README
      process.stdout.write(results[0]);
      process.stdout.write(
        'type "data?" to see dataset or "help?" for more options'
      );

      // do problem
      async.mapSeries(problems, runOne, callback);
    }
  );
}

fs.readFile(path.resolve(__dirname, 'menu.json'), function (
  err,
  result
) {
  var lesson = process.argv[process.argv.length - 1],
    problems = JSON.parse(result);

  var success = function (lesson) {
    process.stdout.write(
      [
        '\u2605'.yellow +
          ' "' +
          lesson +
          '" completed with a gold star!',
      ].join('\n') + '\n\n'
    );
  };

  var usage = function () {
    process.stdout.write(
      ['Run jq-tutorial with one of the following:']
        .concat(problems)
        .join('\n  * ') + '\n\n'
    );
  };

  if (problems.indexOf(lesson) == -1) {
    usage();
  } else {
    show(lesson, function (err, result) {
      if (err) throw err;
      success(lesson);
    });
  }
});
