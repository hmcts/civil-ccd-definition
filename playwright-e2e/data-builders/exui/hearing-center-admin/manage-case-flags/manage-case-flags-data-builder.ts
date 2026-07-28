import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import manageCaseFlagsDataBuilderComponents from './manage-case-flags-data-builder-components';

@AllMethodsStep()
export default class ManageCaseFlagsDataBuilder extends BaseDataBuilder {
  async buildCaseFlags() {
    return manageCaseFlagsDataBuilderComponents.caseFlags;
  }

  async buildApplicant1() {
    return manageCaseFlagsDataBuilderComponents.applicant1;
  }

  async buildRespondent1() {
    return manageCaseFlagsDataBuilderComponents.respondent1;
  }

  protected async buildData() {
    throw new Error('Method not implemented.');
  }
}
