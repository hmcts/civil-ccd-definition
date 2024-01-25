const {date} = require('../../../api/dataHelper');
module.exports = {
  claimantResponse: () => {
    return {
      event: 'CLAIMANT_RESPONSE_CUI',
      caseDataUpdate: {
        applicant1LiPResponse: {
          applicant1DQExtraDetails: {
            wantPhoneOrVideoHearing: 'Yes',
            whyPhoneOrVideoHearing: 'bla bla',
            giveEvidenceYourSelf: 'Yes',
            determinationWithoutHearingRequired: 'Yes',
            determinationWithoutHearingReason: '',
            considerClaimantDocumentsDetails: '',
            applicant1DQLiPExpert: {
              caseNeedsAnExpert: 'No',
              expertCanStillExamineDetails: ''
            }
          },
          applicant1DQHearingSupportLip: {
            supportRequirementLip: 'Yes',
            requirementsLip: [
              {
                value: {
                  name: 'Whit Ness',
                  requirements: [
                    'DISABLED_ACCESS'
                  ],
                  signLanguageRequired: '',
                  languageToBeInterpreted: '',
                  otherSupport: ''
                }
              }
            ]
          }
        },
        applicant1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH'
        },
        applicant1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'Yes',
          vulnerabilityAdjustments: 'vulnerable'
        },
        applicant1DQRequestedCourt: {
          requestHearingAtSpecificCourt: 'Yes',
          otherPartyPreferredSite: '',
          responseCourtCode: '',
          reasonForHearingAtSpecificCourt: 'reasons',
          responseCourtLocations: [],
          caseLocation: {
            region: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ',
            baseLocation: 'Barnet Civil and Family Centre - St Mary\'s Court, Regents Park Road - N3 1BQ'
          }
        },
        applicant1DQWitnesses: {
          witnessesToAppear: 'Yes',
          details: [
            {
              value: {
                name: 'Whit',
                firstName: 'Whit',
                lastName: 'Ness',
                emailAddress: '',
                phoneNumber: '',
                reasonForWitness: 'red builds'
              }
            }
          ]
        },
        applicant1DQSmallClaimHearing: {
          unavailableDatesRequired: 'Yes',
          smallClaimUnavailableDate: [
            {
              value: {
                who: 'defendant',
                date: date(6),
                fromDate: date(6),
                unavailableDateType: 'SINGLE_DATE'
              }
            },
            {
              value: {
                who: 'defendant',
                date: date(10),
                fromDate: date(10),
                toDate: date(15),
                unavailableDateType: 'DATE_RANGE'
              }
            }
          ]
        },
        applicant1DQExperts: {},
        applicant1RepaymentOptionForDefendantSpec: 'IMMEDIATELY',
        applicant1ProceedWithClaim: 'Yes'
      }
    };
  }
};
