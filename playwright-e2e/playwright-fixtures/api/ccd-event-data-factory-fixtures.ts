import CreateClaimDataFactory from '../../fixtures/ccd-event-data/exui/solicitor-events/create-claim/create-claim-data-factory';
import { test as base } from '@playwright/test';

type CCDEventDataFactoryFixtures = {
  _createClaimDataFactory: CreateClaimDataFactory;
};

export const test = base.extend<CCDEventDataFactoryFixtures>({
  _createClaimDataFactory: async ({ request }, use) => {
    await use(new CreateClaimDataFactory());
  }
});
