import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import caseFlagsDataBuilderComponents from './case-flag-data-builder-components';

type CaseFlagType = 'CASE_COMPLEX' | 'APPLICANT1_SPECIAL_MEASURE' | 'UPDATE_CASE_COMPLEX'| 'DEACTIVATE_CASE_COMPLEX'| 'UPDATE_APPLICANT1_SPECIAL_MEASURE'| 'DEACTIVATE_APPLICANT1_SPECIAL_MEASURE';

@AllMethodsStep()
export default class CaseFlagsDataBuilder extends BaseDataBuilder {
  async buildComplexCaseData() {
    return this.buildData({ flagType: 'CASE_COMPLEX' });
  }

  async buildApplicant1SpecialMeasureData() {
    return this.buildData({ flagType: 'APPLICANT1_SPECIAL_MEASURE' });
  }

  async buildUpdateComplexCaseData(caseData: CCDCaseData) {
    return this.buildData({ flagType: 'UPDATE_CASE_COMPLEX', caseData });
  }

  async buildDeactivateComplexCaseData(caseData: CCDCaseData) {
    return this.buildData({ flagType: 'DEACTIVATE_CASE_COMPLEX', caseData });
  }

  async buildUpdateApplicant1SpecialMeasureData(
    caseData: CCDCaseData,
    options: { flagComment: string } = {
      flagComment: 'Test Comment Update Party Level',
    },
  ) {
    return this.buildData({
      flagType: 'UPDATE_APPLICANT1_SPECIAL_MEASURE',
      caseData,
      applicant1Options: options,
    });
  }

  async buildDeactivateApplicant1SpecialMeasureData(
    caseData: CCDCaseData,
    options: { flagComment: string } = {
      flagComment: 'Test Comment Deactivate Party Level',
    },
  ) {
    return this.buildData({
      flagType: 'DEACTIVATE_APPLICANT1_SPECIAL_MEASURE',
      caseData,
      applicant1Options: options,
    });
  }

  protected async buildData({
   flagType,
   caseData,
   options,
   applicant1Options,
   }: {
    flagType: CaseFlagType;
    caseData?: CCDCaseData;
    options?: { status?: string; flagComment: string };
    applicant1Options?: { flagComment: string };
  }) {
    switch (flagType) {
      case 'APPLICANT1_SPECIAL_MEASURE':
        return { ...caseFlagsDataBuilderComponents.applicant1SpecialMeasureFlag };
      case 'UPDATE_CASE_COMPLEX':
        return caseFlagsDataBuilderComponents.updateCaseLevelComplexCaseFlag(caseData!);
      case 'DEACTIVATE_CASE_COMPLEX':
        return caseFlagsDataBuilderComponents.deactivateCaseLevelComplexCaseFlag(caseData!);
      case 'UPDATE_APPLICANT1_SPECIAL_MEASURE':
        return caseFlagsDataBuilderComponents.updateApplicant1SpecialMeasureFlag(
          caseData!,
          applicant1Options!,
        );
      case 'DEACTIVATE_APPLICANT1_SPECIAL_MEASURE':
        return caseFlagsDataBuilderComponents.deactivateApplicant1SpecialMeasureFlag(
          caseData!,
          applicant1Options!,
        );
      default:
        return { ...caseFlagsDataBuilderComponents.complexCaseFlag };
    }
  }
}
