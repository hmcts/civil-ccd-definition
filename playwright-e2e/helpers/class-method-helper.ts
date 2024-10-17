export default class ClassMethodHelper {
  static formatClassName = (className: string) => {
    if (className.endsWith('Steps')) {
      return className;
    }
    return className.charAt(0).toLowerCase() + className.slice(1);
  };
}
