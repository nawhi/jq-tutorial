import { expect } from 'chai';
import { exec } from 'child_process';
import { getFixture } from './getFixture';
import { runApp } from '../src/app';

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

  it('testing', async () => {
    await run2('pick');
  });
});

async function run2(lesson: string) {
  return await new Promise(async (res, rej) => {
    const stdin = require('mock-stdin').stdin();
    runApp(lesson, process.stdout, stdin).then(res);
    await sleep(1000);
    stdin.end();
  });
}

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
