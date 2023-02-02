module.exports = {
  name: 'Fast Track Directions',
  type: 'FastTrackDirections',
  task_title: 'Fast Track Directions',
  location_name: 'Central London County Court',
  location: '20262',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  permissions: { values: [ 'Read', 'Own', 'Manage', 'Cancel', 'Complete', 'Claim', 'Assign', 'Unassign' ] },
  description: '[Directions - Fast Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOFastTrack)',
  role_category: 'JUDICIAL'
};
