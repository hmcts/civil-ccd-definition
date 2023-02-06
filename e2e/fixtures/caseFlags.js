const {element} = require("../api/dataHelper");
module.exports = {
  partyLevelFlags: {
    complexCase: 'Complex Case',
    urgentCase: 'UrgentCase',
    other: 'Other'
  },
  caseLevelFlags: {
    complexCase: 'Complex Case',
    urgentCase: 'UrgentCase',
    other: 'Other'
  },
  complexCaseFlags: [
    element({
      name: "Complex Case",
      flagComment: "test comment",
      dateTimeCreated: "2023-02-06T13:11:52.466Z",
      path: [
        {
          value: "Case"
        }
      ],
      hearingRelevant: "Yes",
      flagCode: "CF0002",
      status: "Active"
    })]
}
