import type WATask from '../../models/wa-task';

const task: WATask = {
  name: 'Legal Advisor Small Claims Track Directions',
  type: 'LegalAdvisorSmallClaimsTrackDirections',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Legal Advisor Small Claims Track Directions',
  location_name: 'Nottingham County Court and Family Court (and Crown)',
  location: '420219',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '2',
  case_type_id: 'CIVIL' + (process.env.CCD_DEF_VERSION || ''),
  case_category: 'Civil',
  case_name: 'Test Inc',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  description: '[Directions - Legal Adviser Small Claims Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)',
  role_category: 'LEGAL_OPERATIONS',
  minor_priority: 500,
  major_priority: 5000
};

export default task;
