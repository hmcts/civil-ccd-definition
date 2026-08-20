import type WATask from '../../../models/wa-task';

const task: WATask = {
  name: 'Application for multiple types - Fast Track',
  type: 'JudgeDecideOnApplication',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Application for multiple types - Fast Track',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'GENERALAPPLICATION',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  description:
    '[JudgeDecideOnApplication](/cases/case-details/${[CASE_REFERENCE]}/trigger/MAKE_DECISION/MAKE_DECISIONGAJudicialDecision)',
  role_category: 'JUDICIAL',
  minor_priority: 500,
  major_priority: 5000,
};

export default task;
