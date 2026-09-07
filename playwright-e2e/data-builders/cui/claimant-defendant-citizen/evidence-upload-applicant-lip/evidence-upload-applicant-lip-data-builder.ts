import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import evidenceUploadApplicantLipDataBuilderComponents from './evidence-upload-applicant-lip-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class EvidenceUploadApplicantLipDataBuilder extends BaseDataBuilder {
  async build(): Promise<CCDCaseData> {
    return this.buildData();
  }

  protected async buildData(): Promise<CCDCaseData> {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...(await evidenceUploadApplicantLipDataBuilderComponents.evidenceUploadApplicantLip(
        civilServiceRequests,
      )),
    } as CCDCaseData;
  }
}
