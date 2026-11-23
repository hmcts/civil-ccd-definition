import { test as setup } from '@playwright/test';
import { formatPreflightResults, PreflightHelper } from '../helpers/PreflightHelper.ts';
import { requirePlaywrightTestsEnv } from '../env.ts';

// Runs once before the sign-ins and the journeys (see the preflight project in playwright.config.ts), so a missing
// setting, a service that is down or a user who cannot sign in stops the run straight away with a clear reason.
// Set PREFLIGHT=false to skip it.

// Never retried, even when the run is started with --retries, so a failure stops the run rather than checking again
setup.describe.configure({ retries: 0 });

setup('Preflight: settings, services and users', async () => {
  // Checked even with PREFLIGHT=false
  requirePlaywrightTestsEnv();
  setup.skip(process.env.PREFLIGHT === 'false', 'PREFLIGHT=false');
  setup.setTimeout(120_000);

  const results = await new PreflightHelper().run();
  console.log(`Preflight checks:\n${formatPreflightResults(results)}`);

  const failures = results.filter((r) => !r.ok && r.required);
  if (failures.length > 0) {
    throw new Error(`Preflight failed, so no tests were run:\n${formatPreflightResults(failures)}`);
  }
});
