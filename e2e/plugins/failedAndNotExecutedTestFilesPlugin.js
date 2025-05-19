const fs = require('fs/promises');
const event = require('codeceptjs').event;
const lockfile = require('proper-lockfile');

const passedTestFilesPath = 'test-results/functional/passedTestFiles.json';
const tempFailedTestFilesPath = 'test-results/functional/tempFailedTestFiles.json';
const failedTestFilesPath = 'test-results/functional/failedTestFiles.json';
const notExecutedTestFilesPath = 'test-results/functional/notExecutedTestFiles.json';
const toBeExecutedTestFilesPath = 'test-results/functional/toBeExecutedTestFiles.json';

async function writeNotExecutedTestFiles(allTestFiles) {
  const tempFailedTestFiles = JSON.parse(await fs.readFile(tempFailedTestFilesPath, 'utf-8'));
  const passedTestFiles = JSON.parse(await fs.readFile(passedTestFilesPath, 'utf-8'));

  const executedTestFiles = new Set([...tempFailedTestFiles, ...passedTestFiles]);

  const notExecutedTestFiles = allTestFiles.filter(file => !executedTestFiles.has(file));

  await fs.writeFile(notExecutedTestFilesPath, JSON.stringify(notExecutedTestFiles, null, 2));
}

async function writePassedTestFile(testFile) {
  const release = await lockfile.lock(passedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(passedTestFilesPath, 'utf-8');
    const passedTestFiles = JSON.parse(content);

    if(!passedTestFiles.includes(testFile))
      passedTestFiles.push(testFile);

    await fs.writeFile(passedTestFilesPath, JSON.stringify(passedTestFiles, null, 2));
  } finally {
    await release();
  }
}

async function writeFailedTestFile(testFile) {
  const release = await lockfile.lock(tempFailedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(tempFailedTestFilesPath, 'utf-8');
    const tempFailedTestFilesJson = JSON.parse(content);

    if(!tempFailedTestFilesJson.includes(testFile))
      tempFailedTestFilesJson.push(testFile);

    await fs.writeFile(tempFailedTestFilesPath, JSON.stringify(tempFailedTestFilesJson, null, 2));
  } finally {
    await release();
  }
}

async function removePassedTestFile(testFile) {
  const release = await lockfile.lock(passedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(passedTestFilesPath, 'utf-8');
    let passedTestFilesJson = JSON.parse(content);

    passedTestFilesJson = passedTestFilesJson.filter(failedTestFile => failedTestFile !== testFile);

    await fs.writeFile(passedTestFilesPath, JSON.stringify(passedTestFilesJson, null, 2));
  } finally {
    await release();
  }
}

async function removeFailedTestFile(testFile) {
  const release = await lockfile.lock(tempFailedTestFilesPath, { retries: { retries: 10, factor: 1.5 } });
  try {
    const content = await fs.readFile(tempFailedTestFilesPath, 'utf-8');
    let tempFailedTestFilesJson = JSON.parse(content);

    tempFailedTestFilesJson = tempFailedTestFilesJson.filter(failedTestFile => failedTestFile !== testFile);

    await fs.writeFile(tempFailedTestFilesPath, JSON.stringify(tempFailedTestFilesJson, null, 2));
  } finally {
    await release();
  }
}

function normaliseFilePath(filePath) {
  const index = filePath.indexOf('/e2e/');
  if (index !== -1) {
    return `.${filePath.substring(index)}`;
  } else {
    return filePath;
  }
}

module.exports = function() {
  event.dispatcher.on(event.test.failed, async function (test) {
    const normalisedFilePath = normaliseFilePath(test.file);
    await removePassedTestFile(normalisedFilePath);
    await writeFailedTestFile(normalisedFilePath);
  });

  event.dispatcher.on(event.all.before, async function (result) {
    try {
      await fs.access(toBeExecutedTestFilesPath);
    } catch(error) {
      const normalisedTestFiles = result.testFiles.map(testFile => normaliseFilePath(testFile));
      await fs.writeFile(toBeExecutedTestFilesPath, JSON.stringify(normalisedTestFiles, null, 2));
    }
  });

  event.dispatcher.on(event.test.passed, async function (test) {
    const normalisedFilePath = normaliseFilePath(test.file);
    await removeFailedTestFile(normalisedFilePath);
    await writePassedTestFile(normalisedFilePath);
  });
};

module.exports.createTempFailedTestsFile = async () => {
  await fs.writeFile(tempFailedTestFilesPath, JSON.stringify([], null, 2));
};

module.exports.createPassedTestsFile = async () => {
  await fs.writeFile(passedTestFilesPath, JSON.stringify([], null, 2));
};

module.exports.createNotExecutedTestsFile = async () => {
  await fs.writeFile(notExecutedTestFilesPath, JSON.stringify([], null, 2));
};

module.exports.createFailedTestsFile = async () => {
  const content = await fs.readFile(tempFailedTestFilesPath, 'utf-8');
  const jsonData = JSON.parse(content);
  await fs.writeFile(failedTestFilesPath, JSON.stringify(jsonData, null, 2));
};

module.exports.deleteTempFailedTestsFile = async () => {
  await fs.unlink(tempFailedTestFilesPath);
};

module.exports.deleteToBeExecutedTestFiles = async () => {
  await fs.unlink(toBeExecutedTestFilesPath);
};

module.exports.writeNotExecutedTestFiles = async () => {
  const toBeExecutedTestFiles = JSON.parse(await fs.readFile(toBeExecutedTestFilesPath, 'utf-8'));
  const tempFailedTestFiles = JSON.parse(await fs.readFile(tempFailedTestFilesPath, 'utf-8'));
  const passedTestFiles = JSON.parse(await fs.readFile(passedTestFilesPath, 'utf-8'));

  const executedTestFiles = new Set([...tempFailedTestFiles, ...passedTestFiles]);

  const notExecutedTestFiles = toBeExecutedTestFiles.filter(toBeExecutedTestFile => !executedTestFiles.has(toBeExecutedTestFile));

  await fs.writeFile(notExecutedTestFilesPath, JSON.stringify(notExecutedTestFiles, null, 2));
};