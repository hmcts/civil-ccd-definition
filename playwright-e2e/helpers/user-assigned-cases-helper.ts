import config from '../config/config.ts';
import filePaths from '../config/file-paths.ts';
import FileType from '../constants/test-utils/file-type.ts';
import UserKey from '../constants/users/user-key.ts';
import User from '../models/users/user.ts';
import FileSystemHelper from './file-system-helper.ts';

//TODO: Could be a potentially concurrency issue when storing assigned caseIds for users when multiple workers are running but will assess and fix later.
//e.g. Two workers could be updating caseIds for a user at the same time.

export default class UserAssignedCasesHelper {
  private static getUserAssignedCasesPath = (user: User) =>{
    if (user.workerIndex) {
      return `${filePaths.userAssignedCases}/${user.key}-${user.workerIndex + 1}.json`;
    }
    return `${filePaths.userAssignedCases}/${user.key}.json`;
  }
   

  static async getUserAssignedCases(user: User): Promise<number[] | null> {
    if (config.unassignCases) {
      try {
        const unassignedCases = FileSystemHelper.readFile(
          this.getUserAssignedCasesPath(user),
          FileType.JSON,
        );
        return unassignedCases;
      } catch {
        return null;
      }
    }
    return null;
  }

  static async addAssignedCaseToUser(user: User, caseId?: number) {
    if (config.unassignCases && caseId) {
      console.log(`Adding caseId: ${caseId} to user assigned cases for user: ${user.name}`);
      const userAssignedCases = (await this.getUserAssignedCases(user)) ?? [];
      userAssignedCases.push(caseId);
      await FileSystemHelper.writeFileAsync(
        userAssignedCases,
        this.getUserAssignedCasesPath(user),
        FileType.JSON,
      );
      console.log(
        `Added caseId: ${caseId} to user assigned cases for user: ${user.name} successfully`,
      );
    }
  }

  static async deleteUserAssignedCases(user: User) {
    FileSystemHelper.delete(this.getUserAssignedCasesPath(user));
  }

  static async deleteAllUsersAssignedCases() {
    FileSystemHelper.delete(`${filePaths.userAssignedCases}/`);
  }
}
