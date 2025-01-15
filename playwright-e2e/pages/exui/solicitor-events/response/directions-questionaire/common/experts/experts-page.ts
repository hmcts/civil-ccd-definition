import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons, buttons } from './experts-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class ExpertPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.experts),
        super.expectText(radioButtons(this.party).expertsRequired.label),
        super.expectLabel(radioButtons(this.party).expertsRequired.yes.label),
        super.expectLabel(radioButtons(this.party).expertsRequired.no.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async useExperts() {
    await super.clickBySelector(radioButtons(this.party).expertsRequired.yes.selector);
    await super.clickBySelector(radioButtons(this.party).expertReports.notObtained.selector);
    await super.clickBySelector(radioButtons(this.party).jointExpert.no.selector);
  }

  async addNewExpert() {
    await super.clickBySelector(buttons.addNew.selector);
  }

  async enterExpert1DetailsDefendant1(expertNumber: number) {
    await super.inputText('First Name', inputs(this.party, expertNumber).firstName.selector);

    await super.inputText('Last Name', inputs(this.party, expertNumber).lastName.selector);

    await super.inputText('Email Address', inputs(this.party, expertNumber).emailAddress.selector);

    await super.inputText('Phone Number', inputs(this.party, expertNumber).phoneNumber.selector);

    await super.inputText(
      'Field of expertise',
      inputs(this.party, expertNumber).expertise.selector,
    );

    await super.inputText(
      'Why do you need this expert?',
      inputs(this.party, expertNumber).whyRequired.selector,
    );

    await super.inputText(
      'Estimated cost',
      inputs(this.party, expertNumber).estimatedCost.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
