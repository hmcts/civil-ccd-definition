import { test as requestFactories } from './request-factory-fixtures';
import { test as dataBuilderFactories } from './data-builder-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import { mergeTests } from '@playwright/test';
import DataApiStep from '../../steps/api/data-api-steps';
import CaseRoleAssignmentApiSteps from '../../steps/api/case-role-assignment-api-steps';
import IdamApiSteps from '../../steps/api/idam/idam-api-steps';
import ClaimantSolicitorApiSteps from '../../steps/api/exui/claimant-solicitor-api-steps';
import ClaimantSolicitorSpecApiSteps from '../../steps/api/exui/claimant-solicitor-spec-api-steps';

type ApiActionsFixtures = {
  IdamApiSteps: IdamApiSteps;
  DataApiStep: DataApiStep;
  ClaimantSolicitorSpecApiSteps: ClaimantSolicitorSpecApiSteps;
  ClaimantSolicitorApiSteps: ClaimantSolicitorApiSteps;
  CaseRoleAssignmentApiSteps: CaseRoleAssignmentApiSteps;
};

export const test = mergeTests(testUtils, requestFactories, dataBuilderFactories).extend<ApiActionsFixtures>({
  IdamApiSteps: async ({ _requestsFactory, _testData }, use) => {
    await use(new IdamApiSteps(_requestsFactory, _testData));
  },
  DataApiStep: async ({ _requestsFactory, _testData }, use) => {
    await use(new DataApiStep(_requestsFactory, _testData));
  },
  ClaimantSolicitorSpecApiSteps: async ({ _claimantSolicitorDataBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantSolicitorSpecApiSteps(_claimantSolicitorDataBuilderFactory, _requestsFactory, _testData));
  },
  ClaimantSolicitorApiSteps: async ({ _claimantSolicitorDataBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantSolicitorApiSteps(_claimantSolicitorDataBuilderFactory, _requestsFactory, _testData));
  },
  CaseRoleAssignmentApiSteps: async ({ _requestsFactory, _testData }, use) => {
    await use(new CaseRoleAssignmentApiSteps(_requestsFactory, _testData));
  }
});
