import { expect } from 'chai';
import { exec } from 'child_process';
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

});

export function sleep(sleepMSecs: number) {
  return new Promise(resolve => setTimeout(resolve, sleepMSecs));
}

async function runBinary(
  argument: string
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      `yarn --silent start ${argument}`,
      (err, stdout, stderr) => {
        if (err) reject(err);
        console.error(stderr);
        resolve({ stdout, stderr });
      }
    );
  });
}
