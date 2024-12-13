import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  useExpertRadioButtonsSmallTrack,
  useExpertRadioButtonsFastTrack,
  useExpertsRadioButtonsSmallTrack1v2,
  expertDetails,
  expertDetails1v2,
  alreadySentExpertReportsRadioFastTrack1v2,
  suitableForJointExpertRadioFastTrack1v2,
  useExpertsRadioButtonsFastTrack1v2,
  addExpertButton,
  expertDetails2v1,
} from './use-of-experts-content.ts';

@AllMethodsStep()
export default class UseOfExpertsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesSmallTrack() {
    await super.clickBySelector(useExpertRadioButtonsSmallTrack.radioYes.selector);
    super.expectInputValue(
      expertDetails.fields.firstName.label,
      expertDetails.fields.firstName.selector,
    ),
      super.expectInputValue(
        expertDetails.fields.lastName.label,
        expertDetails.fields.lastName.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.number.label,
        expertDetails.fields.number.selector,
      ),
      super.expectInputValue(expertDetails.fields.email.label, expertDetails.fields.email.selector),
      super.expectInputValue(
        expertDetails.fields.fieldOfExpertise.label,
        expertDetails.fields.fieldOfExpertise.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.whyDoYouNeedExpert.label,
        expertDetails.fields.whyDoYouNeedExpert.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.estimateCost.label,
        expertDetails.fields.estimateCost.selector,
      );
  }

  async selectNoSmallTrack() {
    await super.clickBySelector(useExpertRadioButtonsSmallTrack.radioNo.selector);
  }

  async selectYesFastTrack(defendantNumber: number) {
    await super.clickBySelector(useExpertRadioButtonsFastTrack(defendantNumber).radioYes.selector);
  }

  async selectNoFastTrack(defendantNumber: number) {
    await super.clickBySelector(useExpertRadioButtonsFastTrack(defendantNumber).radioNo.selector);
  }

  async selectNoFastTrack1v2() {
    await super.clickBySelector(useExpertsRadioButtonsFastTrack1v2.radioNo.selector);
  }

  async selectYesSpecSmallTrack1v2() {
    await super.clickBySelector(useExpertsRadioButtonsSmallTrack1v2.radioYes.selector);
    super.expectInputValue(
      expertDetails1v2.fields.firstName.label,
      expertDetails1v2.fields.firstName.selector,
    ),
      super.expectInputValue(
        expertDetails1v2.fields.lastName.label,
        expertDetails1v2.fields.lastName.selector,
      ),
      super.expectInputValue(
        expertDetails1v2.fields.number.label,
        expertDetails1v2.fields.number.selector,
      ),
      super.expectInputValue(
        expertDetails1v2.fields.email.label,
        expertDetails1v2.fields.email.selector,
      ),
      super.expectInputValue(
        expertDetails1v2.fields.fieldOfExpertise.label,
        expertDetails1v2.fields.fieldOfExpertise.selector,
      ),
      super.expectInputValue(
        expertDetails1v2.fields.whyDoYouNeedExpert.label,
        expertDetails1v2.fields.whyDoYouNeedExpert.selector,
      ),
      super.expectInputValue(
        expertDetails1v2.fields.estimateCost.label,
        expertDetails1v2.fields.estimateCost.selector,
      );
  }

  async selectNoSmallTrack1v2() {
    await super.clickBySelector(useExpertsRadioButtonsSmallTrack1v2.radioNo.selector);
  }

  async selectYesSentExpertReportsFastTrack1v2(defendantResponse: number) {
    await super.clickBySelector(
      alreadySentExpertReportsRadioFastTrack1v2(defendantResponse).radioYes.selector,
    );
  }

  async selectNoSentExpertReportsFastTrack1v2(defendantResponse: number) {
    await super.clickBySelector(
      alreadySentExpertReportsRadioFastTrack1v2(defendantResponse).radioNo.selector,
    );
  }

  async selectNotYetObtainedExpertReportsFastTrack1v2(defendantResponse: number) {
    await super.clickBySelector(
      alreadySentExpertReportsRadioFastTrack1v2(defendantResponse).radioNotYet.selector,
    );
  }

  async selectYesSuitableForJointExpertFastTrack1v2(defendantResponse: number) {
    await super.clickBySelector(
      suitableForJointExpertRadioFastTrack1v2(defendantResponse).radioYes.selector,
    );
  }

  async selectNoSuitableForJointExpertFastTrack1v2(defendantResponse: number) {
    await super.clickBySelector(
      suitableForJointExpertRadioFastTrack1v2(defendantResponse).radioNo.selector,
    );
  }

  async addExpert(defendantNumber: number) {
    await super.clickBySelector(addExpertButton(defendantNumber).addNewExpert.selector);
  }

  async enterExpertDetails2v1(defendantNumber: number, expertNumber: number) {
    await super.inputText(
      'John',
      expertDetails2v1(defendantNumber, expertNumber).fields.firstName.selector,
    );
    await super.inputText(
      'Smith',
      expertDetails2v1(defendantNumber, expertNumber).fields.lastName.selector,
    );
    await super.inputText(
      'johnsmith@gmail.com',
      expertDetails2v1(defendantNumber, expertNumber).fields.email.selector,
    );
    await super.inputText(
      '07464016633',
      expertDetails2v1(defendantNumber, expertNumber).fields.number.selector,
    );
    await super.inputText(
      'expertise',
      expertDetails2v1(defendantNumber, expertNumber).fields.fieldOfExpertise.selector,
    );
  }

  async enterExpertDetails1v2(defendantNumber: number, expertNumber: number) {
    await super.inputText(
      'John',
      expertDetails2v1(defendantNumber, expertNumber).fields.firstName.selector,
    );
    await super.inputText(
      'Smith',
      expertDetails2v1(defendantNumber, expertNumber).fields.lastName.selector,
    );
    await super.inputText(
      '07464016633',
      expertDetails2v1(defendantNumber, expertNumber).fields.number.selector,
    );
    await super.inputText(
      'johnsmith@gmail.com',
      expertDetails2v1(defendantNumber, expertNumber).fields.email.selector,
    );
    await super.inputText(
      'expertise',
      expertDetails2v1(defendantNumber, expertNumber).fields.fieldOfExpertise.selector,
    );
    await super.inputText(
      'why',
      expertDetails2v1(defendantNumber, expertNumber).fields.whyDoYouNeedExpert.selector,
    );
    await super.inputText(
      '100',
      expertDetails2v1(defendantNumber, expertNumber).fields.estimateCost.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
