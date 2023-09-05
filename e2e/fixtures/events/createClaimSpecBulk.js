const config = require('../../config.js');
const address = require('../address');

const Address = {
  AddressLine1: `${address.buildingAndStreet.lineOne}`, //SDT:claimant.address.line1, defendant1.address.line1, defendant2.address.line1
  AddressLine2: address.buildingAndStreet.lineTwo, //SDT:claimant.address.line2, defendant1.address.line2, defendant2.address.line2
  AddressLine3: address.buildingAndStreet.lineThree, //SDT:claimant.address.line3, defendant1.address.line3, defendant2.address.line3
  PostTown: address.town, //SDT:claimant.address.line4, defendant1.address.line4, defendant2.address.line4
  PostCode: address.postcode //SDT:claimant.address.postcode, defendant1.address.postcode, defendant2.address.postcode
};

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
const solicitor1Email = 'hmcts.civil+organisation.1.solicitor.1@gmail.com';

module.exports = {
  createClaimBulk: (mpScenario, pbaV3) => {
    if (mpScenario == 'ONE_V_ONE') {
      console.log('1 v 1 claim, with interest');
      return {
          CaseAccessCategory: 'SPEC_CLAIM',
          solicitorReferences: {
            applicantSolicitor1Reference: 'SDT:claimReference', // SDT: claimReference
          },
          applicant1: applicant1,
          addApplicant2: 'No',
          applicantSolicitor1CheckEmail: {
            correct: 'No',
          },
          applicantSolicitor1UserDetails: {
            email: solicitor1Email
          },
          applicant1OrganisationPolicy: {
            OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
            Organisation: {
              OrganisationID: config.claimantSolicitorOrgId
            }
          },
          specApplicantCorrespondenceAddressRequired: 'No',
          respondent1: respondent1,
          specRespondent1Represented: 'No',
          addRespondent2: 'No',
          detailsOfClaim: 'SDT:particulars', // SDT:particulars
          timelineOfEvents: [{
            value: {
              timelineDate: '2021-02-20', // Does not exist in SDT, but mandatory require a value
              timelineDescription: 'event 1' // Does not exist in SDT, but mandatory require a value
            }
          }],
          claimAmountBreakup: [{
            value: {
              claimReason: 'amount reason',
              claimAmount: claimAmount // SDT: claimAmount
            }
          }],
          claimInterest: 'Yes', // SDT: reserveRightToClaimInterest
          interestClaimOptions: 'SAME_RATE_INTEREST',
          sameRateInterestSelection: {
            sameRateInterestType: 'SAME_RATE_INTEREST_8_PC'
          },
          interestClaimFrom: 'FROM_A_SPECIFIC_DATE',
          interestFromSpecificDate: '2021-02-20', // SDT: owedDate  or claimDate
          interestFromSpecificDateDescription: 'test description',
          interestClaimUntil: 'UNTIL_SETTLED_OR_JUDGEMENT_MADE',
          claimIssuedPaymentDetails: {
            customerReference: 'Applicant reference'
          },
          ...(!isPBAv3(pbaV3) ? {} : {
            paymentTypePBASpec: 'PBAv3'
          }),
          uiStatementOfTruth: {
            name: 'John Doe', // SDT: sotSignature
            role: 'Bulk issuer'
          },
          claimFee: {
            calculatedAmountInPence: '11500',
            code: 'FEE0206',
            version: '4'
          },
          totalClaimAmount: '151234',
      };
    }
    if (mpScenario == 'ONE_V_TWO') {
      console.log('1 v 2 claim, with interest');
      return {
        CaseAccessCategory: 'SPEC_CLAIM',
        solicitorReferences: {
          applicantSolicitor1Reference: 'SDT:claimReference', // 'SDT:claimReference'
        },
        applicant1: applicant1,
        addApplicant2: 'No',
        applicantSolicitor1CheckEmail: {
            correct: 'No',
        },
        applicantSolicitor1UserDetails: {
          email: solicitor1Email
        },
        applicant1OrganisationPolicy: {
          OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
          Organisation: {
            OrganisationID: config.claimantSolicitorOrgId
          }
        },
        specApplicantCorrespondenceAddressRequired: 'No',
        respondent1: respondent1,
        specRespondent1Represented: 'No',
        addRespondent2: 'Yes',
        respondent2: respondent2,
        specRespondent2Represented: 'No',
        detailsOfClaim: 'SDT:particulars', // SDT:particulars
        timelineOfEvents: [{
            value: {
              timelineDate: '2021-02-20', // Does not exist in SDT, but mandatory require a value
              timelineDescription: 'event 1' // Does not exist in SDT, but mandatory require a value
            }
        }],
        claimAmountBreakup: [{
          value: {
            claimReason: 'amount reason',
            claimAmount: claimAmount // SDT: claimAmount
            }
        }],
        claimInterest: 'Yes', // SDT:  reserveRightToClaimInterest
        interestClaimOptions: 'SAME_RATE_INTEREST',
        sameRateInterestSelection: {
            sameRateInterestType: 'SAME_RATE_INTEREST_8_PC'
          },
        interestClaimFrom: 'FROM_A_SPECIFIC_DATE',
        interestFromSpecificDate: '2021-02-20', // SDT: owedDate or claimDate
        interestFromSpecificDateDescription: 'test description',
        interestClaimUntil: 'UNTIL_SETTLED_OR_JUDGEMENT_MADE',
        claimIssuedPaymentDetails: {
          customerReference: 'Applicant reference'
        },
        ...(!isPBAv3(pbaV3) ? {} : {
          paymentTypePBASpec: 'PBAv3'
        }),
        uiStatementOfTruth: {
          name: 'John Doe', // SDT: sotSignature
          role: 'Bulk issuer'
        },
        claimFee: {
          calculatedAmountInPence: '11500',
          code: 'FEE0206',
          version: '4'
        },
        totalClaimAmount: '151234'
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
