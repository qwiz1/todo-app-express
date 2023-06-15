import { HttpCode } from '../common/enums';

const EXCEPTION_NAME = 'HttpError';
const DEFAULT_MESSAGE = 'Internal server error';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
    this.name = EXCEPTION_NAME;
  }
}

export { HttpError };
