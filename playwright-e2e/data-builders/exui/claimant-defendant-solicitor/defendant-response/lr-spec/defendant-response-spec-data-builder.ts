import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import defendantResponseSpecData from './defendant-response-spec-data-components';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';
import DefenceRouteSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-route-spec';
import PaymentTypeSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';
import DefenceAdmittedPartRouteSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-admitted-part-route-spec';
import DefendantResponseSpecOptions from '../../../../../models/ccd-events/cui-ccd-events/defendant-response-spec-options';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildDefendantResponseDS1(options: DefendantResponseSpecOptions = {}) {
    return this.buildData(options);
  }

  async buildDefendantResponseDS2(options: DefendantResponseSpecOptions = {}) {
    return this.buildData(options, partys.DEFENDANT_SOLICITOR_2);
  }

  protected async buildData(
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType: defendantResponseSpecType = DefendantResponseSpecType.FULL_DEFENCE,
      defenceRoute: defenceRouteSpec = DefenceRouteSpec.DISPUTE,
      paymentType: paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
      defenceAdmittedPartRoute = DefenceAdmittedPartRouteSpec.HAS_NOT_PAID,
    }: DefendantResponseSpecOptions = {},
    defendantSolicitorParty: Party = partys.DEFENDANT_SOLICITOR_1,
  ) {
    const { civilServiceRequests } = this.requestsFactory;

    const eventData: Record<string, unknown> = {};

    Object.assign(
      eventData,
      defendantResponseSpecData.defendantChecklist,
      defendantResponseSpecData.responseConfirmNameAddress(claimType, defendantSolicitorParty),
      defendantResponseSpecData.responseConfirmDetails(defendantSolicitorParty),
      defendantResponseSpecData.singleResponse(claimType),
      defendantResponseSpecData.respondentResponseTypeSpec(
        defendantResponseSpecType,
        claimType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defenceRoute(
        defendantResponseSpecType,
        defenceRouteSpec,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defenceAdmittedPartRoute(
        defendantResponseSpecType,
        claimTrack,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      await defendantResponseSpecData.upload(
        defendantResponseSpecType,
        defendantSolicitorParty,
        civilServiceRequests,
      ),
      defendantResponseSpecData.timeline(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.whenWillClaimBePaid(
        defendantResponseSpecType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defendant1FinancialDetails(
        defendantResponseSpecType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defendant2FinancialDetails(
        defendantResponseSpecType,
        paymentTypeSpec,
        claimType,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defendant1RepaymentPlan(
        defendantResponseSpecType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.defendant2RepaymentPlan(
        defendantResponseSpecType,
        paymentTypeSpec,
        claimType,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.mediationContactInformation(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.mediationAvailability(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.deterWithoutHearing(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.fileDirectionsQuestionnaire(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.fixedRecoverableCosts(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      await defendantResponseSpecData.fixedRecoverableCostsIntermediate(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
        civilServiceRequests,
      ),
      defendantResponseSpecData.disclosureOfElectronicDocumentsLRspec(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.disclosureOfNonElectronicDocumentsLRspec(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.disclosureReport(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.experts(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.witnesses(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.language(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.hearing(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.requestedCourtLocation(
        defendantResponseSpecType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.hearingSupport(defendantResponseSpecType, defendantSolicitorParty),
      defendantResponseSpecData.vulnerabilityQuestions(
        defendantResponseSpecType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.applications(
        defendantResponseSpecType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecData.statementOfTruth(defendantSolicitorParty),
      defendantResponseSpecData.undefine(defendantSolicitorParty),
    );

    return eventData;
  }
}
