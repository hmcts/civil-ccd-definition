module.exports = {
  name: 'Intermediate Track Directions',
  type: 'allocateIntermediateTrack',
  task_state: 'unassigned',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Intermediate Track Directions',
  location_name: 'Central London County Court',
  location: '20262',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'CIVIL' + (process.env.CCD_DEF_VERSION || ''),
  case_category: 'Civil',
  case_name: 'Test Inc',
  auto_assigned: false,
  warnings: false,
  warning_list: { values: [] },
  case_management_category: 'Civil',
  work_type_id: 'intermediate_track_decision_making_work',
  work_type_label: 'Intermediate track decision making work',
  permissions: {
    values: [
      'Read', 'Own',
      'CompleteOwn', 'CancelOwn',
      'Claim', 'Unclaim',
      'UnclaimAssign'
    ]
  },
  description: '[Make an order [Intermediate Track or Multi Track]](/cases/case-details/${[CASE_REFERENCE]}/trigger/GENERATE_DIRECTIONS_ORDER)<br /><br />[Standard Directions Order [Small Claims or Fast Track]](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO)<br /><br />[Not Suitable for SDO](/cases/case-details/${[CASE_REFERENCE]}/trigger/NotSuitable_SDO)',
  role_category: 'JUDICIAL',
  minor_priority: 500,
  major_priority: 5000
};
