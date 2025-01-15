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

  async enterExpert1DetailsDefendant1() {}

  async submit() {
    await super.retryClickSubmit();
  }
}
