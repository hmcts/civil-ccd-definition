import BaseApi from '../../../base/base-api';
import { tribunalCaseworkerRegion4User } from '../../../config/users/exui-users';
import CaseState from '../../../constants/cases/case-state';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import createSdoData from '../../../../e2e/fixtures/events/createSDO';

@AllMethodsStep()
export default class LegalAdvisorApiSteps extends BaseApi {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async CreateSdoSmallTrack() {
    await this.setupApiStep(tribunalCaseworkerRegion4User);
    const eventData = createSdoData.createLASDO();

    await super.submitCCDEvent(
      tribunalCaseworkerRegion4User,
      ccdEvents.CREATE_SDO,
      eventData.valid,
      CaseState.CASE_PROGRESSION,
    );
  }
}
