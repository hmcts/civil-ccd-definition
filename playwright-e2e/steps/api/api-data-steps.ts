import { AllMethodsStep } from '../../decorators/test-steps';
import BaseApiSteps from '../../base/base-api-steps';
import RequestsFactory from '../../requests/requests-factory';
import TestData from '../../models/test-data';
import BankHolidaysHelper from '../../helpers/bank-holidays-helper';
import { bankHolidays } from '../../config/data';

@AllMethodsStep()
export default class ApiDataSteps extends BaseApiSteps {
  constructor(requestsFactory: RequestsFactory, testData: TestData) {
    super(requestsFactory, testData);
  }

  async SetupBankHolidaysData() {
    await this.setupBankHolidays();
    BankHolidaysHelper.writeBankHolidays(bankHolidays);
  }
}
