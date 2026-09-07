import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import createCaseFlagsDataBuilderComponents from './create-case-flags-data-builder-components';

@AllMethodsStep()
export default class CreateCaseFlagsDataBuilder extends BaseDataBuilder {
  async buildCaseFlags() {
    return createCaseFlagsDataBuilderComponents.caseFlags;
  }

  async buildApplicant1() {
    return createCaseFlagsDataBuilderComponents.applicant1;
  }

  async buildRespondent1() {
    return createCaseFlagsDataBuilderComponents.respondent1;
  }

  protected async buildData() {
    throw new Error('Method not implemented.');
  }
}
