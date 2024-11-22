import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import ExuiEvent from '../../exui-event/exui-event';
import {
  defendant1Heading,
  defendant2Heading,
  subheading,
  table,
} from './certificate-of-service-submit-content';

@AllMethodsStep()
export default class CertificateOfServiceSubmitFragment extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(defendant1Heading),
        super.expectHeading(defendant2Heading),
        super.expectSubheading(subheading),
        super.expectText(table.dateDeemedServed.label, { count: 2 }),
        super.expectText(table.dateOfService.label, { count: 2 }),
        super.expectText(table.documentsServed.label, { count: 2 }),
        super.expectText(table.documentsServedLocation.label, { count: 2 }),
        super.expectText(table.name.label, { count: 2 }),
        super.expectText(table.firm.label, { count: 2 }),
        super.expectText(table.locationType.label, { count: 2 }),
        super.expectText(table.notifyClaimRecipient.label, { count: 2 }),
        super.expectText(table.serveType.label, { count: 2 }),
      ],
      { runAxe: false },
    );
  }

  async verifyDefendant1Answers() {
    const dateDeemedServed = DateHelper.getToday();
    const dateOfService = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.runVerifications(
      [
        super.expectText(
          DateHelper.formatDateToString(dateDeemedServed, { outputFormat: 'DD Mon YYYY' }),
        ),
        super.expectText(
          DateHelper.formatDateToString(dateOfService, { outputFormat: 'DD Mon YYYY' }),
        ),
        super.expectText(table.documentsServed.defendant1Answer),
        super.expectText(table.documentsServedLocation.defendant1Answer),
        super.expectText(table.name.defendant1Answer),
        super.expectText(table.firm.defendant1Answer),
        super.expectText(table.locationType.defendant1Answer),
        super.expectText(table.notifyClaimRecipient.defendant1Answer),
        super.expectText(table.serveType.defendant1Answer),
      ],
      { runAxe: false },
    );
  }

  async verifyDefendant2Answers() {
    const dateDeemedServed = DateHelper.subtractFromToday({ days: 14 });
    const dateOfService = DateHelper.subtractFromToday({ days: 14, workingDay: true });
    await super.runVerifications(
      [
        super.expectText(
          DateHelper.formatDateToString(dateDeemedServed, { outputFormat: 'DD Mon YYYY' }),
          { count: null },
        ),
        super.expectText(
          DateHelper.formatDateToString(dateOfService, { outputFormat: 'DD Mon YYYY' }),
          { count: null },
        ),
        super.expectText(table.documentsServed.defendant2Answer),
        super.expectText(table.documentsServedLocation.defendant2Answer),
        super.expectText(table.name.defendant2Answer),
        super.expectText(table.firm.defendant2Answer),
        super.expectText(table.locationType.defendant2Answer),
        super.expectText(table.notifyClaimRecipient.defendant2Answer),
        super.expectText(table.serveType.defendant2Answer),
      ],
      { runAxe: false },
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
