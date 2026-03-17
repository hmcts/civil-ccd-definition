module.exports = {
  name: 'Application for set aside judgement',
  type: 'JudgeDecideOnApplication',
  task_title: 'Application for set aside judgement',
  location_name: 'County Court Money Claims Centre',
  location: '192280',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '4',
  case_type_id: 'GENERALAPPLICATION',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  permissions: {values: ['Read', 'Own', 'CompleteOwn', 'CancelOwn', 'Claim', 'Unclaim', 'UnclaimAssign']},
  description: '[JudgeDecideOnApplication](/cases/case-details/${[CASE_REFERENCE]}/trigger/MAKE_DECISION/MAKE_DECISIONGAJudicialDecision)',
  role_category: 'JUDICIAL'
};
