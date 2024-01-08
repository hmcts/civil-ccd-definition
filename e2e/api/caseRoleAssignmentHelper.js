const {assignCaseToDefendant, unAssignUserFromCases} = require('./testingSupport');
const config = require('../config');

let userCaseMappings = {};

const addUserCaseMapping = (caseId, user) => {
  const userCase = userCaseMappings[`${user.email}`];
  userCaseMappings = {...userCaseMappings, [`${user.email}`]: [...(userCase ? userCase : []), {caseId, user}]};
};

const assignCaseRoleToUser = async (caseId, role, user) => {
  await assignCaseToDefendant(caseId, role, user)
    .then(() => addUserCaseMapping(caseId, user));
};

const assignCaseToCitizen = async (caseId, type) => {
  if (type === 'lrvlr') {
    await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantLRCitizenUser);
  } else {
    await assignCaseRoleToUser(caseId, 'DEFENDANT', config.defendantCitizenUser);
  }
};

const unAssignAllUsers = async () => {
  console.log('Removing case role allocations...');
  for (const userRole of Object.values(userCaseMappings)) {
    await unAssignUserFromCases(userRole.map(({caseId}) => caseId), userRole[0].user);
  }
  userCaseMappings = {};
};

module.exports = {
  addUserCaseMapping,
  assignCaseRoleToUser,
  unAssignAllUsers,
  assignCaseToCitizen
};
