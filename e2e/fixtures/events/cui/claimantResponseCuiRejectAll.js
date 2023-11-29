const config = require('../../../config');

module.exports = {
  createClaimantIntendsToProceedResponse: () => {
    const claimantResponseData = {
      event: 'CLAIMANT_RESPONSE_SPEC',
      caseData: {
        applicant1: {
          partyID: 'df27d531-4a46-4a',
          type: 'COMPANY',
          companyName: 'Test Inc',
          primaryAddress: {
            AddressLine1: 'Flat 2 - applicant',
            AddressLine2: 'Caversham House 15-17',
            AddressLine3: 'Church Road',
            PostTown: 'Reading',
            County: 'Kent',
            Country: 'United Kingdom',
            PostCode: 'RG4 7AA',
          },
          partyName: 'Test Inc',
          partyTypeDisplayValue: 'Company',
          flags: {
            partyName: 'Test Inc',
            roleOnCase: 'Applicant 1',
          },
          unavailableDates: null,
        },
        respondent1: {
          type: 'INDIVIDUAL',
          individualTitle: 'Sir',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualDateOfBirth: '1987-11-01',
          primaryAddress: {
            AddressLine1: 'TestAddressLine1',
            AddressLine2: 'TestAddressLine2',
            AddressLine3: 'TestAddressLine3',
            PostTown: 'TestCity',
            PostCode: 'IG61JD',
          },
          partyName: 'Sir John Doe',
          partyTypeDisplayValue: 'Individual',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          partyPhone: '07123456789',
          unavailableDates: null,
          flags: null,
        },
        partAdmitPaidValuePounds: null,
        respondent2: null,
        claimantResponseScenarioFlag: 'ONE_V_ONE',
        respondToAdmittedClaimOwingAmountPounds: null,
        respondent1PaymentDateToStringSpec: '22 June 2023',
        respondent1ClaimResponseDocumentSpec: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent1GeneratedResponseDocument: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent2GeneratedResponseDocument: null,
        applicant1ProceedWithClaim: 'Yes',
        applicant1AcceptAdmitAmountPaidSpec: null,
        applicant1PartAdmitConfirmAmountPaidSpec: null,
        applicant1AcceptPartAdmitPaymentPlanSpec: null,
        applicant1AcceptFullAdmitPaymentPlanSpec: null,
        applicantDefenceResponseDocumentAndDQFlag: null,
        showConditionFlags: null,
        applicant1ProceedWithClaimSpec2v1: null,
        responseClaimTrack: 'FAST_CLAIM',
        allocatedTrack: null,
        claimType: null,
        defenceRouteRequired: 'DISPUTES_THE_CLAIM',
        respondentResponseIsSame: null,
        defendantSingleResponseToBothClaimants: null,
        respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
        defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
        showResponseOneVOneFlag: 'ONE_V_ONE_FULL_DEFENCE',
        applicant1DefenceResponseDocumentSpec: null,
        applicant1DQFileDirectionsQuestionnaire: {
          oneMonthStayRequested: 'No',
          reactionProtocolCompliedWith: 'Yes',
          reactionProtocolNotCompliedWithReason: null,
          explainedToClient: [
            'CONFIRM',
          ],
        },
        applicant1DQDisclosureOfElectronicDocuments: {
          reachedAgreement: 'Yes',
          agreementLikely: null,
          reasonForNoAgreement: null,
        },
        specApplicant1DQDisclosureOfNonElectronicDocuments: null,
        applicant1DQDisclosureReport: {
          disclosureFormFiledAndServed: 'No',
          disclosureProposalAgreed: 'No',
          draftOrderNumber: null,
        },
        applicant1DQExperts: {
          expertRequired: 'No',
          expertReportsSent: null,
          jointExpertSuitable: null,
          details: [

          ],
        },
        applicant1DQWitnesses: {
          witnessesToAppear: 'No',
          details: [

          ],
        },
        applicant1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH',
          evidence: null,
        },
        applicant1DQSmallClaimHearing: null,
        applicant1DQHearingLRspec: {
          hearingLengthHours: null,
          hearingLengthDays: null,
          unavailableDatesRequired: 'No',
          hearingLength: null,
          unavailableDates: [

          ],
        },
        applicant1DQRequestedCourt: {
          responseCourtLocations: {
            value: {
              code: '350aa935-4d80-4762-9a4e-2a8f3eaad9fc',
              label: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
            },
            list_items: [
              {
                code: '350aa935-4d80-4762-9a4e-2a8f3eaad9fc',
                label: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
              },
            ],
          },
          reasonForHearingAtSpecificCourt: 'reasons',
          responseCourtCode: null,
          caseLocation: {
            region: null,
            baseLocation: null,
          },
        },
        applicant1DQHearingSupport: {
          signLanguageRequired: null,
          languageToBeInterpreted: null,
          otherSupport: null,
          supportRequirements: 'No',
          supportRequirementsAdditional: null,
          requirements: [

          ],
        },
        applicant1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'No',
          vulnerabilityAdjustments: null,
        },
        applicant1DQFutureApplications: {
          intentionToMakeFutureApplications: 'No',
          whatWillFutureApplicationsBeMadeFor: null,
        },
        applicant1AdditionalInformationForJudge: 'other info',
        uiStatementOfTruth: {
          name: 'claimant',
          role: 'nameandrole',
        },
      },
    };
    return claimantResponseData;
  },
  rejectAllAlreadyPaidButClaimantWantsToProceed: () => {
    return {
      event: 'CLAIMANT_RESPONSE_SPEC',
      caseData: {
        respondent1: {
          type: 'INDIVIDUAL',
          individualTitle: 'Sir',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualDateOfBirth: '1987-11-01',
          primaryAddress: {
            AddressLine1: 'Test AddressLine1',
            AddressLine2: 'Test AddressLine2',
            AddressLine3: 'Test AddressLine3',
            PostTown: 'Test City',
            PostCode: 'IG6 1JD',
          },
          partyName: 'Sir John Doe',
          partyTypeDisplayValue: 'Individual',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          unavailableDates: null,
          flags: null,
        },
        applicant1: {
          partyID: '08d32305-1469-4b',
          type: 'COMPANY',
          companyName: 'Test Inc',
          primaryAddress: {
            AddressLine1: 'Flat 2 - applicant',
            AddressLine2: 'Caversham House 15-17',
            AddressLine3: 'Church Road',
            PostTown: 'Reading',
            County: 'Kent',
            Country: 'United Kingdom',
            PostCode: 'RG4 7AA',
          },
          partyName: 'Test Inc',
          partyTypeDisplayValue: 'Company',
          flags: {
            partyName: 'Test Inc',
            roleOnCase: 'Applicant 1',
          },
          unavailableDates: null,
        },
        respondent2: null,
        partAdmitPaidValuePounds: null,
        claimantResponseScenarioFlag: 'ONE_V_ONE',
        respondToAdmittedClaimOwingAmountPounds: null,
        respondent1PaymentDateToStringSpec: '03 July 2023',
        respondent1GeneratedResponseDocument: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent1ClaimResponseDocumentSpec: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent2GeneratedResponseDocument: null,
        applicant1AcceptAdmitAmountPaidSpec: null,
        applicant1ProceedWithClaim: 'Yes',
        applicant1PartAdmitConfirmAmountPaidSpec: null,
        applicant1AcceptFullAdmitPaymentPlanSpec: null,
        applicant1AcceptPartAdmitPaymentPlanSpec: null,
        applicantDefenceResponseDocumentAndDQFlag: null,
        applicant1ProceedWithClaimSpec2v1: null,
        showConditionFlags: null,
        responseClaimTrack: 'SMALL_CLAIM',
        allocatedTrack: null,
        claimType: null,
        defenceRouteRequired: 'HAS_PAID_THE_AMOUNT_CLAIMED',
        respondentResponseIsSame: null,
        defendantSingleResponseToBothClaimants: null,
        respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
        defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
        showResponseOneVOneFlag: 'ONE_V_ONE_FULL_DEFENCE',
        applicant1DefenceResponseDocumentSpec: null,
        applicant1ClaimMediationSpecRequiredLip: {
          hasAgreedFreeMediation: 'No',
        },
        applicantMPClaimMediationSpecRequired: null,
        applicant1ClaimMediationSpecRequired: null,
        applicant1ClaimExpertSpecRequired: 'No',
        applicantMPClaimExpertSpecRequired: null,
        applicant1RespondToClaimExperts: null,
        applicant1ClaimWitnesses: '1',
        applicant1DQWitnessesSmallClaim: {
          witnessesToAppear: 'No',
          details: [

          ],
        },
        applicant1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH',
          evidence: null,
        },
        applicant1DQSmallClaimHearing: {
          unavailableDatesRequired: 'No',
          smallClaimUnavailableDate: [

          ],
        },
        applicant1DQHearingLRspec: null,
        applicant1DQRequestedCourt: {
          responseCourtLocations: {
            value: {
              code: '18ff11c1-223d-4b73-b8a3-929b63b84e73',
              label: config.claimantLRSelectedCourtCui,
            },
            list_items: [
              {
                code: '18ff11c1-223d-4b73-b8a3-929b63b84e73',
                label: config.claimantLRSelectedCourtCui,
              },
            ],
          },
          reasonForHearingAtSpecificCourt: 'reasons',
          responseCourtCode: null,
          caseLocation: {
            region: null,
            baseLocation: null,
          },
        },
        applicant1DQHearingSupport: {
          signLanguageRequired: null,
          languageToBeInterpreted: null,
          otherSupport: null,
          supportRequirements: 'No',
          supportRequirementsAdditional: null,
          requirements: [

          ],
        },
        applicant1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'No',
          vulnerabilityAdjustments: null,
        },
        uiStatementOfTruth: {
          name: 'claimant lr',
          role: 'claimant role',
        },
      },
    };
  },

  rejectAllDisputeAllButClaimantWantsToProceedWithMediation: () => {
    return {
      event: 'CLAIMANT_RESPONSE_SPEC',
      caseData: {
        respondent1: {
          type: 'INDIVIDUAL',
          individualTitle: 'Sir',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualDateOfBirth: '1987-11-01',
          primaryAddress: {
            AddressLine1: 'Test AddressLine1',
            AddressLine2: 'Test AddressLine2',
            AddressLine3: 'Test AddressLine3',
            PostTown: 'Test City',
            PostCode: 'IG6 1JD',
          },
          partyName: 'Sir John Doe',
          partyTypeDisplayValue: 'Individual',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          unavailableDates: null,
          flags: null,
        },
        applicant1: {
          partyID: '507e30a9-438b-47',
          type: 'COMPANY',
          companyName: 'Test Inc',
          primaryAddress: {
            AddressLine1: 'Flat 2 - applicant',
            AddressLine2: 'Caversham House 15-17',
            AddressLine3: 'Church Road',
            PostTown: 'Reading',
            County: 'Kent',
            Country: 'United Kingdom',
            PostCode: 'RG4 7AA',
          },
          partyName: 'Test Inc',
          partyTypeDisplayValue: 'Company',
          flags: {
            partyName: 'Test Inc',
            roleOnCase: 'Applicant 1',
          },
          unavailableDates: null,
        },
        respondent2: null,
        partAdmitPaidValuePounds: null,
        claimantResponseScenarioFlag: 'ONE_V_ONE',
        respondToAdmittedClaimOwingAmountPounds: null,
        respondent1PaymentDateToStringSpec: '03 July 2023',
        respondent1GeneratedResponseDocument: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent1ClaimResponseDocumentSpec: {
          documentName: null,
          documentType: null,
          documentSize: '0',
          createdDatetime: null,
          createdBy: null,
        },
        respondent2GeneratedResponseDocument: null,
        applicant1AcceptAdmitAmountPaidSpec: null,
        applicant1ProceedWithClaim: 'Yes',
        applicant1PartAdmitConfirmAmountPaidSpec: null,
        applicant1AcceptFullAdmitPaymentPlanSpec: null,
        applicant1AcceptPartAdmitPaymentPlanSpec: null,
        applicantDefenceResponseDocumentAndDQFlag: null,
        applicant1ProceedWithClaimSpec2v1: null,
        showConditionFlags: null,
        responseClaimTrack: 'SMALL_CLAIM',
        allocatedTrack: null,
        claimType: null,
        defenceRouteRequired: 'DISPUTES_THE_CLAIM',
        respondentResponseIsSame: null,
        defendantSingleResponseToBothClaimants: null,
        respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
        defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY',
        showResponseOneVOneFlag: 'ONE_V_ONE_FULL_DEFENCE',
        applicant1DefenceResponseDocumentSpec: null,
        applicant1ClaimMediationSpecRequiredLip: {
          hasAgreedFreeMediation: 'Yes',
        },
        applicantMPClaimMediationSpecRequired: null,
        applicant1ClaimMediationSpecRequired: null,
        applicant1ClaimExpertSpecRequired: 'Yes',
        applicantMPClaimExpertSpecRequired: null,
        applicant1RespondToClaimExperts: {
          firstName: 'Expertone',
          lastName: 'expertname',
          phoneNumber: '08444515236',
          emailAddress: 'expert@gmail.com',
          fieldofExpertise: 'field',
          whyRequired: 'expert needed',
          estimatedCost: '2500',
          expertName: null,
        },
        applicant1ClaimWitnesses: '4',
        applicant1DQWitnessesSmallClaim: {
          witnessesToAppear: 'No',
          details: [

          ],
        },
        applicant1DQLanguage: {
          court: 'BOTH',
          documents: 'ENGLISH',
          evidence: null,
        },
        applicant1DQSmallClaimHearing: {
          unavailableDatesRequired: 'No',
          smallClaimUnavailableDate: [

          ],
        },
        applicant1DQHearingLRspec: null,
        applicant1DQRequestedCourt: {
          responseCourtLocations: {
            value: {
              code: '18ff11c1-223d-4b73-b8a3-929b63b84e73',
              label: config.claimantLRSelectedCourt,
            },
            list_items: [
              {
                code: '18ff11c1-223d-4b73-b8a3-929b63b84e73',
                label: config.claimantLRSelectedCourt,
              },
            ],
          },
          reasonForHearingAtSpecificCourt: 'reasons',
          responseCourtCode: null,
          caseLocation: {
            region: null,
            baseLocation: null,
          },
        },
        applicant1DQHearingSupport: {
          signLanguageRequired: null,
          languageToBeInterpreted: null,
          otherSupport: null,
          supportRequirements: 'Yes',
          supportRequirementsAdditional: 'Support with access needs',
          requirements: [

          ],
        },
        applicant1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'Yes',
          vulnerabilityAdjustments: 'Vulnerability Questions',
        },
        uiStatementOfTruth: {
          name: 'claimant lr',
          role: 'claimant role',
        },
      },
    };
  },
};
