// Thrown when XUI shows that the user's session has ended: CCD returns 401 for a page, or opening a page sends the
// user to the sign in page. SessionHelper.runWithSessionRecovery signs the user in again and restarts the event.
export class SessionEndedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SessionEndedError';
  }
}
