// things to check:
// verifyHeadings - this is a common function
// check page specific heading e.g. applicant1PartyNameManageContactLabel or respondent1PartyNameManageContactLabel

import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import Party from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import * as basePartyContent from './base-party-content.ts';

@AllMethodsStep()
export default class BasePartyPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  protected async verifyName(applicantType: basePartyContent.PartyType, partyName: string) {
    const { selector, label } = basePartyContent.h3(applicantType, partyName);
    console.log(`Verifying ${applicantType} name is present: ${label}`);
    await super.expectText(label);
  }

  // postcode lookup and address form fragment being worked on DTSCCI-1423
  // need to review that ticket

  protected async verifyPartyHeader(selector: basePartyContent.Headers) {
    console.log(`Verifying header: ${selector}`);
    await super.expectText(selector);
  }

  // TODO: implement this method
  // protected async verifyPartyTypeList(
  //   selector: basePartyContent.Headers,
  //   partySize: basePartyContent.PartySize,
  // ) {}

  async submit() {
    await super.retryClickSubmit();
  }
}
