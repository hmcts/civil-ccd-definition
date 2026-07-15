import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import caseFlagsDataBuilderComponents from './case-flag-data-builder-components';

type CaseFlagType = 'CASE_COMPLEX' | 'APPLICANT1_SPECIAL_MEASURE';

@AllMethodsStep()
export default class CaseFlagsDataBuilder extends BaseDataBuilder {
  async buildComplexCaseData() {
    return this.buildData({ flagType: 'CASE_COMPLEX' });
  }

  async buildApplicant1SpecialMeasureData() {
    return this.buildData({ flagType: 'APPLICANT1_SPECIAL_MEASURE' });
  }

  protected async buildData({
                              flagType,
                            }: {
    flagType: CaseFlagType;
  }) {
    if (flagType === 'APPLICANT1_SPECIAL_MEASURE') {
      return {
        ...caseFlagsDataBuilderComponents.applicant1SpecialMeasureFlag,
      };
    }

    return {
      ...caseFlagsDataBuilderComponents.complexCaseFlag,
    };
  }
}
