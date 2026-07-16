import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import filePaths from '../../../../../config/file-paths.ts';
import DateHelper from '../../../../../helpers/date-helper.ts';
import { buttons, inputs, containers } from './document-upload-content.ts';
import { Page } from 'playwright-core';
import { Party } from '../../../../../models/users/partys.ts';
import DateFragment from '../../../fragments/date/date-fragment.ts';
import CaseDataHelper from '../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class DocumentUploadPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantDefendantParty: Party;
  private witnessParty: Party;
  private expertParty: Party;

  constructor(
    page: Page,
    dateFragment: DateFragment,
    claimantDefendantParty: Party,
    witnessParty: Party,
    expertParty: Party,
  ) {
    super(page);
    this.dateFragment = dateFragment;
    this.claimantDefendantParty = claimantDefendantParty;
    this.witnessParty = witnessParty;
    this.expertParty = expertParty;
  }
  async verifyContent() {
    await super.runVerifications();
  }

  async addWitnessStatement() {
    const statementDate = DateHelper.getToday();
    const witnessData = CaseDataHelper.buildWitnessData(this.witnessParty);
    await super.clickButtonByName(buttons.witnessStatement.addNew.label, {
      containerSelector: containers.witnessStatement.selector(this.claimantDefendantParty),
    });
    await this.dateFragment.enterDate(statementDate, inputs.witnessStatement.date.selectorKey, {
      containerSelector: containers.witnessStatement.selector(this.claimantDefendantParty),
    });
    await super.inputText(
      witnessData.partyName,
      inputs.witnessStatement.witnessName.selector(0, this.claimantDefendantParty),
    );
    await super.retryUploadFile(filePaths.testPdfFile, inputs.witnessStatement.file.selector, {
      containerSelector: containers.witnessStatement.selector(this.claimantDefendantParty),
    });
  }

  async addExpertsReport() {
    const statementDate = DateHelper.getToday();
    const expertData = CaseDataHelper.buildExpertData(this.expertParty);
    try {
      await super.clickButtonByName(buttons.expertsReport.addNew.label, {
        containerSelector: containers.expertsReport.selector(this.claimantDefendantParty),
      });
      await this.dateFragment.enterDate(statementDate, inputs.expertsReport.date.selectorKey, {
        containerSelector: containers.expertsReport.selector(this.claimantDefendantParty),
      });
      await super.inputText(
        expertData.partyName,
        inputs.expertsReport.expertName.selector(0, this.claimantDefendantParty),
      );
      await super.inputText(
        expertData.fieldOfExpertise,
        inputs.expertsReport.fieldOfExpertise.selector(0, this.claimantDefendantParty),
      );
      await super.retryUploadFile(filePaths.testPdfFile, inputs.expertsReport.file.selector, {
        containerSelector: containers.expertsReport.selector(this.claimantDefendantParty),
      });
    } catch {
      await super.clickButtonByName(buttons.expertsReport.addNew.label);
      await this.dateFragment.enterDate(statementDate, inputs.expertsReport.date.selectorKey);
      await super.inputTextByLabel(expertData.partyName, inputs.expertsReport.expertName.label);
      await super.inputTextByLabel(
        expertData.fieldOfExpertise,
        inputs.expertsReport.fieldOfExpertise.label,
      );
      await super.retryUploadFile(filePaths.testPdfFile, inputs.expertsReport.file.selector, {
        first: true,
      });
    }
  }

  async addAuthorities() {
    await super.clickButtonByName(buttons.authorities.addNew.label, {
      containerSelector: containers.authorities.selector(this.claimantDefendantParty),
    });
    await super.retryUploadFile(filePaths.testPdfFile, inputs.authorities.file.selector, {
      containerSelector: containers.authorities.selector(this.claimantDefendantParty),
    });
  }

  async addBundle() {
    const hearingDate = DateHelper.addToToday({ days: 30 });
    await super.clickButtonByName(buttons.bundle.addNew.label, {
      containerSelector: containers.bundle.selector,
    });
    await super.inputText('Test bundle name', inputs.bundle.bundleName.selector(0));
    await this.dateFragment.enterDate(hearingDate, inputs.bundle.date.selectorKey);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.bundle.file.selector(0), {
      containerSelector: containers.bundle.selector,
    });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
