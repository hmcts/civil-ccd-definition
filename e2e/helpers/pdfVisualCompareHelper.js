const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const codeceptjs = require('codeceptjs');

const PIXELMATCH_THRESHOLD = 0.15;
const MAX_MISMATCH_PERCENT = 0.01;

function ensureCleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function renderPdfToPngs(pdfFile, outputDir) {
  ensureCleanDir(outputDir);

  const outputPrefix = path.join(outputDir, 'page');

  execFileSync('pdftoppm', [
    '-png',
    '-r',
    '150',
    pdfFile,
    outputPrefix
  ]);

  return fs.readdirSync(outputDir)
    .filter(file => file.endsWith('.png'))
    .sort()
    .map(file => path.join(outputDir, file));
}

function comparePngs(actualPngs, expectedPngs, diffDir) {
  fs.mkdirSync(diffDir, { recursive: true });

  if (actualPngs.length !== expectedPngs.length) {
    throw new Error(
      `PDF page count mismatch. Actual: ${actualPngs.length}, Expected: ${expectedPngs.length}`
    );
  }

  const failures = [];

  for (let i = 0; i < actualPngs.length; i++) {
    const actualImg = PNG.sync.read(fs.readFileSync(actualPngs[i]));
    const expectedImg = PNG.sync.read(fs.readFileSync(expectedPngs[i]));

    if (
      actualImg.width !== expectedImg.width ||
      actualImg.height !== expectedImg.height
    ) {
      failures.push({
        page: i + 1,
        reason: 'Image dimensions differ',
        actual: `${actualImg.width}x${actualImg.height}`,
        expected: `${expectedImg.width}x${expectedImg.height}`
      });
      continue;
    }

    const diff = new PNG({
      width: actualImg.width,
      height: actualImg.height
    });

    const mismatchPixels = pixelmatch(
      actualImg.data,
      expectedImg.data,
      diff.data,
      actualImg.width,
      actualImg.height,
      { threshold: PIXELMATCH_THRESHOLD }
    );

    const totalPixels = actualImg.width * actualImg.height;
    const mismatchPercent = mismatchPixels / totalPixels;

    console.log(
      `PDF page ${i + 1}: ${mismatchPixels} pixels different (${(mismatchPercent * 100).toFixed(4)}%)`
    );

    if (mismatchPercent > MAX_MISMATCH_PERCENT) {
      const diffPath = path.join(diffDir, `page-${i + 1}-diff.png`);
      fs.writeFileSync(diffPath, PNG.sync.write(diff));

      failures.push({
        page: i + 1,
        mismatchPixels,
        mismatchPercent: `${(mismatchPercent * 100).toFixed(4)}%`,
        diffPath
      });
    }
  }

  return failures;
}

function copyDiffsToArtifacts(failures) {
  const artifactDir = path.resolve('test-results/functional/pdf-diffs');
  fs.mkdirSync(artifactDir, { recursive: true });

  failures.forEach(f => {
    if (fs.existsSync(f.diffPath)) {
      const target = path.join(artifactDir, `page-${f.page}-diff.png`);
      fs.copyFileSync(f.diffPath, target);
      console.log('Saved diff to artifact:', target);
    }
  });
}

function attachDiffsToAllure(failures, actualPngs, expectedPngs) {
  const allure = codeceptjs.container.plugins('allure');
  if (!allure) return;

  failures.forEach(f => {
    const index = f.page - 1;

    if (fs.existsSync(actualPngs[index])) {
      allure.addAttachment(
        `Page ${f.page} - Actual`,
        fs.readFileSync(actualPngs[index]),
        'image/png'
      );
    }

    if (fs.existsSync(expectedPngs[index])) {
      allure.addAttachment(
        `Page ${f.page} - Expected`,
        fs.readFileSync(expectedPngs[index]),
        'image/png'
      );
    }

    if (fs.existsSync(f.diffPath)) {
      allure.addAttachment(
        `Page ${f.page} - Diff`,
        fs.readFileSync(f.diffPath),
        'image/png'
      );
    }
  });
}

function attachPdfsToAllure(actualFile, expectedFile) {
  const allure = codeceptjs.container.plugins('allure');
  if (!allure) return;

  if (fs.existsSync(actualFile)) {
    allure.addAttachment(
      'Actual PDF',
      fs.readFileSync(actualFile),
      'application/pdf'
    );
  }

  if (fs.existsSync(expectedFile)) {
    allure.addAttachment(
      'Expected PDF (baseline)',
      fs.readFileSync(expectedFile),
      'application/pdf'
    );
  }
}

function waitForFileStable(file, timeout = 10000) {
  return new Promise((resolve, reject) => {
    let lastSize = 0;
    let stableCount = 0;
    const start = Date.now();

    const interval = setInterval(() => {
      try {
        if (Date.now() - start > timeout) {
          clearInterval(interval);
          return reject(new Error(`Timeout waiting for file: ${file}`));
        }

        if (!fs.existsSync(file)) return;

        const size = fs.statSync(file).size;

        if (size > 0 && size === lastSize) {
          stableCount++;
        } else {
          stableCount = 0;
        }

        lastSize = size;

        if (stableCount >= 3) {
          clearInterval(interval);
          resolve();
        }
      } catch (e) {
        console.warn('waitForFileStable error:', e);
      }
    }, 300);
  });
}

async function downloadPdf(I, actualFile) {
  fs.mkdirSync(path.dirname(actualFile), { recursive: true });

  if (fs.existsSync(actualFile)) {
    fs.unlinkSync(actualFile);
  }

  await I.usePlaywrightTo('download pdf', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 60000 }),

      (async () => {
        await page.locator('#mvMoreOptionsBtn').click();
        await page.waitForTimeout(500);

        const btn = page.getByRole('button', { name: 'Download' }).first();
        await btn.waitFor({ state: 'visible', timeout: 20000 });
        await btn.click();
      })()
    ]);

    await download.saveAs(actualFile);
  });

  await waitForFileStable(actualFile);
}

async function downloadAndComparePdf({
  I,
  actualFile,
  expectedFile,
  actualPngDir,
  expectedPngDir,
  diffPngDir
}) {
  await downloadPdf(I, actualFile);

  await new Promise(r => setTimeout(r, 1000));

  if (!fs.existsSync(expectedFile)) {
    fs.mkdirSync(path.dirname(expectedFile), { recursive: true });
    fs.copyFileSync(actualFile, expectedFile);
    console.log('Baseline PDF created');
    return;
  }

  const actualPngs = renderPdfToPngs(actualFile, actualPngDir);
  const expectedPngs = renderPdfToPngs(expectedFile, expectedPngDir);

  const failures = comparePngs(actualPngs, expectedPngs, diffPngDir);

  if (failures.length > 0) {
    copyDiffsToArtifacts(failures);
    attachDiffsToAllure(failures, actualPngs, expectedPngs);
    attachPdfsToAllure(actualFile, expectedFile);

    throw new Error(
      `PDF visual mismatch detected: ${JSON.stringify(failures, null, 2)}`
    );
  }
}

function getPdfPaths(baseDir, pdfName) {
  return {
    actualFile: path.join(baseDir, 'downloads/actual', pdfName),
    expectedFile: path.join(baseDir, 'downloads/expected', pdfName),
    actualPngDir: path.join(baseDir, 'data/actualPngs'),
    expectedPngDir: path.join(baseDir, 'data/expectedPngs'),
    diffPngDir: path.join(baseDir, 'data/diffPngs')
  };
}

module.exports = {
  downloadAndComparePdf,
  getPdfPaths
};