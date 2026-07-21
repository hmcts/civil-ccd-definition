import type WATask from '../../models/wa-task';

const task: WATask = {
  name: 'Review message',
  type: 'reviewMessageJudicial',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Review message',
  location_name: 'Central London County Court',
  location: '20262',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  description: '[Fast track, DJ, Review message](/cases/case-details/${[CASE_REFERENCE]}#Messages)',
  role_category: 'JUDICIAL',
  minor_priority: 500,
  major_priority: 5000
};

export default task;
