export class ConfigUtils {
  /**
   * Returns the value of the given environment variable. Throws an error if the variable is not set.
   *
   * @param name {@link string} - name of the environment variable
   *
   */
  public static getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Error: ${name} environment variable is not set`);
    }
    return value;
  }
}
