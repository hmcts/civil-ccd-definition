import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {subheadings, getRadioButtons, buttons, expertDetails} from './experts-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class ExpertPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.experts),
        super.expectText(getRadioButtons(this.party).expertsRequired.label),
        super.expectLabel(getRadioButtons(this.party).expertsRequired.yes.label),
        super.expectLabel(getRadioButtons(this.party).expertsRequired.no.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party) },
    );
  }

  async useExperts() {
    await super.clickBySelector(getRadioButtons(this.party).expertsRequired.yes.selector);
    await super.clickBySelector(getRadioButtons(this.party).expertReports.notObtained.selector);
    await super.clickBySelector(getRadioButtons(this.party).jointExpert.no.selector);
  }

  async addNewExpert() {
    await super.clickBySelector(buttons.addNew.selector);
  }

  async enterExpert1DetailsDefendant1(expertNumber : number) {
    await super.inputText(
      'First Name',
      expertDetails(this.party, expertNumber).firstName.selector);

    await super.inputText(
      'Last Name',
      expertDetails(this.party, expertNumber).lastName.selector);

    await super.inputText(
      'Email Address',
      expertDetails(this.party, expertNumber).emailAddress.selector);

    await super.inputText(
      'Phone Number',
      expertDetails(this.party, expertNumber).phoneNumber.selector);

    await super.inputText(
      'Field of expertise',
      expertDetails(this.party, expertNumber).expertise.selector);

    await super.inputText(
      'Why do you need this expert?',
      expertDetails(this.party, expertNumber).whyRequired.selector);

    await super.inputText(
      'Estimated cost',
      expertDetails(this.party, expertNumber).estimatedCost.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
