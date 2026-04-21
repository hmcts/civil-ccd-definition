import { test as base } from './request-factory-fixtures';
import ClaimantDefendantSolicitorDataBuilderFactory from '../../data-builders/exui/claimant-defendant-solicitor/claimant-defendant-solicitor-data-builder-factory';

type DataBuilderFixtures = {
  _claimantDefendantSolicitorDataBuilderFactory: ClaimantDefendantSolicitorDataBuilderFactory;
};

export const test = base.extend<DataBuilderFixtures>({
  _claimantDefendantSolicitorDataBuilderFactory: async ({_requestsFactory}, use) => {
    await use(new ClaimantDefendantSolicitorDataBuilderFactory(_requestsFactory));
  }
});
