export default class StringHelper {
  static capitalise(str: string) {
    const firstChar = str.charAt(0).toUpperCase;
    const restOfStr = str.substring(1).toLowerCase();
    return `${firstChar}${restOfStr}`;
  }
}
