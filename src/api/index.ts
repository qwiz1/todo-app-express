import { Router } from 'express';
import { ENV } from '../common/constants';
import { initTodoApi } from './todo/todo.api';
import { todoController, authController } from '../controllers';
import initAuthApi from './auth/auth.api';

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API.V1_PREFIX, apiRouter);

  initTodoApi({
    apiRouter,
    todoController,
  });

  initAuthApi({
    apiRouter,
    authController,
  });

  return apiRouter;
};

export { initApi };
