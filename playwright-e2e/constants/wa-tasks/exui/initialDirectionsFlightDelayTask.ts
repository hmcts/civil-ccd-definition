import type WATask from '../../../models/wa-task';

const task: WATask = {
  name: 'Initial Directions (Flight Delay)',
  type: 'InitialDirectionFlightDelay',
  task_title: 'Initial Directions (Flight Delay)',
  location_name: 'Civil National Business Centre',
  location: '621184',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  description: '[Initial Directions (Flight Delay)](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)<br /><br />[Not Suitable for SDO](/cases/case-details/${[CASE_REFERENCE]}/trigger/NotSuitable_SDO/NotSuitable_SDONotSuitableSDO)',
  role_category: 'JUDICIAL',
  minor_priority: 500,
  major_priority: 5000
};

export default task;
