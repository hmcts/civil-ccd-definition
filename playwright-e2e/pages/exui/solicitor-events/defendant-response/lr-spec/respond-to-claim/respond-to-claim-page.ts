import { ccdData } from '../../../../../../../e2e/tests/unit/utils/dataProvider.js';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  radioButtons,
  defendant1RadioButtons,
  defendant2RadioButtons,
} from './respond-to-claim-content.ts';

@AllMethodsStep()
export default class RespondToClaimPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    //await super.runVerifications([super.verifyHeadings(ccdCaseData), super.expectHeading(heading)]);// This h1 is not captured on this page
  }

  async verifyDefendant1Content() {
    super.expectText(defendant1RadioButtons.defends.label, { ignoreDuplicates: true }),
      super.expectText(defendant1RadioButtons.admitsAll.label, { ignoreDuplicates: true }),
      super.expectText(defendant1RadioButtons.admitsPart.label, { ignoreDuplicates: true }),
      super.expectText(defendant1RadioButtons.defendsAndWantsCounterclaim.label, {
        ignoreDuplicates: true,
      });
  }

  async selectDefendsDefendant1() {
    await super.clickBySelector(defendant1RadioButtons.defends.selector);
  }

  async selectDefendsDefendant2() {
    await super.clickBySelector(defendant2RadioButtons.defends.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
