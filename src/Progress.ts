import * as fs from 'fs';

function writeProgress(path: string, progress: string[]) {
  fs.writeFileSync(path, JSON.stringify(progress, null, 2));
}

export class Progress {
  private completedLessons: string[];
  constructor(private filePath: string, private write = writeProgress) {
    const file = safeLoad(filePath);
    this.completedLessons = file ? JSON.parse(file) : [];
  }

  isCompleted(lesson: string) {
    return this.completedLessons.includes(lesson);
  }

  save(lesson: string) {
    if (!this.isCompleted(lesson)) {
      this.write(this.filePath, this.completedLessons.concat(lesson));
    }
  }
}

function safeLoad(path: string): string | null {
  try {
    return fs.readFileSync(path).toString();
  } catch (e) {
    return null;
  }
}
