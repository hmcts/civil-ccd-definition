const {date} = require('../../../api/dataHelper');
const config = require('../../../config.js');

const lipDefendantData = {
  PA_INSTALLMENTS_INDIVIDUAL: {
    event: 'DEFENDANT_RESPONSE_CUI',
    caseDataUpdate: {
      respondent1ClaimResponseTypeForSpec: 'PART_ADMISSION',
      defenceAdmitPartPaymentTimeRouteRequired: 'SUGGESTION_OF_REPAYMENT_PLAN',
      respondent1RepaymentPlan: {
        paymentAmount: 10000,
        repaymentFrequency: 'ONCE_ONE_MONTH',
        firstRepaymentDate: date(40),
      },
      responseClaimMediationSpecRequired: 'No',
      specAoSApplicantCorrespondenceAddressRequired: 'Yes',
      totalClaimAmount: 1500,
      respondent1: {
        companyName: undefined,
        individualDateOfBirth: '1993-08-28',
        individualFirstName: 'defendant',
        individualLastName: 'person',
        individualTitle: 'mr',
        organisationName: undefined,
        partyEmail: 'civilmoneyclaimsdemo@gmail.com',
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: '123',
          AddressLine2: 'Claim Road',
          AddressLine3: '',
          PostCode: 'L7 2PZ',
          PostTown: 'Liverpool',
        },
        soleTraderDateOfBirth: null,
        soleTraderFirstName: undefined,
        soleTraderLastName: undefined,
        soleTraderTitle: undefined,
        soleTraderTradingAs: undefined,
        type: 'INDIVIDUAL',
      },
      respondent1LiPResponse: {
        timelineComment: '',
        evidenceComment: '',
        respondent1MediationLiPResponse: {
          mediationDisagreementLiP: 'No',
          noMediationReasonLiP: 'JUDGE_TO_DECIDE',
          noMediationOtherReasonLiP: '',
        },
        respondent1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'No',
          whyPhoneOrVideoHearing: '',
          giveEvidenceYourSelf: 'No',
          determinationWithoutHearingRequired: 'Yes',
          determinationWithoutHearingReason: '',
          considerClaimantDocumentsDetails: '',
          respondent1DQLiPExpert: {
            expertCanStillExamineDetails: '',
          }
        },
        respondent1DQHearingSupportLip: {
          supportRequirementLip: 'No',
          requirementsLip: undefined,
        },
        respondent1ResponseLanguage: 'ENGLISH',
      },
      specDefenceAdmittedRequired: 'No',
      respondToAdmittedClaimOwingAmountPounds: '500',
      respondToAdmittedClaimOwingAmount: '50000',
      detailsOfWhyDoesYouDisputeTheClaim: 'test',
      specClaimResponseTimelineList: 'MANUAL',
      disabilityPremiumPayments: 'No',
      respondent1DQHomeDetails: {
        type: 'PRIVATE_RENTAL',
        typeOtherDetails: '',
      },
      respondent1PartnerAndDependent: {
        liveWithPartnerRequired: 'No',
        partnerAgedOver: undefined,
        haveAnyChildrenRequired: 'No',
        supportedAnyoneFinancialRequired: 'No',
      },
      defenceAdmitPartEmploymentTypeRequired: 'No',
      respondToClaimAdmitPartUnemployedLRspec: {
        unemployedComplexTypeRequired: 'RETIRED',
        otherUnemployment: '',
      },
      respondent1CourtOrderPaymentOption: 'No',
      respondent1LoanCreditOption: 'No',
      responseToClaimAdmitPartWhyNotPayLRspec: 'test',
      respondent1DQCarerAllowanceCredit: 'No',
      respondent1DQLanguage: {
        evidence: undefined,
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
      respondent1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'No',
        vulnerabilityAdjustments: undefined,
      },
      respondent1DQRequestedCourt: {
        requestHearingAtSpecificCourt: 'No',
        otherPartyPreferredSite: '',
        responseCourtCode: '',
      },
      respondent1DQWitnesses: {
        witnessesToAppear: 'No'
      },
      respondent1DQHearingSmallClaim: {
        unavailableDatesRequired: 'No',
        smallClaimUnavailableDate: undefined,
      }
    },
  },
  FA_SETDATE_INDIVIDUAL: {
    event: 'DEFENDANT_RESPONSE_CUI',
    caseDataUpdate: {
      respondent1ClaimResponseTypeForSpec: 'FULL_ADMISSION',
      defenceAdmitPartPaymentTimeRouteRequired: 'BY_SET_DATE',
      respondent1RepaymentPlan: undefined,
      respondToClaimAdmitPartLRspec: {
        whenWillThisAmountBePaid: date(40),
      },
      responseClaimMediationSpecRequired: 'No',
      specAoSApplicantCorrespondenceAddressRequired: 'Yes',
      totalClaimAmount: 1500,
      respondent1: {
        companyName: undefined,
        individualDateOfBirth: '1993-08-28',
        individualFirstName: 'defendant',
        individualLastName: 'person',
        individualTitle: 'mr',
        organisationName: undefined,
        partyEmail: 'civilmoneyclaimsdemo@gmail.com',
        partyPhone: '07800000000',
        primaryAddress: {
          AddressLine1: '123',
          AddressLine2: 'Claim Road',
          AddressLine3: '',
          PostCode: 'L7 2PZ',
          PostTown: 'Liverpool',
        },
        type: 'INDIVIDUAL',
      },
      respondent1LiPResponse: {
        timelineComment: undefined,
        evidenceComment: undefined,
        respondent1MediationLiPResponse: undefined,
        respondent1DQExtraDetails: {},
        respondent1DQHearingSupportLip: {},
        respondent1ResponseLanguage: 'ENGLISH',
      },
      respondent1LiPResponseCarm: undefined,
      respondent1LiPFinancialDetails: {},
      specClaimResponseTimelineList: 'MANUAL',
      specResponseTimelineOfEvents: [],
      disabilityPremiumPayments: 'No',
      respondent1DQHomeDetails: {
        type: 'PRIVATE_RENTAL',
        typeOtherDetails: '',
      },
      respondent1PartnerAndDependent: {
        liveWithPartnerRequired: 'No',
        partnerAgedOver: undefined,
        haveAnyChildrenRequired: 'No',
        supportedAnyoneFinancialRequired: 'No',
      },
      defenceAdmitPartEmploymentTypeRequired: 'No',
      respondToClaimAdmitPartUnemployedLRspec: {
        unemployedComplexTypeRequired: 'RETIRED',
        lengthOfUnemployment: {
          numberOfYearsInUnemployment: null,
          numberOfMonthsInUnemployment: null,
        },
        otherUnemployment: '',
      },
      respondent1CourtOrderPaymentOption: 'No',
      respondent1CourtOrderDetails: [
      ],
      respondent1LoanCreditOption: 'No',
      responseToClaimAdmitPartWhyNotPayLRspec: 'test',
      respondent1DQCarerAllowanceCreditFullAdmission: 'No',
    },
  }
};
module.exports = {
  createDefendantResponse: (totalClaimAmount, carmEnabled = false, typeOfResponse = '') => {
    const defendantResponseData = {
      event: 'DEFENDANT_RESPONSE_CUI',
      caseDataUpdate: {
        respondent1ClaimResponseTypeForSpec: typeOfResponse === 'FULL_ADMISSION' ? 'FULL_ADMISSION' : 'FULL_DEFENCE',
        ...(typeOfResponse === 'FULL_ADMISSION' || typeOfResponse === 'PART_ADMISSION'? {
          defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
        }: {}),
        respondToClaimAdmitPartLRspec: typeOfResponse === 'FULL_ADMISSION' ? {
          whenWillThisAmountBePaid: '2020-01-01'
        } : {},
        responseClaimMediationSpecRequired: 'No',
        specAoSApplicantCorrespondenceAddressRequired: 'No',
        totalClaimAmount: totalClaimAmount,
        respondent1: {
          individualDateOfBirth: '1987-11-01T00:00:00.000Z',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualTitle: 'Sir',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          partyPhone: '07123456789',
          primaryAddress: {
            AddressLine1: 'TestAddressLine1',
            AddressLine2: 'TestAddressLine2',
            AddressLine3: 'TestAddressLine3',
            PostCode: 'IG61JD',
            PostTown: 'TestCity',
          },
          type: 'INDIVIDUAL',
        },
        respondent1LiPResponse: {
          respondent1LiPFinancialDetails: {

          },
          respondent1DQExtraDetails: {
            wantPhoneOrVideoHearing: 'No',
            giveEvidenceYourSelf: 'No',
            triedToSettle: 'No',
            determinationWithoutHearingRequired: 'No',
            determinationWithoutHearingReason: 'TestReason',
            requestExtra4weeks: 'No',
            considerClaimantDocuments: 'No',
            respondent1DQLiPExpert: {
              caseNeedsAnExpert: 'No',
            },
          },
          respondent1DQHearingSupportLip: {
            supportRequirementLip: 'No',
          },
          respondent1ResponseLanguage: 'ENGLISH',
        },
        respondent1LiPResponseCarm: {
          isMediationPhoneCorrect: 'No',
          alternativeMediationTelephone: '01632960001',
          isMediationEmailCorrect: 'No',
          alternativeMediationEmail: 'test@test.com',
          hasUnavailabilityNextThreeMonths: 'Yes',
          unavailableDatesForMediation: [
            {
              id: '8f76a758-733b-42c0-95b9-69b3ee2b7e6a',
              value: {
                who: 'defendant',
                date: '2024-01-01',
                fromDate: '2024-01-01',
                unavailableDateType: 'SINGLE_DATE'
              }
            },
            {
              id: '38abd745-a52f-4ec1-86a9-2e2457b2f28b',
              value: {
                who: 'defendant',
                date: '2024-03-13',
                toDate: '2024-03-23',
                fromDate: '2024-03-13',
                unavailableDateType: 'DATE_RANGE'
              }
            }
          ],
          isMediationContactNameCorrect: 'No',
          alternativeMediationContactPerson: 'aaa'
        },
        detailsOfWhyDoesYouDisputeTheClaim: 'Testreason',
        specClaimResponseTimelineList: 'MANUAL',
        specResponseTimelineOfEvents: [],
        specResponselistYourEvidenceList: [

        ],
        defenceRouteRequired: 'DISPUTES_THE_CLAIM',
        respondToClaim: {
          howMuchWasPaid: null,
        },
        respondent1DQHomeDetails: {

        },
        respondent1PartnerAndDependent: {
          howManyChildrenByAgeGroup: {

          },
        },
        specDefendant1SelfEmploymentDetails: {

        },
        respondToClaimAdmitPartUnemployedLRspec: {

        },
        respondent1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH',
        },
        respondent1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'No',
        },
        respondent1DQRequestedCourt: {
          requestHearingAtSpecificCourt: 'Yes',
          otherPartyPreferredSite: '',
          responseCourtCode: '',
          reasonForHearingAtSpecificCourt: 'court',
          responseCourtLocations: [],
          caseLocation: {
            region: config.defendantSelectedCourt,
            baseLocation: config.defendantSelectedCourtEpimm
          }
        },
        respondent1DQWitnesses: {
          witnessesToAppear: 'No',
        },
        respondent1DQHearingFastClaim: {
          hearingLengthHours: '3',
          hearingLengthDays: '1',
          unavailableDatesRequired: 'No',
        },
        respondent1DQExperts: {
          expertRequired: 'No',
        },
      },
    };
    const defendantResponseDataCarm = {
      event: 'DEFENDANT_RESPONSE_CUI',
      caseDataUpdate: {
        respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
        defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
        respondToClaimAdmitPartLRspec: {},
        responseClaimMediationSpecRequired: 'No',
        specAoSApplicantCorrespondenceAddressRequired: 'Yes',
        totalClaimAmount: 1500,
        respondent1: {
          individualDateOfBirth: null,
          organisationName: 'Sir John Doe',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          partyPhone: '07777777777',
          primaryAddress: {
            AddressLine1: '1',
            AddressLine2: '',
            AddressLine3: '',
            PostCode: 'E1 6AN',
            PostTown: 'London'
          },
          soleTraderDateOfBirth: null,
          type: 'ORGANISATION'
        },
        respondent1LiPResponse: {
          timelineComment: 'Add any comments about their timeline (optional)',
          evidenceComment: 'disagree',
          respondent1DQExtraDetails: {
            wantPhoneOrVideoHearing: 'Yes',
            whyPhoneOrVideoHearing: 'video',
            giveEvidenceYourSelf: 'Yes',
            determinationWithoutHearingRequired: 'Yes',
            determinationWithoutHearingReason: '',
            considerClaimantDocumentsDetails: '',
            respondent1DQLiPExpert: {
              caseNeedsAnExpert: 'No',
              expertCanStillExamineDetails: ''
            }
          },
          respondent1DQHearingSupportLip: {
            supportRequirementLip: 'Yes',
            requirementsLip: [
              {
                value: {
                  name: 'Whit Nessie',
                  requirements: [
                    'DISABLED_ACCESS',
                    'HEARING_LOOPS'
                  ],
                  signLanguageRequired: '',
                  languageToBeInterpreted: '',
                  otherSupport: ''
                }
              }
            ]
          },
          respondent1LiPContactPerson: 'contact person',
          respondent1ResponseLanguage: 'ENGLISH'
        },
        respondent1LiPResponseCarm: {
          isMediationContactNameCorrect: 'No',
          alternativeMediationContactPerson: 'new defendant cp',
          isMediationEmailCorrect: 'No',
          alternativeMediationEmail: 'defendantmediation@email.com',
          isMediationPhoneCorrect: 'No',
          alternativeMediationTelephone: '07744444444',
          hasUnavailabilityNextThreeMonths: 'Yes',
          unavailableDatesForMediation: [
            {
              value: {
                who: 'defendant',
                date: date(30),
                fromDate: date(30),
                unavailableDateType: 'SINGLE_DATE'
              }
            },
            {
              value: {
                who: 'defendant',
                date: date(40),
                fromDate: date(40),
                toDate: date(45),
                unavailableDateType: 'DATE_RANGE'
              }
            }
          ]
        },
        respondent1LiPFinancialDetails: {},
        detailsOfWhyDoesYouDisputeTheClaim: 'reasons',
        specClaimResponseTimelineList: 'MANUAL',
        specResponseTimelineOfEvents: [
          {
            value: {
              timelineDate: date(-100),
              timelineDescription: 'asd'
            }
          }
        ],
        specResponselistYourEvidenceList: [
          {
            id: '0',
            value: {
              evidenceType: 'PHOTO_EVIDENCE',
              photoEvidence: ''
            }
          }
        ],
        defenceRouteRequired: 'HAS_PAID_THE_AMOUNT_CLAIMED',
        respondToClaim: {
          howMuchWasPaid: 95000,
          howWasThisAmountPaid: 'OTHER',
          whenWasThisAmountPaid: '2000-01-01T00:00:00.000Z',
          howWasThisAmountPaidOther: 'card'
        },
        respondent1DQHomeDetails: {},
        respondent1PartnerAndDependent: {
          howManyChildrenByAgeGroup: {}
        },
        specDefendant1SelfEmploymentDetails: {},
        respondToClaimAdmitPartUnemployedLRspec: {},
        respondent1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH'
        },
        respondent1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'Yes',
          vulnerabilityAdjustments: 'vulnerable'
        },
        respondent1DQRequestedCourt: {
          requestHearingAtSpecificCourt: 'Yes',
          otherPartyPreferredSite: '',
          responseCourtCode: '',
          reasonForHearingAtSpecificCourt: 'court',
          responseCourtLocations: [],
          caseLocation: {
            region: config.defendantSelectedCourt,
            baseLocation: config.defendantSelectedCourtEpimm
          }
        },
        respondent1DQWitnesses: {
          witnessesToAppear: 'Yes',
          details: [
            {
              value: {
                name: 'Whit',
                firstName: 'Whit',
                lastName: 'Nessie',
                emailAddress: '',
                phoneNumber: '',
                reasonForWitness: 'asd'
              }
            }
          ]
        },
        respondent1DQHearingSmallClaim: {
          unavailableDatesRequired: 'Yes',
          smallClaimUnavailableDate: [
            {
              value: {
                who: 'defendant',
                date: date(30),
                fromDate: date(30),
                unavailableDateType: 'SINGLE_DATE'
              }
            },
            {
              value: {
                who: 'defendant',
                date: date(40),
                fromDate: date(40),
                toDate: date(45),
                unavailableDateType: 'DATE_RANGE'
              }
            }
          ]
        },
        respondent1DQExperts: {}
      }
    };
    if (lipDefendantData[typeOfResponse]) {
      lipDefendantData[typeOfResponse].caseDataUpdate.totalClaimAmount = totalClaimAmount;
      return lipDefendantData[typeOfResponse];
    }
    return carmEnabled ? defendantResponseDataCarm : defendantResponseData;
  },
};
