import { expect } from 'chai';
import { exec } from 'child_process';
import { getFixture } from './getFixture';
import * as path from 'path';

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

  it('reads the progress file and displays ticks next to completed lessons', async () => {
    const { stdout, stderr } = await runBinary('foo', path.resolve(__dirname, 'fixtures/_progress-example.txt'));
    expect(stdout).to.eql(getFixture('help-with-completed-lessons.txt'));
    expect(stderr).to.be.empty;
  });
});

async function runBinary(
  arg: string,
  progressLocation: string = ''
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      `PROGRESS_FILE_PATH=${progressLocation} yarn --silent start ${arg}`,
      (err, stdout, stderr) => {
        if (err) reject(err);
        console.error(stderr);
        resolve({ stdout, stderr });
      }
    );
  });
}
