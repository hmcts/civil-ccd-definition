export default class CaseDataHelper {
  static getNextClaimNumber() {
    return '00' + Math.random().toString(36).slice(-6);
  }

  static formatCaseId(caseId: number) {
    const groups = caseId.toString().match(/.{1,4}/g);
    const formattedString = '#' + groups.join('-');
    return formattedString;
  }
}
