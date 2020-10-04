import { expect } from 'chai';
import { exec } from 'child_process';
import * as path from 'path';
import { readFileSync } from 'fs';

describe('jq-tutorial acceptance', () => {
  it('displays help information when run without argument', async () => {
    const stdout = await new Promise((res, rej) => {
      const child = exec(
        path.resolve(__dirname, '..', 'bin', 'jq-tutorial'),
        (err, stdout, stderr) => {
          if (err) rej(err);
          console.error(stderr);
          console.log(stdout);
          res(stdout);
        }
      );
    });
    const expected = readFileSync(path.resolve(__dirname, 'fixtures', 'help.txt')).toString();
    expect(stdout).to.eql(expected);
  });
});
