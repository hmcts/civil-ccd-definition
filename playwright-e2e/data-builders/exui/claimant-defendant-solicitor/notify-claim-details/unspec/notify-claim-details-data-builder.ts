import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import notifyClaimDetailsDataBuilderComponents from './notify-claim-details-data-builder-components';

@AllMethodsStep()
export default class NotifyClaimDetailsDataBuilder extends BaseDataBuilder {
  async buildData() {
    let particularsOfClaimDocument;

    if(!this.ccdCaseData?.servedDocumentFiles?.particularsOfClaimDocument) {
      const { civilServiceRequests } = this.requestsFactory;
      particularsOfClaimDocument =
        await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    }

    return {
      ...notifyClaimDetailsDataBuilderComponents.selectDefendantSolicitor,
      ...notifyClaimDetailsDataBuilderComponents.upload(particularsOfClaimDocument!),
    };
  }
}
