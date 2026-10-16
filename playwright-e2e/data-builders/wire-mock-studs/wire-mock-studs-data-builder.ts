import BaseDataBuilder from '../../base/base-data-builder';
import { AllMethodsStep } from '../../decorators/test-steps';
import StudRequestBody from '../../models/wire-mock/stud-request-body';
import wireMockStudsDataBuilderComponents from './wire-mock-studs-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class WireMockStudsDataBuilder extends BaseDataBuilder {
  async buildHearingStub(
    hearing: Record<string, any>,
    hearingId: string,
  ): Promise<StudRequestBody> {
    return wireMockStudsDataBuilderComponents.hearingStubRequestBody(hearing, hearingId);
  }

  async buildUnnotifiedHearingStub(hearingIds: string[]): Promise<StudRequestBody> {
    return wireMockStudsDataBuilderComponents.unnotifiedHearingStubRequestBody(hearingIds);
  }

  async buildGetPartiesNotifiedStub(responses: Record<string, any>[] = []): Promise<StudRequestBody> {
    return wireMockStudsDataBuilderComponents.getPartiesNotifiedStubRequestBody(responses);
  }

  async buildPutPartiesNotifiedStub(): Promise<StudRequestBody> {
    return wireMockStudsDataBuilderComponents.putPartiesNotifiedStubRequestBody;
  }

  protected async buildData(): Promise<StudRequestBody[]> {
    throw new Error('Method not implemented')
  }
}
