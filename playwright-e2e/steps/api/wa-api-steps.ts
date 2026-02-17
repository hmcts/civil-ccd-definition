import BaseApi from '../../base/base-api.js';
import { AllMethodsStep } from '../../decorators/test-steps.js';
import TestData from '../../models/test-data.js';
import RequestsFactory from '../../requests/requests-factory.js';
import FastTrackDirections from '../../../wa/tasks/fastTrackDirectionsTask.js';
import SmallClaimsTrackDirections from '../../../wa/tasks/smallClaimDirectionsTask.js';

@AllMethodsStep()
export default class WaApiSteps extends BaseApi {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  // async retrieveAssignWaTaskFastTrackDirections() {
  //   const retrievedTask = await super.retrieveWaTask(FastTrackDirections);
  //   await super.assignWaTask(retrievedTask);
  // }

  async retrieveAssignWaTaskFastTrackDirections() {
    await super.retryWaApiTask(async () => {
      const retrievedTask = await super.retrieveWaTask(FastTrackDirections);
      await super.assignWaTask(retrievedTask);
    });
  }
}
