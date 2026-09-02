import type WATask from '../../../models/wa-task';

const task: WATask = {
  name: 'Respond to a hearing related query',
  type: 'respondToQueryCTSC',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Respond to a hearing related query',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'query_work',
  work_type_label: 'Query work',
  role_category: 'CTSC',
};

export default task;
