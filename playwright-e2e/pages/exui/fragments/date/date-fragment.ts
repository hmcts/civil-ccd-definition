import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from './date-content';
import { ClaimantDefendantPartyType } from '../../../../models/claimant-defendant-party-types';
import DateHelper from '../../../../helpers/date-helper';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { Party } from '../../../../models/partys';

@AllMethodsStep()
export default class DateFragment extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(inputs.day.label, {
          ignoreDuplicates: true,
        }),
        super.expectLabel(inputs.month.label, {
          ignoreDuplicates: true,
        }),
        super.expectLabel(inputs.year.label, {
          ignoreDuplicates: true,
        }),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterDate(date: Date, selectorKey: string, index?: number) {
    await super.inputText(DateHelper.getTwoDigitDay(date), inputs.day.selector(selectorKey), {
      index,
    });
    await super.inputText(DateHelper.getTwoDigitMonth(date), inputs.month.selector(selectorKey), {
      index,
    });
    await super.inputText(date.getFullYear(), inputs.year.selector(selectorKey), {
      index,
    });
  }

  async enterDateOfBirth(
    claimantDefendantParty: Party,
    partyType: ClaimantDefendantPartyType,
    index?: number,
  ) {
    const selectorKey = `${partyType.key}DateOfBirth`;
    const dateOfBirth = new Date(CaseDataHelper.getPartyDateOfBirth(claimantDefendantParty));
    await super.inputText(
      DateHelper.getTwoDigitDay(dateOfBirth),
      inputs.day.selector(selectorKey),
      { index },
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateOfBirth),
      inputs.month.selector(selectorKey),
      { index },
    );
    await super.inputText(dateOfBirth.getFullYear(), inputs.year.selector(selectorKey), {
      index,
    });
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
