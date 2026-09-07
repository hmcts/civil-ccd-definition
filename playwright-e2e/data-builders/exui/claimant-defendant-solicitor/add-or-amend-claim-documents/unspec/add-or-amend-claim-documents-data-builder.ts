import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import addOrAmendClaimDocumentsDataBuilderComponents from './add-or-amend-claim-documents-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class AddOrAmendClaimDocumentsDataBuilder extends BaseDataBuilder {
  async buildData() {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...(await addOrAmendClaimDocumentsDataBuilderComponents.upload(civilServiceRequests)),
    };
  }
}
