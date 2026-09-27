import BaseDataBuilder from '../../../../../base/base-data-builder';
import partys from '../../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DefendantResponseOptions from '../../../../../models/ccd-events/ccd-events/defendant-response/defendant-response-options';
import defendantResponseDataComponents from './defendant-response-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseDataBuilder extends BaseDataBuilder {
  async buildData({
    claimType,
    claimTrack,
    responseType,
    defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
  }: Required<DefendantResponseOptions>) {
    const { civilServiceRequests } = this.requestsFactory;

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      defendantResponseDataComponents.confirmDetails(
        claimType,
        this.ccdCaseData,
        defendantSolicitorParty,
      ),
      defendantResponseDataComponents.singleResponse(claimType),
      defendantResponseDataComponents.respondentResponseType(
        claimType,
        responseType,
        defendantSolicitorParty,
      ),
      defendantResponseDataComponents.solicitorReferences(
        this.ccdCaseData,
        defendantSolicitorParty,
      ),
      await defendantResponseDataComponents.upload(defendantSolicitorParty, civilServiceRequests),
      defendantResponseDataComponents.fileDirectionsQuestionnaire(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseDataComponents.fixedRecoverableCosts(claimTrack, defendantSolicitorParty),
      await defendantResponseDataComponents.fixedRecoverableCostsIntermediate(
        claimTrack,
        defendantSolicitorParty,
        civilServiceRequests,
      ),
      defendantResponseDataComponents.disclosureOfElectronicDocuments(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseDataComponents.disclosureOfNonElectronicDocuments(
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseDataComponents.deterWithoutHearing(claimTrack, defendantSolicitorParty),
      defendantResponseDataComponents.experts(defendantSolicitorParty),
      defendantResponseDataComponents.witnesses(defendantSolicitorParty),
      defendantResponseDataComponents.language(defendantSolicitorParty),
      defendantResponseDataComponents.hearing(defendantSolicitorParty),
      await defendantResponseDataComponents.draftDirections(
        claimTrack,
        defendantSolicitorParty,
        civilServiceRequests,
      ),
      defendantResponseDataComponents.requestedCourt(defendantSolicitorParty),
      defendantResponseDataComponents.hearingSupport(defendantSolicitorParty),
      defendantResponseDataComponents.vulnerabilityQuestions(defendantSolicitorParty),
      defendantResponseDataComponents.furtherInformation(defendantSolicitorParty),
      defendantResponseDataComponents.statementOfTruth(defendantSolicitorParty),
      defendantResponseDataComponents.undefine(defendantSolicitorParty),
    );

    return eventData;
  }
}
