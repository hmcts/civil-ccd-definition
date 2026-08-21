import ClaimTrack from '../../../../constants/cases/claim-track';
import DefenceRouteSpec from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/defence-route-spec';
import DefendantResponseSpecType from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../constants/ccd-events/cui-ccd-events/defendant-response-cui/payment-type-spec';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import User from '../../../../models/users/user';

const formatDateTime = (date: Date) =>
  `${DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' })}T00:00:00.000Z`;

const lipExpert = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      caseNeedsAnExpert: 'Yes',
      expertReportRequired: 'Yes',
    };
  }

  return {};
};

const responseType = (defendantResponseType: DefendantResponseSpecType) => ({
  respondent1ClaimResponseTypeForSpec: defendantResponseType,
  responseClaimMediationSpecRequired: 'No',
  specAoSApplicantCorrespondenceAddressRequired: 'Yes',
  ...(defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE && {
    defenceRouteRequired: DefenceRouteSpec.DISPUTE,
  }),
});

const paymentTimeRoute = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
  paymentTypeSpec: PaymentTypeSpec,
) => {
  if(
    defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    if(paymentTypeSpec === PaymentTypeSpec.IMMEDIATELY) {
      return {
        defenceAdmitPartPaymentTimeRouteRequired: paymentTypeSpec,
        respondToClaimAdmitPartLRspec: {
          whenWillThisAmountBePaid: formatDateTime(DateHelper.addToToday({ days: 7 })),
        },
      }
    } else if (paymentTypeSpec === PaymentTypeSpec.BY_SET_DATE) {
      return {
        defenceAdmitPartPaymentTimeRouteRequired: paymentTypeSpec,
        respondToClaimAdmitPartLRspec: {
          whenWillThisAmountBePaid: formatDateTime(DateHelper.addToToday({ days: 60 })),
        },
      }
    } else if (paymentTypeSpec === PaymentTypeSpec.REPAYMENT_PLAN) {
      return {
        defenceAdmitPartPaymentTimeRouteRequired: paymentTypeSpec,
        respondent1RepaymentPlan: {
          paymentAmount: ((CaseDataHelper.getClaimValue(claimTrack) / 5) * 100).toString(),
          repaymentFrequency: 'ONCE_ONE_WEEK',
          firstRepaymentDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
        },
      }
    }
  }

  return {};
};

const partAdmitPaymentDetails = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (defendantResponseType === DefendantResponseSpecType.PART_ADMISSION) {
    const owingAmount = (CaseDataHelper.getClaimValue(claimTrack) / 2).toFixed();

    return {
      specDefenceAdmittedRequired: 'No',
      respondToAdmittedClaimOwingAmountPounds: owingAmount,
      respondToAdmittedClaimOwingAmount: (Number(owingAmount) * 100).toFixed(),
    };
  }

  return {};
};

const totalClaimAmount = (claimTrack: ClaimTrack) => ({
  totalClaimAmount: CaseDataHelper.getClaimValue(claimTrack),
});

const defendant1 = (
  defendantPartyType: ClaimantDefendantPartyType,
  defendantCitizenUser: User,
) => {
  const respondent1Data = CaseDataHelper.buildClaimantAndDefendantData(
    partys.DEFENDANT_1,
    defendantPartyType,
  );

  return {
    respondent1: {
      ...respondent1Data,
      partyEmail: defendantCitizenUser.email,
      primaryAddress: {
        AddressLine1: respondent1Data.primaryAddress.AddressLine1,
        AddressLine2: respondent1Data.primaryAddress.AddressLine2,
        AddressLine3: respondent1Data.primaryAddress.AddressLine3,
        PostCode: respondent1Data.primaryAddress.PostCode,
        PostTown: respondent1Data.primaryAddress.PostTown,
      },
    },
  };
};

