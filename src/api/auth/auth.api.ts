import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { jwtMiddleware } from '../../middlewares';
import { ApiPath, AuthApiPath } from '../../common/enums';
import { AuthController } from '../../controllers/auth.controller';

type Args = {
  apiRouter: Router;
  authController: AuthController;
};

const initAuthApi = ({ apiRouter, authController }: Args): Router => {
  const authRouter = Router();

  apiRouter.use(ApiPath.AUTH, authRouter);

  authRouter.post(
    AuthApiPath.SIGN_IN,
    asyncHandler(authController.signIn.bind(authController)),
  );

  authRouter.post(
    AuthApiPath.SIGN_UP,
    asyncHandler(authController.signUp.bind(authController)),
  );

  authRouter.get(
    `${AuthApiPath.CONFIRMATION}${AuthApiPath.$TOKEN}`,
    asyncHandler(authController.confirm.bind(authController)),
  );

  authRouter.post(
    AuthApiPath.FORGOT_PASSWORD,
    asyncHandler(authController.handleForgotPassword.bind(authController)),
  );

  authRouter.put(
    AuthApiPath.UPDATE_PASSWORD,
    jwtMiddleware,
    asyncHandler(authController.updatePassword.bind(authController)),
  );

  return authRouter;
};

export default initAuthApi;
