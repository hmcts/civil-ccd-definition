module.exports = {
  createDefendantResponse: (totalClaimAmount) => {
    const defendantResponseData = {
      event: 'DEFENDANT_RESPONSE_CUI',
      caseDataUpdate: {
        respondent1ClaimResponseTypeForSpec:'FULL_DEFENCE',
        defenceAdmitPartPaymentTimeRouteRequired:'IMMEDIATELY',
        respondToClaimAdmitPartLRspec:{

        },
        responseClaimMediationSpecRequired:'No',
        specAoSApplicantCorrespondenceAddressRequired:'No',
        totalClaimAmount:totalClaimAmount,
        respondent1:{
          individualDateOfBirth:'1987-11-01T00:00:00.000Z',
          individualFirstName:'John',
          individualLastName:'Doe',
          individualTitle:'Sir',
          partyEmail:'civilmoneyclaimsdemo@gmail.com',
          partyPhone:'07123456789',
          primaryAddress:{
            AddressLine1:'TestAddressLine1',
            AddressLine2:'TestAddressLine2',
            AddressLine3:'TestAddressLine3',
            PostCode:'IG61JD',
            PostTown:'TestCity',
          },
          type:'INDIVIDUAL',
        },
        respondent1LiPResponse:{
          respondent1LiPFinancialDetails:{

          },
          respondent1DQExtraDetails:{
            wantPhoneOrVideoHearing:'No',
            giveEvidenceYourSelf:'No',
            triedToSettle:'No',
            determinationWithoutHearingRequired:'No',
            determinationWithoutHearingReason:'TestReason',
            requestExtra4weeks:'No',
            considerClaimantDocuments:'No',
            respondent1DQLiPExpert:{
              caseNeedsAnExpert:'No',
            },
          },
          respondent1DQHearingSupportLip:{
            supportRequirementLip:'No',
          },
          respondent1ResponseLanguage:'ENGLISH',
        },
        respondent1LiPResponseCarm:{
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
        detailsOfWhyDoesYouDisputeTheClaim:'Testreason',
        specClaimResponseTimelineList:'MANUAL',
        specResponseTimelineOfEvents:[

        ],
        specResponselistYourEvidenceList:[

        ],
        defenceRouteRequired:'DISPUTES_THE_CLAIM',
        respondToClaim:{
          howMuchWasPaid:null,
        },
        respondent1DQHomeDetails:{

        },
        respondent1PartnerAndDependent:{
          howManyChildrenByAgeGroup:{

          },
        },
        specDefendant1SelfEmploymentDetails:{

        },
        respondToClaimAdmitPartUnemployedLRspec:{

        },
        respondent1DQLanguage:{
          court:'ENGLISH',
          documents:'ENGLISH',
        },
        respondent1DQVulnerabilityQuestions:{
          vulnerabilityAdjustmentsRequired:'No',
        },
        respondent1DQRequestedCourt:{
          requestHearingAtSpecificCourt:'No',
        },
        respondent1DQWitnesses:{
          witnessesToAppear:'No',
        },
        respondent1DQHearingFastClaim:{
          hearingLengthHours:'3',
          hearingLengthDays:'1',
          unavailableDatesRequired:'No',
        },
        respondent1DQExperts:{
          expertRequired:'No',
        },
      },
    };
    return defendantResponseData;
  }
};
