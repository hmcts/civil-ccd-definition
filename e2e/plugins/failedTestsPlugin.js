const fs = require('fs/promises');
const event = require('codeceptjs').event;
const lockfile = require('proper-lockfile');

const newFailedTestFilesPath = 'test-results/newFailedTestFiles.json';
const failedTestFilesPath = 'test-results/failedTestFiles.json';

async function writeFailedTestFile(testFile) {
  const release = await lockfile.lock(newFailedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(newFailedTestFilesPath, 'utf-8');
    const newFailedTestFilesJson = JSON.parse(content);

    if(!newFailedTestFilesJson.includes(testFile))
      newFailedTestFilesJson.push(testFile);

    await fs.writeFile(newFailedTestFilesPath, JSON.stringify(newFailedTestFilesJson, null, 2));
  } finally {
    await release();
  }
}

async function removeFailedTestFile(testFile) {
  const release = await lockfile.lock(newFailedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(newFailedTestFilesPath, 'utf-8');
    let newFailedTestFilesJson = JSON.parse(content);

    newFailedTestFilesJson = newFailedTestFilesJson.filter(failedTestFile => failedTestFile !== testFile);

    await fs.writeFile(newFailedTestFilesPath, JSON.stringify(newFailedTestFilesJson, null, 2));
  } finally {
    await release();
  }
}

module.exports = function() {
  event.dispatcher.on(event.test.failed, async function (test) {
    await writeFailedTestFile(test.file);
  });

  event.dispatcher.on(event.test.passed, async function (test) {
    await removeFailedTestFile(test.file);
  });
};

module.exports.createNewFailedTestsFile = async () => {
  await fs.writeFile(newFailedTestFilesPath, JSON.stringify([], null, 2));
};

module.exports.deleteNewFailedTestsFile = async () => {
  await fs.unlink(newFailedTestFilesPath);
};

module.exports.createFailedTestFile = async () => {
  const content = await fs.readFile(newFailedTestFilesPath, 'utf-8');
  const jsonData = JSON.parse(content);
  await fs.writeFile(failedTestFilesPath, JSON.stringify(jsonData, null, 2));
};

module.exports.deleteFailedTestsFile = async () => {
  try {
    const content = await fs.readFile(failedTestFilesPath, 'utf-8');
    const failedTestFilesJson = JSON.parse(content);
    if(failedTestFilesJson.length === 0) {
      await fs.unlink(failedTestFilesPath);
    }
  } catch (e) {
    console.log('Error deleting file in path: ' + failedTestFilesPath);
  }
};