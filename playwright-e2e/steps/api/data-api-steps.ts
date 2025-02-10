import { AllMethodsStep } from '../../decorators/test-steps';
import BaseApi from '../../base/base-api';
import { bankHolidays } from '../../config/data';
import BankHolidaysHelper from '../../helpers/bank-holidays-helper';

@AllMethodsStep()
export default class DataApiStep extends BaseApi {
  async SetupBankHolidaysData() {
    await this.setupBankHolidays();
    BankHolidaysHelper.writeBankHolidays(bankHolidays);
  }
}
