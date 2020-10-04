import { readFileSync } from 'fs';
import * as path from 'path';

export function getFixture(fixtureFile: string) {
  return readFileSync(path.resolve(__dirname, 'fixtures', fixtureFile)).toString();
}
