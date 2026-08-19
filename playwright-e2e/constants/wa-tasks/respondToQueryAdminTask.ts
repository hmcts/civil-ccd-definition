import type WATask from '../../models/wa-task';

const task: WATask = {
  name: 'Respond to a query',
  type: 'respondToQueryAdmin',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Respond to a query',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'query_work',
  work_type_label: 'Query work',
  role_category: 'ADMIN',
  minor_priority: 500,
  major_priority: 2000,
};

export default task;
