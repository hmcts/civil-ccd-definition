import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { subheadings, radioButtons, inputs } from './judicial-hearing-details-general-order-screen-content';

@AllMethodsStep()
export default class JudicialHearingDetailsGeneralOrderScreenPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheadings),
      super.expectSelector(radioButtons.judicialByCourtsInitiativeListForHearing.courtsOwnInitiative.selector),
      super.expectSelector(radioButtons.judicialByCourtsInitiativeListForHearing.orderWithoutNotice.selector),
      super.expectSelector(radioButtons.judicialByCourtsInitiativeListForHearing.notApplicable.selector),
    ]);
  }

  async selectOrderWithoutNotice() {
    await super.inputText('Directions in relation to hearing', inputs.directionsInRelationToHearing.selector);
    await super.clickBySelector(radioButtons.judicialByCourtsInitiativeListForHearing.orderWithoutNotice.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
