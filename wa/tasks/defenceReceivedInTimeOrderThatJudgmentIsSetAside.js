module.exports = {
  name: "Defence received in time - order that judgment is set aside",
  type: "OrderToSetAsideDefendedClaim",
  task_state: "assigned",
  task_system: "SELF",
  security_classification: "PUBLIC",
  task_title: "Defence received in time - order that judgment is set aside",
  location_name: "Civil National Business Centre",
  location: "420219",
  execution_type: "Case Management Task",
  jurisdiction: "CIVIL",
  region: "2",
  case_type_id: "CIVIL",
  case_category: "Civil",
  case_name: "Test Inc",
  auto_assigned: false,
  warnings: false,
  warning_list: {
    values: []
  },
  case_management_category: "Civil",
  work_type_id: "decision_making_work",
  work_type_label: "Decision-making work",
  permissions: {
    values: [
      "Read",
      "Own",
      "Manage",
      "Cancel",
      "CompleteOwn",
      "CancelOwn",
      "Claim",
      "Unclaim",
      "Assign",
      "Unassign",
      "UnclaimAssign"
    ]
  },
  description: "[Make Order](/cases/case-details/${[CASE_REFERENCE]}/trigger/GENERATE_DIRECTIONS_ORDER/GENERATE_DIRECTIONS_ORDER)",
  role_category: "JUDICIAL",
  minor_priority: 500,
  major_priority: 3000,
};