module.exports = {
  name: "Claim Discontinued - Validate discontinuance",
  type: "ValidateDiscontinuanceCTSC",
  task_state: "unassigned",
  task_system: "SELF",
  security_classification: "PUBLIC",
  task_title: "Claim Discontinued - Validate discontinuance",
  created_date: "2025-09-09T08:34:42+0000",
  due_date: "2025-09-09T16:00:00+0000",
  location_name: "Civil National Business Centre",
  location: "420219",
  execution_type: "Case Management Task",
  jurisdiction: "CIVIL",
  region: "2",
  case_type_id: "CIVIL",
  case_id: "1757406841440383",
  case_category: "Civil",
  case_name: "Test Inc & Claim 2",
  auto_assigned: false,
  warnings: false,
  warning_list: {
    values: []
  },
  case_management_category: "Civil",
  work_type_id: "routine_work",
  work_type_label: "Routine work",
  permissions: {
    values: [
      "Read",
      "Own",
      "CompleteOwn",
      "CancelOwn",
      "Claim",
      "Unclaim",
      "UnclaimAssign"
    ]
  },
  description:
    "[Validate Discontinuance](/cases/case-details/${[CASE_REFERENCE]}/trigger/VALIDATE_DISCONTINUE_CLAIM_CLAIMANT/VALIDATE_DISCONTINUE_CLAIM_CLAIMANT)",
  role_category: "CTSC",
  minor_priority: 500,
  major_priority: 3000
};