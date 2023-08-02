const {buildBulkClaimAddress, date} = require('../../api/dataHelper');

const respondent1 = {
  address: buildBulkClaimAddress('respondent1')
};
const respondent2 = {
  address: buildBulkClaimAddress('respondent2')
};
const respondent1WithPartyName = {
  ...respondent1,
  name: 'Sir John Doe',
};
const respondent2WithPartyName = {
  ...respondent2,
  name: 'Dr Foo Bar',
};
const applicant1 = {
  address: buildBulkClaimAddress('applicant')
};
const applicant1WithPartyName = {
  ...applicant1,
  name: 'Dr Maddy Jane',
};

module.exports = {
  bulkCreateClaimDto: (customerId, amount, claimRef) => {
    return {
      bulkCustomerId: customerId,
      claimAmount: amount,
      claimant: applicant1WithPartyName,
      claimantReference: claimRef,
      defendant1: respondent1WithPartyName,
      defendant2: respondent2WithPartyName,
      interest: {
        claimAmountInterestBase: 6,
        interestClaimDate: date(-1),
        interestDailyAmount: 7,
        interestOwedDate: date(-1),
      },
      particulars: 'particularsValue',
      reserveRightToClaimInterest: true,
      sotSignature: 'signature',
      sotSignatureRole: 'bulkIssuerRole',
    };
  },
};
