import CustomError from './custom-error';

export default class ExpectError extends CustomError {
  constructor(message: string) {
    super('AssertionError', message);
  }
}
