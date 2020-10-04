import { expect } from 'chai';
import { exec } from 'child_process';
import * as path from 'path';
import { getFixture } from './getFixture';

const BINARY_PATH = path.resolve(
  __dirname,
  '..',
  'bin',
  'jq-tutorial'
);

describe('jq-tutorial acceptance', () => {
  it('displays help information when run without argument', async () => {
    const stdout = await new Promise((resolve, reject) => {
      exec(BINARY_PATH, (err, stdout, stderr) => {
        if (err) reject(err);
        console.error(stderr);
        resolve(stdout);
      });
    });
    const expected = getFixture();
    expect(stdout).to.eql(expected);
  });
});
