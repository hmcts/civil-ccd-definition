import { test as dataBuilderFactories } from './data-builder-factory-fixtures';
import { test as schemaBuilderFactories } from './schema-builder-factory-fixtures';
import { mergeTests } from '@playwright/test';
import CaseRoleAssignmentApiSteps from '../../steps/api/case-role-assignment-api-steps';
import CaseworkerApiSteps from '../../steps/api/exui/caseworker-api-steps';
import ClaimantCitizenApiSteps from '../../steps/api/cui/claimant-citizen-api-steps';
import ClaimantSolicitorGaApiSteps from '../../steps/api/ga-exui/claimant-solicitor-ga-api-steps';
import DefendantSolicitor1GaApiSteps from '../../steps/api/ga-exui/defendant-solicitor-1-ga-api-steps';
import HearingCenterAdminGaApiSteps from '../../steps/api/ga-exui/hearing-center-admin-ga-api-steps';
import IdamApiSteps from '../../steps/api/idam/idam-api-steps';
import ClaimantSolicitorApiSteps from '../../steps/api/exui/claimant-solicitor-api-steps';
import ClaimantSolicitorSpecApiSteps from '../../steps/api/exui/claimant-solicitor-spec-api-steps';
import DefendantCitizenApiSteps from '../../steps/api/cui/defendant-citizen-api-steps';
import DefendantSolicitor1ApiSteps from '../../steps/api/exui/defendant-solicitor-1-api-steps';
import DefendantSolicitor1SpecApiSteps from '../../steps/api/exui/defendant-solicitor-1-spec-api-steps';
import DefendantSolicitor2SpecApiSteps from '../../steps/api/exui/defendant-solicitor-2-spec-api-steps';
import DefendantSolicitor2ApiSteps from '../../steps/api/exui/defendant-solicitor-2-api-steps';
import OtherClaimantSolicitor1ApiSteps from '../../steps/api/exui/other-claimant-solicitor-1-api-steps';
import OtherDefendantSolicitor1ApiSteps from '../../steps/api/exui/other-defendant-solicitor-1-api-steps';
import OtherDefendantSolicitor2ApiSteps from '../../steps/api/exui/other-defendant-solicitor-2-api-steps';
import DataApiSteps from '../../steps/api/data-api-steps';
import HearingCenterAdminApiSteps from '../../steps/api/exui/hearing-center-admin-api-steps';
import JudgeGaApiSteps from '../../steps/api/ga-exui/judge-ga-api-steps';
import JudgeApiSteps from '../../steps/api/exui/judge-api-steps';
import LegalAdvisorApiSteps from '../../steps/api/exui/legal-advisor-api-steps';

type ApiStepsFixtures = {
  IdamApiSteps: IdamApiSteps;
  DataApiSteps: DataApiSteps;
  CaseworkerApiSteps: CaseworkerApiSteps;
  ClaimantCitizenApiSteps: ClaimantCitizenApiSteps;
  DefendantCitizenApiSteps: DefendantCitizenApiSteps;
  HearingCenterAdminApiSteps: HearingCenterAdminApiSteps;
  HearingCenterAdminGaApiSteps: HearingCenterAdminGaApiSteps;
  JudgeGaApiSteps: JudgeGaApiSteps;
  JudgeApiSteps: JudgeApiSteps;
  ClaimantSolicitorGaApiSteps: ClaimantSolicitorGaApiSteps;
  DefendantSolicitor1GaApiSteps: DefendantSolicitor1GaApiSteps;
  ClaimantSolicitorSpecApiSteps: ClaimantSolicitorSpecApiSteps;
  ClaimantSolicitorApiSteps: ClaimantSolicitorApiSteps;
  DefendantSolicitor1SpecApiSteps: DefendantSolicitor1SpecApiSteps;
  DefendantSolicitor1ApiSteps: DefendantSolicitor1ApiSteps;
  DefendantSolicitor2SpecApiSteps: DefendantSolicitor2SpecApiSteps;
  DefendantSolicitor2ApiSteps: DefendantSolicitor2ApiSteps;
  OtherClaimantSolicitor1ApiSteps: OtherClaimantSolicitor1ApiSteps;
  OtherDefendantSolicitor1ApiSteps: OtherDefendantSolicitor1ApiSteps;
  OtherDefendantSolicitor2ApiSteps: OtherDefendantSolicitor2ApiSteps;
  CaseRoleAssignmentApiSteps: CaseRoleAssignmentApiSteps;
  LegalAdvisorApiSteps: LegalAdvisorApiSteps;
};