const lipResponse = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION) {
    return {
      respondent1LiPResponse: {
        timelineComment: 'Timeline comment',
        evidenceComment: 'Evidence comment',
        respondent1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'Telephone or video hearing reason',
          giveEvidenceYourSelf: 'Yes',
          determinationWithoutHearingReason: 'Determination without hearing reason',
          requestExtra4weeks: 'No',
          ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
            determinationWithoutHearingRequired: 'Yes',
            determinationWithoutHearingReason: 'Determination without hearing reason',
          }),
          ...(claimTrack === ClaimTrack.FAST_CLAIM && {
            triedToSettle: 'Yes',
            considerClaimantDocuments: 'Yes',
          }),
          ...((claimTrack === ClaimTrack.INTERMEDIATE_CLAIM || claimTrack === ClaimTrack.MULTI_CLAIM) && {
            triedToSettle: 'Yes',
          }),
          ...(Object.keys(lipExpert(claimTrack)).length > 0 && {
            respondent1DQLiPExpert: lipExpert(claimTrack),
          }),
        },
        respondent1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Defendant1 Individual',
                requirements: [
                  'HEARING_LOOPS',
                  'LANGUAGE_INTERPRETER',
                ],
                languageToBeInterpreted: 'Spanish',
              },
            },
          ],
        },
        respondent1ResponseLanguage: 'ENGLISH',
      },
    }; 
  }

  if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
    return {
      respondent1LiPResponse: {
        respondent1DQExtraDetails: {
          requestExtra4weeks: 'No',
        },
        respondent1ResponseLanguage: 'ENGLISH',
      },
    };
  }

  return {};
};

const mediation = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      respondent1LiPResponseCarm: {
        isMediationEmailCorrect: 'Yes',
        isMediationPhoneCorrect: 'Yes',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [
          {
            value:{
              who: 'defendant',
              date: formatDateTime(DateHelper.addToToday({ days: 60 })),
              fromDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
              unavailableDateType: 'SINGLE_DATE',
            },
          }
        ],
      },
    };
  }

  return {};
};

const disputeDetails = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE 
    || defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    const timelineEvent = {
      timelineDate: formatDateTime(DateHelper.getToday()),
      timelineDescription: 'Timeline Description 1',
    };
    const evidence = {
      evidenceType: 'CONTRACTS_AND_AGREEMENTS',
      contractAndAgreementsEvidence: 'Evidence Description 1',
    };

    return {
      detailsOfWhyDoesYouDisputeTheClaim: 'Details of claim',
      specClaimResponseTimelineList: 'MANUAL',
      specResponseTimelineOfEvents: [
        {
          value: timelineEvent,
        },
      ],
      specResponselistYourEvidenceList: [
        {
          id: '0',
          value: evidence,
        },
      ],
    };
  }

  else if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
    return {
      specClaimResponseTimelineList: 'MANUAL',
    };
  }


  return {};
};

const language = (defendantResponseType: DefendantResponseSpecType) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
    };
  }

  return {};
};

const vulnerability = (defendantResponseType: DefendantResponseSpecType) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'Vulnerable people',
      },
    };
  }

  return {};
};

const requestedCourt = (defendantResponseType: DefendantResponseSpecType) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQRequestedCourt: {
        reasonForHearingAtSpecificCourt: 'Court location reason',
        caseLocation: {
          region: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
          baseLocation: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
        },
      },
    };
  }

  return {};
};

const witnesses = (
  _claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    const { partyName, ...witness } = CaseDataHelper.buildWitnessData(
      partys.DEFENDANT_1_WITNESS_1,
    );

    return {
      respondent1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: partyName,
              ...witness,
            },
          },
        ],
      },
    };
  }

  return {};
};

const hearingSmallClaim = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      respondent1DQHearingSmallClaim: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [
          {
            value:  {
              who: 'defendant',
              date: formatDateTime(DateHelper.addToToday({ days: 60 })),
              fromDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
              unavailableDateType: 'SINGLE_DATE',
            },
          }
        ],
      },
    };
  }

  return {};
};

