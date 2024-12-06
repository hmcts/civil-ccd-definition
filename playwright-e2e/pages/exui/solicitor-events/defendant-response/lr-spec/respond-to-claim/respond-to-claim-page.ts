import { ccdData } from '../../../../../../../e2e/tests/unit/utils/dataProvider.js';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  radioButtons,
  radioButtons2v1app1,
  radioButtons2v1app2,
} from './respond-to-claim-content.ts';

@AllMethodsStep()
export default class RespondToClaimPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData), super.expectHeading(heading)]); // This h1 is not captured on this page
  }

  async verifyDefendant1Content(defendantNumber: number) {
    super.expectText(radioButtons(defendantNumber).defends.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons(defendantNumber).admitsAll.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons(defendantNumber).admitsPart.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons(defendantNumber).defendsAndWantsCounterclaim.label, {
        ignoreDuplicates: true,
      });
  }

  async selectDefends(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).defends.selector);
  }

  async selectAdmitsAll(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).admitsAll.selector);
  }

  async selectAdmitsPart(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).admitsPart.selector);
  }

  async selectDefendsAndWantsCounterclaim(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).defendsAndWantsCounterclaim.selector);
  }

  async selectsDefendsApplicant1() {
    await super.clickBySelector(radioButtons2v1app1.reject.selector);
  }

  async selectsAdmitsAllApplicant1() {
    await super.clickBySelector(radioButtons2v1app1.admitsAll.selector);
  }

  async selectsAdmitsPartApplicant1() {
    await super.clickBySelector(radioButtons2v1app1.admitsPart.selector);
  }

  async selectsDefendsAndWantsCounterclaimApplicant1() {
    await super.clickBySelector(radioButtons2v1app1.rejectAndWantsCounterclaim.selector);
  }

  async selectsDefendsApplicant2() {
    await super.clickBySelector(radioButtons2v1app2.reject.selector);
  }

  async selectsAdmitsAllApplicant2() {
    await super.clickBySelector(radioButtons2v1app2.admitsAll.selector);
  }

  async selectsAdmitsPartApplicant2() {
    await super.clickBySelector(radioButtons2v1app2.admitsPart.selector);
  }

  async selectsDefendsAndWantsCounterclaimApplicant2() {
    await super.clickBySelector(radioButtons2v1app2.rejectAndWantsCounterclaim.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
