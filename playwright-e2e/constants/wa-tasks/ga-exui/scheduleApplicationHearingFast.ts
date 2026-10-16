import type WATask from '../../../models/wa-task';

const task: WATask = {
  name: 'Application Hearing Scheduled - Fast Track',
  type: 'ScheduleApplicationHearing',
  task_system: 'SELF',
  security_classification: 'PUBLIC',
  task_title: 'Application Hearing Scheduled - Fast Track',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '1',
  case_type_id: 'GENERALAPPLICATION',
  case_category: 'Civil',
  auto_assigned: false,
  warnings: false,
  case_management_category: 'Civil',
  work_type_id: 'hearing_work',
  work_type_label: 'Hearing work',
  description:
    '[ScheduleApplicationHearing](/cases/case-details/${[CASE_REFERENCE]}/trigger/HEARING_SCHEDULED_GA/HEARING_SCHEDULED_GAHearingNoticeGADetail)',
  role_category: 'ADMIN',
  minor_priority: 500,
  major_priority: 5000,
};

export default task;
