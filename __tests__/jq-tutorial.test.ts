import { expect } from 'chai';
import { exec } from 'child_process';
import * as path from 'path';
import { getFixture } from './getFixture';

describe('jq-tutorial', () => {
  it('displays help information when run without argument', async () => {
    const { stdout, stderr } = await runBinary('');
    expect(stdout).to.eql(getFixture('help.txt'));
    expect(stderr).to.be.empty;
  });

  it('displays help information when run with unexpected argument', async () => {
    const { stdout, stderr } = await runBinary('foo');
    expect(stdout).to.eql(getFixture('help.txt'));
    expect(stderr).to.be.empty;
  });

  xit('displays pick readme and prompt when run with "pick" argument', async () => {
    const { stdout, stderr } = await runBinary('pick');
    const expected = getFixture('pick.txt');
    expect(stdout).to.eql(expected);
    expect(stderr).to.be.empty;
  });
});

async function runBinary(argument: string): Promise<{ stdout: string, stderr: string }> {
  const binaryPath = path.resolve(
    __dirname,
    '..',
    'bin',
    'jq-tutorial'
  );

  const pathWithArgs = `${binaryPath} ${argument}`;

  return new Promise((resolve, reject) => {
    exec(pathWithArgs, (err, stdout, stderr) => {
      if (err) reject(err);
      console.error(stderr);
      resolve({ stdout, stderr });
    });
  });
}
