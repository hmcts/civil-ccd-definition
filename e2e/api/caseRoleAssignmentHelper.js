const {assignCaseToDefendant, unAssignUserFromCase} = require('./testingSupport');

let userCaseMappings = {};

const addUserCaseMapping = (caseId, user) => {
  userCaseMappings = {...userCaseMappings, [`${caseId}${user.email}`]: {caseId, user}};
};

const assignCaseRoleToUser = async (caseId, role, user) => {
  await assignCaseToDefendant(caseId, role, user)
    .then(() => addUserCaseMapping(caseId, user));
};

const unAssignAllUsers = async () => {
  console.log('Removing users role allocations from test cases...');
  for (const {caseId, user} of Object.values(userCaseMappings).sort()) {
    await unAssignUserFromCase(caseId, user);
  }
  userCaseMappings = {};
};

module.exports = {
  addUserCaseMapping,
  assignCaseRoleToUser,
  unAssignAllUsers
};
