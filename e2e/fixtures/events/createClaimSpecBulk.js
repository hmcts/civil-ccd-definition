const {listElement, buildAddress} = require('../../api/dataHelper');
const config = require('../../config.js');
const address = require("../address");

const Address = {
  AddressLine1: `${address.buildingAndStreet.lineOne}`, //SDT:claimant.address.line1, defendant1.address.line1, defendant2.address.line1
  AddressLine2: address.buildingAndStreet.lineTwo, //SDT:claimant.address.line2, defendant1.address.line2, defendant2.address.line2
  AddressLine3: address.buildingAndStreet.lineThree, //SDT:claimant.address.line3, defendant1.address.line3, defendant2.address.line3
  PostTown: address.town, //SDT:claimant.address.line4, defendant1.address.line4, defendant2.address.line4
  PostCode: address.postcode //SDT:claimant.address.postcode, defendant1.address.postcode, defendant2.address.postcode
}

const applicant1 = {
  type: 'ORGANISATION',
  organisationName: 'bulk claim org', //SDT: name
  primaryAddress: Address
};

const respondent1 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'John', //SDT: defendant1.name
  individualLastName: 'Doe',
  individualTitle: 'Sir',
  primaryAddress: Address
};

const respondent2 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'James', //SDT: defendant2.name
  individualLastName: 'Cameron',
  individualTitle: 'Dr',
  primaryAddress: Address
};

const isPBAv3 = (pbaV3) => {
  return pbaV3;
};

const claimAmount = '151234';

