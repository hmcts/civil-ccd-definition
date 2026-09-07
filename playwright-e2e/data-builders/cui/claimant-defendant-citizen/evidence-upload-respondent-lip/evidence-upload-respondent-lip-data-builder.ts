import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import evidenceUploadRespondentLipDataBuilderComponents from './evidence-upload-respondent-lip-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class EvidenceUploadRespondentLipDataBuilder extends BaseDataBuilder {
  async build(): Promise<CCDCaseData> {
    return this.buildData();
  }

  protected async buildData(): Promise<CCDCaseData> {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...(await evidenceUploadRespondentLipDataBuilderComponents.evidenceUploadRespondentLip(
        civilServiceRequests,
      )),
    } as CCDCaseData;
  }
}
