module.exports = {
    name: 'Directions after Judgment (Damages)',
    type: 'summaryJudgmentDirections',
    task_state: 'unassigned',
    task_system: 'SELF',
    security_classification: 'PUBLIC',
    task_title: 'Directions after Judgment (Damages)',
    location_name: 'Central London County Court',
    location: '20262',
    execution_type: 'Case Management Task',
    jurisdiction: 'CIVIL',
    region: '1',
    case_type_id: 'CIVIL',
    case_category: 'Civil',
    case_name: 'Test Inc',
    auto_assigned: false,
    warnings: false,
    warning_list: { values: [] },
    case_management_category: 'Civil',
    work_type_id: 'decision_making_work',
    work_type_label: 'Decision-making work',
    permissions: {
      values: [
        'Read',          'Own',
        'CompleteOwn',   'CancelOwn',
        'Claim',         'Unclaim',
        'UnclaimAssign'
      ]
    },
    description: '[Directions after Judgment (Damages)](/cases/case-details/${[CASE_REFERENCE]}/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder)<br /><br />[Not Suitable for SDO](/cases/case-details/${[CASE_REFERENCE]}/trigger/NotSuitable_SDO/NotSuitable_SDONotSuitableSDO)',
    role_category: 'JUDICIAL',
    minor_priority: 500,
    major_priority: 5000
  };
