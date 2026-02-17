import { expect } from '@playwright/test';

const taskFieldsToBeValidated = {
  taskInitiationFields: ['name', 'type', 'task_title'],
  taskConfigurationFields: [
    'location_name',
    'location',
    'execution_type',
    'jurisdiction',
    'region',
    'case_type_id',
    'case_category',
    'auto_assigned',
    'case_management_category',
    'work_type_id',
    'work_type_label',
    'description',
    'role_category',
  ],
  // taskPermissionFields: [
  //   'permissions'
  // ],
  taskPriorityFields: ['minor_priority', 'major_priority'],
};

export const validateTaskInfo = (createdTask: any, expectedTaskInfo: any) => {
  for (const taskDMN of Object.keys(taskFieldsToBeValidated)) {
    console.log(`Asserting ${taskDMN} has valid data`);

    taskFieldsToBeValidated[taskDMN].forEach((field) => {
      expect(createdTask[field], `matches ${field}`).toEqual(expectedTaskInfo[field]);
    });
  }
};