const hearingFastClaim = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if(
    claimTrack === ClaimTrack.FAST_CLAIM ||
    claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
    claimTrack === ClaimTrack.MULTI_CLAIM
  ) {
    if (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    ) {
      const unavailableDate = {
        who: 'defendant',
        date: formatDateTime(DateHelper.addToToday({ days: 60 })),
        fromDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
        unavailableDateType: 'SINGLE_DATE',
      };

      return {
        respondent1DQHearingFastClaim: {
          hearingLengthHours: '3',
          hearingLengthDays: '1',
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            {
              value: unavailableDate,
            },
          ],
        },
      };
    }
    else if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
      return {
        respondent1DQHearingFastClaim: {
          hearingLengthHours: '3',
          hearingLengthDays: '1',
        },
      };
    }
  }

  return {};
};

const experts = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    const { partyName, ...expert } = CaseDataHelper.buildExpertData(
      partys.DEFENDANT_1_EXPERT_1,
    );

    return {
      respondent1DQExperts: {
        expertRequired: 'Yes',
        details: [
          {
            value: {
              name: partyName,
              ...expert,
            },
          },
        ],
        ...((
          claimTrack === ClaimTrack.FAST_CLAIM ||
          claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
          claimTrack === ClaimTrack.MULTI_CLAIM
        ) && {
          expertReportsSent: 'YES',
          jointExpertSuitable: 'Yes',
        }),
      },
      ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
        responseClaimExpertSpecRequired: 'Yes',
      }),
    };
  }

  return {};
};

const hearingSupport = (defendantResponseType: DefendantResponseSpecType) => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQHearingSupport: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: 'Defendant1 Individual :Hearing loop,Language interpreter:Spanish;',
      },
    };
  }

  return {};
};

const interMultiTrackDirections = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
) => {
  if (
    (
      claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
      claimTrack === ClaimTrack.MULTI_CLAIM
    ) &&
    (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      ...(claimTrack === ClaimTrack.INTERMEDIATE_CLAIM && {
        respondent1DQFixedRecoverableCostsIntermediate: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_2',
          complexityBandingAgreed: 'Yes',
          reasons: 'Recoverable costs reason',
        },
      }),
      specRespondent1DQDisclosureOfElectronicDocuments: {
        reachedAgreement: 'Yes',
      },
      specRespondent1DQDisclosureOfNonElectronicDocuments: {
        bespokeDirections: 'Directions are proposed for disclosure',
      },
      respondent1DQClaimantDocumentsToBeConsidered: {
        hasDocumentsToBeConsidered: 'Yes',
        details: 'Claimant documents to be considered',
      },
    };
  }

  return {};
};

