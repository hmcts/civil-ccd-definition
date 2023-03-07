const apiRequest = require('./apiRequest');
const {element} = require('./dataHelper');
const {PARTY_FLAGS} = require('../fixtures/caseFlags');
const chai = require('chai');
const {expect} = chai;

const CREATE_FLAGS_EVENT = 'CREATE_CASE_FLAGS';
const FLAG_LOCATIONS = [
  'applicant1',
  'applicant2',
  'applicant1LitigationFriend',
  'applicant2LitigationFriend',
  'respondent1',
  'respondent2',
  'respondent1LitigationFriend',
  'respondent2LitigationFriend',
  'respondent1Witnesses',
  'respondent1Experts',
  'respondent2Witnesses',
  'respondent2Experts',
  'applicantWitnesses',
  'applicantExperts'
];

const getPartyFlags = () => {
  return Object.keys(PARTY_FLAGS).map(key => PARTY_FLAGS[key]);
};

const isCaseLevelFlag = (caseFlagLocation) => caseFlagLocation === 'caseFlags';

const getDefinedCaseFlagLocations = async(user, caseId) => {
  const {case_data} = await apiRequest.fetchCaseDetails(user, caseId);
  return FLAG_LOCATIONS.filter(flagLocation => case_data[flagLocation]);
};

const updateCaseDataWithFlag = (caseData, flagLocation, flag) => {
  return isCaseLevelFlag(flagLocation)
    ? {...caseData, caseFlags: {details: [flag]}}
    : {...caseData, [flagLocation]: insertFlags(caseData[flagLocation], [flag])};
};

const insertFlags = (targetField, newFlags) => {
  if (Array.isArray(targetField)) {
    const updated = insertFlags(targetField[0].value, newFlags);
    return [element(updated)];
  } else {
    return {
      ...targetField, flags: {...targetField.flags, details: newFlags}
    };
  }
};

const addCaseFlag = async (flagLocation, flag, caseId) => {
  console.log(`Adding [${flag.value.name}] flag to [${flagLocation}].`);
  const caseData = await apiRequest.startEvent(CREATE_FLAGS_EVENT, caseId);
  const updatedData = updateCaseDataWithFlag(caseData, flagLocation, flag);
  return apiRequest.submitEvent(CREATE_FLAGS_EVENT, updatedData, caseId);
};

const getFlagsField = (caseFlagLocation, caseData) => {
  if (caseFlagLocation === 'caseFlags') {
    return caseData[caseFlagLocation];
  } else {
    return Array.isArray(caseData[caseFlagLocation])
      ? caseData[caseFlagLocation][0].value.flags : caseData[caseFlagLocation].flags;
  }
};

const assertFlagAdded = (caseData, caseFlagLocation, expectedFlag) => {
  console.log(`Asserting [${caseFlagLocation}] has [${expectedFlag.value.name}] flag.`);
  const actual = getFlagsField(caseFlagLocation, caseData);
  expect(actual.details).deep.equal([expectedFlag]);
};
const addAndAssertCaseFlag = async (location, flag, caseId) => {
  const response = await addCaseFlag(location, flag, caseId);
  expect(response.status).equal(201);

  const {case_data} = await response.json();
  assertFlagAdded(case_data, location, flag);
};

module.exports = { getPartyFlags, getDefinedCaseFlagLocations, addAndAssertCaseFlag };