export const test = mergeTests(dataBuilderFactories, schemaBuilderFactories).extend<ApiStepsFixtures>({
  IdamApiSteps: async ({ _requestsFactory, _testData }, use) => {
    await use(new IdamApiSteps(_requestsFactory, _testData));
  },
  DataApiSteps: async ({ _requestsFactory, _testData }, use) => {
    await use(new DataApiSteps(_requestsFactory, _testData));
  },
  CaseworkerApiSteps: async ({ _caseworkerDataBuilderFactory, _caseworkerSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new CaseworkerApiSteps(_caseworkerDataBuilderFactory, _caseworkerSchemaBuilderFactory, _requestsFactory, _testData));
  },
  ClaimantCitizenApiSteps: async ({ _claimantDefendantCitizenDataBuilderFactory, _claimantDefendantCitizenSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantCitizenApiSteps(_claimantDefendantCitizenDataBuilderFactory, _claimantDefendantCitizenSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantCitizenApiSteps: async ({ _claimantDefendantCitizenDataBuilderFactory, _claimantDefendantCitizenSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantCitizenApiSteps(_claimantDefendantCitizenDataBuilderFactory, _claimantDefendantCitizenSchemaBuilderFactory, _requestsFactory, _testData));
  },
  HearingCenterAdminApiSteps: async ({ _hearingCenterAdminDataBuilderFactory, _hearingCenterAdminSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new HearingCenterAdminApiSteps(_hearingCenterAdminDataBuilderFactory, _hearingCenterAdminSchemaBuilderFactory, _requestsFactory, _testData));
  },
  HearingCenterAdminGaApiSteps: async ({ _hearingCenterAdminGaDataBuilderFactory, _hearingCenterAdminGaSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new HearingCenterAdminGaApiSteps(_hearingCenterAdminGaDataBuilderFactory, _hearingCenterAdminGaSchemaBuilderFactory, _requestsFactory, _testData));
  },
  JudgeApiSteps: async ({ _judgeDataBuilderFactory, _judgeSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new JudgeApiSteps(_judgeDataBuilderFactory, _judgeSchemaBuilderFactory, _requestsFactory, _testData));
  },
  JudgeGaApiSteps: async ({ _judgeGaDataBuilderFactory, _judgeGaSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new JudgeGaApiSteps(_judgeGaDataBuilderFactory, _judgeGaSchemaBuilderFactory, _requestsFactory, _testData));
  },
  ClaimantSolicitorGaApiSteps: async ({ _claimantDefendantSolicitorGaDataBuilderFactory, _claimantDefendantSolicitorGaSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantSolicitorGaApiSteps(_claimantDefendantSolicitorGaDataBuilderFactory, _claimantDefendantSolicitorGaSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantSolicitor1GaApiSteps: async ({ _claimantDefendantSolicitorGaDataBuilderFactory, _claimantDefendantSolicitorGaSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantSolicitor1GaApiSteps(_claimantDefendantSolicitorGaDataBuilderFactory, _claimantDefendantSolicitorGaSchemaBuilderFactory, _requestsFactory, _testData));
  },
  ClaimantSolicitorSpecApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantSolicitorSpecApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  ClaimantSolicitorApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new ClaimantSolicitorApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantSolicitor1SpecApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantSolicitor1SpecApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantSolicitor1ApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantSolicitor1ApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantSolicitor2SpecApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantSolicitor2SpecApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  DefendantSolicitor2ApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new DefendantSolicitor2ApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  OtherClaimantSolicitor1ApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new OtherClaimantSolicitor1ApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  OtherDefendantSolicitor1ApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new OtherDefendantSolicitor1ApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  OtherDefendantSolicitor2ApiSteps: async ({ _claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new OtherDefendantSolicitor2ApiSteps(_claimantDefendantSolicitorDataBuilderFactory, _claimantDefendantSolicitorSchemaBuilderFactory, _requestsFactory, _testData));
  },
  CaseRoleAssignmentApiSteps: async ({ _requestsFactory, _testData }, use) => {
    await use(new CaseRoleAssignmentApiSteps(_requestsFactory, _testData));
  },
  LegalAdvisorApiSteps: async ({ _judgeDataBuilderFactory, _judgeSchemaBuilderFactory, _requestsFactory, _testData }, use) => {
    await use(new LegalAdvisorApiSteps(_judgeDataBuilderFactory, _judgeSchemaBuilderFactory, _requestsFactory, _testData));
  }
});
