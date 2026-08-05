import type WATask from '../../models/wa-task';

const task: WATask = {
  name: 'Respond to a query',
  type: 'respondToQueryCTSC',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Respond to a query',
  location_name: 'CTSC Stoke',
  location: '283922',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '2',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'query_work',
  work_type_label: 'Query work',
  role_category: 'CTSC',
  minor_priority: 500,
  major_priority: 5000,
};

export default task;
