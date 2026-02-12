module.exports = {
  name: 'Review Application for multiple types',
  type: 'JudgeRevisitApplication',
  task_title: 'Review Application for multiple types',
  location_name: 'County Court Money Claims Centre',
  location: '???',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '???',
  case_type_id: 'GENERALAPPLICATION',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  permissions: { values: [ 'Read', 'Own', 'Manage', 'Cancel' ] },
  description: '[JudgeRevisitApplication](/cases/case-details/${[CASE_REFERENCE]}/trigger/MAKE_DECISION/MAKE_DECISIONGAJudicialDecision)',
  role_category: 'JUDICIAL'
};
