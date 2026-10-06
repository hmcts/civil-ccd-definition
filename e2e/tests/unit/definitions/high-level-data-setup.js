const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const script = path.resolve(__dirname, '../../../../bin/run-high-level-data-setup.sh');

describe('High Level Data Setup Gradle invocation', () => {
  let directory;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'civil-hld-'));
    fs.writeFileSync(path.join(directory, 'gradlew'),
      '#!/bin/sh\nprintf "%s\\n" "$@"\nexit "${FAKE_GRADLE_EXIT_CODE:-0}"\n', {mode: 0o755});
  });

  afterEach(() => fs.rmSync(directory, {recursive: true, force: true}));

  function run(args, env = {}) {
    return spawnSync('bash', [script, ...args], {
      cwd: directory,
      env: {...process.env, BEFTA_GRADLE_INIT_SCRIPT: '', FAKE_GRADLE_EXIT_CODE: '0', ...env},
      encoding: 'utf8'
    });
  }

  it('applies the Jenkins mirror init script and preserves its path as one argument', () => {
    const result = run(['aat'], {BEFTA_GRADLE_INIT_SCRIPT: 'build/jenkins hld init.gradle'});
    assert.equal(result.status, 0);
    assert.deepEqual(result.stdout.trim().split('\n'), [
      '--no-daemon', '--init-script', 'build/jenkins hld init.gradle', 'highLevelDataSetup', '--args=aat'
    ]);
  });

  it('allows local invocation without a Jenkins init script', () => {
    const result = run(['preview']);
    assert.equal(result.status, 0);
    assert.deepEqual(result.stdout.trim().split('\n'), [
      '--no-daemon', 'highLevelDataSetup', '--args=preview'
    ]);
  });

  it('propagates a failed Gradle invocation to stop the pipeline', () => {
    assert.equal(run(['aat'], {FAKE_GRADLE_EXIT_CODE: '17'}).status, 17);
  });

  it('rejects missing or extra environment arguments before invoking Gradle', () => {
    for (const args of [[], ['aat', 'preview']]) {
      const result = run(args);
      assert.equal(result.status, 2);
      assert.equal(result.stdout, '');
    }
  });
});
