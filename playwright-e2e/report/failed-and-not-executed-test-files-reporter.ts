import type { FullConfig, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import FileSystemHelper from '../helpers/file-system-helper';
import FileType from '../constants/test-utils/file-type';
import config from '../config/config';

type ReportTest = {
  id: string;
  file: string;
  title: string;
};

type TestFilesReport = {
  failedTestFiles: string[];
  passedTestFiles: string[];
  notExecutedTestFiles: string[];
  createdAt: string;
  gitCommitId: string | null;
  // ftGroups: string[] | null;
};

const reportDir = config.playwright.functionalTestResultsDir;
const reportPath = `${reportDir}/playwrightTestFilesReport.json`;

function normaliseFilePath(filePath: string): string {
  const index = filePath.indexOf('/playwright-e2e/');
  if (index !== -1) {
    return `.${filePath.substring(index)}`;
  }

  return filePath;
}

export default class FailedAndNotExecutedTestFilesReporter implements Reporter {
  private testsById = new Map<string, ReportTest>();
  private failedTestsById = new Map<string, ReportTest>();
  private passedTestsById = new Map<string, ReportTest>();
  private allTestFiles = new Set<string>();

  async onBegin(_config: FullConfig, suite: Suite): Promise<void> {
    for (const test of suite.allTests()) {
      const testEntry: ReportTest = {
        id: test.id,
        file: normaliseFilePath(test.location.file),
        title: test.title,
      };

      this.testsById.set(testEntry.id, testEntry);
      this.allTestFiles.add(testEntry.file);
    }
  }

  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    const testEntry: ReportTest = {
      id: test.id,
      file: normaliseFilePath(test.location.file),
      title: test.title,
    };

    this.testsById.set(testEntry.id, testEntry);
    this.allTestFiles.add(testEntry.file);

    if (result.status === 'passed') {
      this.passedTestsById.set(testEntry.id, testEntry);
      this.failedTestsById.delete(testEntry.id);
    }

    if (result.status === 'failed' || result.status === 'timedOut' || result.status === 'interrupted') {
      this.failedTestsById.set(testEntry.id, testEntry);
      this.passedTestsById.delete(testEntry.id);
    }
  }

  async onEnd(): Promise<void> {
    const failedTests = [...this.failedTestsById.values()];
    const passedTests = [...this.passedTestsById.values()];

    const passedTestFiles = [...new Set(passedTests.map((test) => test.file))].sort();
    const failedTestFiles = [...new Set(failedTests.map((test) => test.file))]
      .filter((failedTestFile) => !passedTestFiles.includes(failedTestFile))
      .sort();

    const executedTestFiles = new Set([...failedTestFiles, ...passedTestFiles]);
    const notExecutedTestFiles = [...this.allTestFiles]
      .filter((testFile) => !executedTestFiles.has(testFile))
      .sort();

    const report: TestFilesReport = {
      failedTestFiles,
      passedTestFiles,
      notExecutedTestFiles,
      createdAt: new Date().toISOString(),
      gitCommitId: process.env.GIT_COMMIT ?? null,
      // ftGroups: process.env.PR_FT_GROUPS?.split(',') ?? null,
    };

    await FileSystemHelper.writeFileAsync(report, reportPath, FileType.JSON);
  }
}