const financialDetails = (
  defendantResponseType: DefendantResponseSpecType,
  paymentTypeSpec: PaymentTypeSpec,
) => {
  if (
    (
      defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    ) && (
      paymentTypeSpec === PaymentTypeSpec.BY_SET_DATE 
      || paymentTypeSpec === PaymentTypeSpec.REPAYMENT_PLAN
    )
  ) {
    return {
      respondent1LiPFinancialDetails: {
        partnerPensionLiP: 'Yes',
        partnerDisabilityLiP: 'Yes',
        partnerSevereDisabilityLiP: 'Yes',
      },
      respondent1BankAccountList: [
        {
          value: {
            accountType: 'CURRENT',
            jointAccount: 'Yes',
            balance: '100',
          },
        },
      ],
      disabilityPremiumPayments: 'Yes',
      severeDisabilityPremiumPayments: 'Yes',
      respondent1DQHomeDetails: {
        type: 'PRIVATE_RENTAL',
      },
      respondent1PartnerAndDependent: {
        liveWithPartnerRequired: 'Yes',
        partnerAgedOver: 'Yes',
        haveAnyChildrenRequired: 'Yes',
        howManyChildrenByAgeGroup: {
          numberOfUnderEleven: '1',
          numberOfElevenToFifteen: '0',
          numberOfSixteenToNineteen: '0',
        },
        supportedAnyoneFinancialRequired: 'Yes',
        supportPeopleNumber: '2',
        supportPeopleDetails: 'Details of financial dependants',
      },
      defenceAdmitPartEmploymentTypeRequired: 'Yes',
      respondToClaimAdmitPartEmploymentTypeLRspec: [
        'EMPLOYED',
        'SELF',
      ],
      responseClaimAdmitPartEmployer: {
        employerDetails: [
          {
            value: {
              employerName: 'Company',
              jobTitle: 'CEO',
            },
          },
        ],
      },
      specDefendant1SelfEmploymentDetails: {
        jobTitle: 'Trade',
        annualTurnover: '50000',
        isBehindOnTaxPayment: 'Yes',
        amountOwed: '70000',
        reason: 'Behind on tax payment reason',
      },
      respondToClaimAdmitPartUnemployedLRspec: {
        unemployedComplexTypeRequired: 'RETIRED',
        lengthOfUnemployment: {
          numberOfYearsInUnemployment: null,
          numberOfMonthsInUnemployment: null,
        },
      },
      respondent1CourtOrderPaymentOption: 'Yes',
      respondent1CourtOrderDetails: [
        {
          value: {
            claimNumberText: '1234',
            amountOwed: '80000',
            monthlyInstalmentAmount: '5000',
          },
        },
      ],
      respondent1LoanCreditOption: 'Yes',
      respondent1LoanCreditDetails: [
        {
          value: {
            loanCardDebtDetail: 'Credit card debt',
            totalOwed: '100000',
            monthlyPayment: '2600',
          },
        },
      ],
      responseToClaimAdmitPartWhyNotPayLRspec: 'Reason why I cannot pay immediately',
      specDefendant1Debts: {
        debtDetails: [
          {
            value: {
              debtType: 'MORTGAGE',
              paymentAmount: '10000',
              paymentFrequency: 'ONCE_ONE_WEEK',
            },
          },
          {
            value: {
              debtType: 'COUNCIL_TAX',
              paymentAmount: '10000',
              paymentFrequency: 'ONCE_ONE_WEEK',
            },
          },
          {
            value: {
              debtType: 'ELECTRICITY',
              paymentAmount: '10000',
              paymentFrequency: 'ONCE_ONE_WEEK',
            },
          },
        ],
      },
      respondent1DQRecurringIncomeFA: [
        {
          value: {
            type: 'UNIVERSAL_CREDIT',
            amount: '10000',
            frequency: 'ONCE_ONE_WEEK',
          },
        },
        {
          value: {
            type: 'OTHER',
            amount: '10000',
            frequency: 'ONCE_ONE_WEEK',
            typeOtherDetails: 'Other source of income',
          },
        },
      ],
      respondent1DQRecurringExpensesFA: [
        {
          value: {
            type: 'WATER',
            amount: '10000',
            frequency: 'ONCE_TWO_WEEKS',
          },
        },
        {
          value: {
            type: 'FOOD',
            amount: '10000',
            frequency: 'ONCE_ONE_WEEK',
          },
        },
        {
          value: {
            type: 'TV',
            amount: '10000',
            frequency: 'ONCE_ONE_WEEK',
          },
        },
      ],
    };
  }

  return {};
};

const respondentResponsePcq = () => ({
  respondentResponsePcqId: CaseDataHelper.getUuid(),
});

const defendantResponseCuiDataBuilderComponents = {
  responseType,
  paymentTimeRoute,
  partAdmitPaymentDetails,
  totalClaimAmount,
  defendant1,
  lipResponse,
  mediation,
  disputeDetails,
  language,
  vulnerability,
  requestedCourt,
  witnesses,
  hearingSmallClaim,
  hearingFastClaim,
  experts,
  hearingSupport,
  interMultiTrackDirections,
  financialDetails,
  respondentResponsePcq,
};

export default defendantResponseCuiDataBuilderComponents;
