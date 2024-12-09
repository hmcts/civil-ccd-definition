import RequestsFactory from '../../requests/requests-factory';
import { test as base } from '../utils/test-utils-fixtures';

type RequestsFactoryFixtures = {
  _requestsFactory: RequestsFactory;
};

export const test = base.extend<RequestsFactoryFixtures>({
  _requestsFactory: async ({ request }, use) => {
    await use(new RequestsFactory(request));
  }
});
