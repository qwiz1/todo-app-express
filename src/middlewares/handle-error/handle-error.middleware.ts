/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../common/enums';
import { HttpError } from '../../exceptions';

const handleErrorMiddleware: ErrorRequestHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message, stack } = err;

  console.error(
    `
    -- Oops, ${err.name} here! --
      Method: ${req.method}
      Endpoint: ${req.url}
      Status: ${status}
      Message: ${message}
      Stack: ${stack}
    `,
  );

  res.status(status).send({ message });
  next();
};

export { handleErrorMiddleware };
