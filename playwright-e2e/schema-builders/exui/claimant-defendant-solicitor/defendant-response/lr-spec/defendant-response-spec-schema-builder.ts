import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSpecSchemaComponents from './defendant-response-spec-schema-components';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';
import PaymentTypeSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';
import DefenceRouteSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-route-spec';
import DefenceAdmittedPartRouteSpec from '../../../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-admitted-part-route-spec';
import DefendantResponseSpecOptions from '../../../../../models/ccd-events/cui-ccd-events/defendant-response-spec-options';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildDefendantResponseDS1(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    options: DefendantResponseSpecOptions = {},
  ) {
    return this.buildDefendantResponse(
      caseDataBeforeSubmission,
      options,
      partys.DEFENDANT_SOLICITOR_1,
    );
  }

  async buildDefendantResponseDS2(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    options: DefendantResponseSpecOptions = {},
  ) {
    return this.buildDefendantResponse(
      caseDataBeforeSubmission,
      options,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  private async buildDefendantResponse(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    options: DefendantResponseSpecOptions,
    defendantSolicitorParty: Party,
  ) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimTrack: options.claimTrack,
      claimType: options.claimType,
      responseType: options.responseType,
      defenceRouteSpec: options.defenceRoute,
      paymentTypeSpec: options.paymentType,
      defenceAdmittedPartRoute: options.defenceAdmittedPartRoute,
      defendantSolicitorParty,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseSpecType.FULL_DEFENCE,
      defenceRouteSpec = DefenceRouteSpec.DISPUTE,
      paymentTypeSpec = PaymentTypeSpec.IMMEDIATELY,
      defenceAdmittedPartRoute = DefenceAdmittedPartRouteSpec.HAS_NOT_PAID,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: {
      caseDataBeforeSubmission?: CCDCaseData;
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      responseType?: DefendantResponseSpecType;
      defenceRouteSpec?: DefenceRouteSpec;
      paymentTypeSpec?: PaymentTypeSpec;
      defenceAdmittedPartRoute?: DefenceAdmittedPartRouteSpec;
      defendantSolicitorParty?: Party;
    },
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    const responseSchemaFields: z.ZodRawShape = {};

    Object.assign(
      responseSchemaFields,
      defendantResponseSpecSchemaComponents.responseClaimTrack(responseType),
      defendantResponseSpecSchemaComponents.singleResponse(claimType),
      defendantResponseSpecSchemaComponents.responseConfirmNameAddress(
        claimType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.responseConfirmDetails(defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.respondentResponseType(
        responseType,
        claimType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defenceRoute(
        responseType,
        defenceRouteSpec,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defenceAdmittedPartRoute(
        responseType,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.upload(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.timeline(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.whenWillClaimBePaid(
        responseType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defendant1FinancialDetails(
        responseType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defendant2FinancialDetails(
        responseType,
        paymentTypeSpec,
        claimType,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defendant1RepaymentPlan(
        responseType,
        paymentTypeSpec,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.defendant2RepaymentPlan(
        responseType,
        paymentTypeSpec,
        claimType,
        defenceAdmittedPartRoute,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.mediationContactInformation(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.mediationAvailability(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.deterWithoutHearing(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.fileDirectionsQuestionnaire(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.fixedRecoverableCosts(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.fixedRecoverableCostsIntermediate(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.disclosureOfElectronicDocumentsLRspec(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.disclosureOfNonElectronicDocumentsLRspec(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.disclosureReport(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.experts(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.witnesses(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.language(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.hearing(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.requestedCourtLocation(
        responseType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.hearingSupport(responseType, defendantSolicitorParty),
      defendantResponseSpecSchemaComponents.vulnerabilityQuestions(
        responseType,
        defendantSolicitorParty,
      ),
      defendantResponseSpecSchemaComponents.applications(
        responseType,
        claimTrack,
        defendantSolicitorParty,
      ),
    );

    return baseSchema.extend(responseSchemaFields);
  }
}
