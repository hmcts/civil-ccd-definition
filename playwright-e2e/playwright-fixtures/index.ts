import { mergeTests } from '@playwright/test';
import { apiExpect } from './api/api-expect-fixtures';
import { test as uiSteps } from './ui/ui-steps-fixtures';
import { test as apiSteps } from './api/api-steps-fixtures';
import { pageExpect } from './ui/page-expect-fixtures';

const test = mergeTests(uiSteps, apiSteps);

export { test, pageExpect, apiExpect };