module.exports = {
  createClaimBulk: (mpScenario, pbaV3) => {
    if (mpScenario == 'ONE_V_ONE') {
      console.log('1 v 1 claim, with interest')
      return {
        userInput: {
          References: {
            CaseAccessCategory: 'SPEC_CLAIM',
            solicitorReferences: {
              applicantSolicitor1Reference: 'SDT:claimReference', // SDT: claimReference
            }
          },
          Claimant: {
            applicant1: applicant1
          },
          AddAnotherClaimant: {
            addApplicant2: 'No'
          },
          Notifications: {
            applicantSolicitor1CheckEmail: {
              correct: 'Yes',
            }
          },
          ClaimantSolicitorOrganisation: {
            applicant1OrganisationPolicy: {
              OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
              Organisation: {
                OrganisationID: config.claimantSolicitorOrgId
              }
            }
          },
          specCorrespondenceAddress: {
            specApplicantCorrespondenceAddressRequired: 'No'
          },
          Defendant: {
            respondent1: respondent1
          },
          LegalRepresentation: {
            specRespondent1Represented: 'No',
          },
          AddAnotherDefendant: {
            addRespondent2: 'No'
          },
          Details: {
            detailsOfClaim: 'SDT:particulars' // SDT:particulars
          },
          ClaimTimeline: {
            timelineOfEvents: [{
              value: {
                timelineDate: '2021-02-20', // Does not exist in SDT, but mandatory require a value
                timelineDescription: 'event 1' // Does not exist in SDT, but mandatory require a value
              }
            }]
          },
          ClaimAmount: {
            claimAmountBreakup: [{
              value: {
                claimReason: 'amount reason',
                claimAmount: claimAmount // SDT: claimAmount
              }
            }]
          },
          ClaimInterest: {
            claimInterest: 'Yes' // SDT: reserveRightToClaimInterest


          },
          ClaimInterestOptions: {
            interestClaimOptions: 'SAME_RATE_INTEREST'
          },
          SameRateInterestSelection: {
            sameRateInterestSelection: {
              sameRateInterestType: 'SAME_RATE_INTEREST_8_PC'
            }
          },
          InterestClaimFrom: {
            interestClaimFrom: 'FROM_A_SPECIFIC_DATE'
          },
          InterestFromSpecificDate: {
            interestFromSpecificDate: '2021-02-20', // SDT: owedDate  or claimDate
            interestFromSpecificDateDescription: 'test description'
          },
          InterestClaimUntil: {
            interestClaimUntil: 'UNTIL_SETTLED_OR_JUDGEMENT_MADE'
          },
          InterestSummary: {
            claimIssuedPaymentDetails: {
              customerReference: 'Applicant reference'
            },
            ...(!isPBAv3(pbaV3) ? {} : {
              paymentTypePBASpec: 'PBAv3'
            }),
          },
          StatementOfTruth: {
            uiStatementOfTruth: {
              name: 'John Doe', // SDT: sotSignature
              role: 'Bulk issuer'
            }
          },
        },

      };
    }
    if (mpScenario == 'ONE_V_TWO') {
      console.log('1 v 2 claim, with interest')
      return {
        userInput: {
          References: {
            CaseAccessCategory: 'SPEC_CLAIM',
            solicitorReferences: {
              applicantSolicitor1Reference: 'SDT:claimReference', // 'SDT:claimReference'
            }
          },
          Claimant: {
            applicant1: applicant1
          },
          AddAnotherClaimant: {
            addApplicant2: 'No'
          },
          Notifications: {
            applicantSolicitor1CheckEmail: {
              correct: 'Yes',
            }
          },
          ClaimantSolicitorOrganisation: {
            applicant1OrganisationPolicy: {
              OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
              Organisation: {
                OrganisationID: config.claimantSolicitorOrgId
              }
            }
          },
          specCorrespondenceAddress: {
            specApplicantCorrespondenceAddressRequired: 'No'
          },
          Defendant: {
            respondent1: respondent1
          },
          LegalRepresentation: {
            specRespondent1Represented: 'No',
          },
          AddAnotherDefendant: {
            addRespondent2: 'Yes'
          },
          SecondDefendant: {
            respondent2: respondent2
          },
          LegalRepresentationRespondent2: {
            specRespondent2Represented: 'No'
          },
          Details: {
            detailsOfClaim: 'SDT:particulars' // SDT:particulars
          },
          ClaimTimeline: {
            timelineOfEvents: [{
              value: {
                timelineDate: '2021-02-20', // Does not exist in SDT, but mandatory require a value
                timelineDescription: 'event 1' // Does not exist in SDT, but mandatory require a value
              }
            }]
          },
          ClaimAmount: {
            claimAmountBreakup: [{
              value: {
                claimReason: 'amount reason',
                claimAmount: claimAmount // SDT: claimAmount
              }
            }]
          },
          ClaimInterest: {
            claimInterest: 'Yes' // SDT:  reserveRightToClaimInterest
          },
          ClaimInterestOptions: {
            interestClaimOptions: 'SAME_RATE_INTEREST'
          },
          SameRateInterestSelection: {
            sameRateInterestSelection: {
              sameRateInterestType: 'SAME_RATE_INTEREST_8_PC'
            }
          },
          InterestClaimFrom: {
            interestClaimFrom: 'FROM_A_SPECIFIC_DATE'
          },
          InterestFromSpecificDate: {
            interestFromSpecificDate: '2021-02-20', // SDT: owedDate or claimDate
            interestFromSpecificDateDescription: 'test description'
          },
          InterestClaimUntil: {
            interestClaimUntil: 'UNTIL_SETTLED_OR_JUDGEMENT_MADE'
          },
          InterestSummary: {
            claimIssuedPaymentDetails: {
              customerReference: 'Applicant reference'
            },
            ...(!isPBAv3(pbaV3) ? {} : {
              paymentTypePBASpec: 'PBAv3'
            }),
          },
          StatementOfTruth: {
            uiStatementOfTruth: {
              name: 'John Doe', // SDT: sotSignature
              role: 'Bulk issuer'
            }
          },
        },
      };
    }

  },
  serviceUpdateDto: (caseId, paymentStatus) => {
    return {
      service_request_reference: '1324646546456',
      ccd_case_number: caseId,
      service_request_amount: '167.00',
      service_request_status: paymentStatus,
      payment: {
        payment_amount: 167.00,

        payment_reference: '13213223',
        payment_method: 'by account',
        case_reference: 'example of case ref'
      }
    };
  },

};
