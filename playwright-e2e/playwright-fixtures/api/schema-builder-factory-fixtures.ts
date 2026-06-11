import { test as base } from '../utils/test-utils-fixtures';
import ClaimantDefendantSolicitorSchemaBuilderFactory from '../../schema-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-schema-builder-factory';
import CaseworkerSchemaBuilderFactory from '../../schema-builders/exui/caseworker/caseworker-schema-builder-factory';
import HearingCenterAdminSchemaBuilderFactory from '../../schema-builders/exui/hearing-center-admin/hearing-center-admin-schema-builder-factory';
import JudgeSchemaBuilderFactory from '../../schema-builders/exui/judge/judge-schema-builder-factory';

type DataBuilderFixtures = {
  _claimantDefendantSolicitorSchemaBuilderFactory: ClaimantDefendantSolicitorSchemaBuilderFactory;
  _caseworkerSchemaBuilderFactory: CaseworkerSchemaBuilderFactory;
  _hearingCenterAdminSchemaBuilderFactory: HearingCenterAdminSchemaBuilderFactory;
  _judgeSchemaBuilderFactory: JudgeSchemaBuilderFactory;
};

export const test = base.extend<DataBuilderFixtures>({
  _claimantDefendantSolicitorSchemaBuilderFactory: async ({ _testData }, use) => {
    await use(new ClaimantDefendantSolicitorSchemaBuilderFactory(_testData));
  },
  _caseworkerSchemaBuilderFactory: async ({ _testData }, use) => {
    await use(new CaseworkerSchemaBuilderFactory(_testData));
  },
  _hearingCenterAdminSchemaBuilderFactory: async ({ _testData }, use) => {
    await use(new HearingCenterAdminSchemaBuilderFactory(_testData));
  },
  _judgeSchemaBuilderFactory: async ({ _testData }, use) => {
    await use(new JudgeSchemaBuilderFactory(_testData));
  }
});
