export default class CaseDataHelper {
  static getNextClaimNumber() {
    return '00' + Math.random().toString(36).slice(-6);
  }
}
