import BaseDataBuilder from '../../../../../base/base-data-builder';
import { defendantSolicitor1User } from '../../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import evidenceUploadRespondentDataBuilderComponents from './evidence-upload-respondent-data-builder-components';

@AllMethodsStep()
export default class EvidenceUploadRespondentDataBuilder extends BaseDataBuilder {
  async buildData() {
    const { civilServiceRequests } = this.requestsFactory;
    const disclosureDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);
    const witnessSummaryDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);
    const questionsDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);
    const authoritiesDocument = await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);

    return {
      ...evidenceUploadRespondentDataBuilderComponents.evidenceUpload,
      ...evidenceUploadRespondentDataBuilderComponents.documentSelectionFastTrack,
      ...evidenceUploadRespondentDataBuilderComponents.documentUpload({
        disclosureDocument,
        witnessSummaryDocument,
        questionsDocument,
        authoritiesDocument,
      }),
    };
  }
}
