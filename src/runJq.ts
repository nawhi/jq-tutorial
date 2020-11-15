import { exec } from 'child_process';

export function runJq(datafile: any, str: any, callback: any) {
  exec('jq \'' + str + '\' ' + datafile, function(
    err,
    stdout,
    stderr,
  ) {
    const errorMessage = err && err.message;
    callback(errorMessage || stderr, stdout);
  });
}
