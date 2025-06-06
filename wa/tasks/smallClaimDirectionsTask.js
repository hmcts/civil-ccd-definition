module.exports = {
  name: 'Small Claims Track Directions',
  type: 'SmallClaimsTrackDirections',
  task_title: 'Small Claims Track Directions',
  location_name: 'Nottingham County Court and Family Court (and Crown)',
  location: '420219',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '2',
  case_type_id: 'CIVIL' + (process.env.CCD_DEF_VERSION || ''),
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  permissions: { values: [ 'Read', 'Own', 'Manage', 'Cancel', 'Complete', 'Claim', 'Assign', 'Unassign' ] },
  description: '[Directions - Small Claims Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)',
  role_category: 'LEGAL_OPERATIONS',
  minor_priority: 500,
  major_priority: 5000
};
