import { Router } from 'express';
import { ENV } from '../common/constants';
import { initTodoApi } from './todo/todo.api';
import { todoController } from '../controllers';

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API.V1_PREFIX, apiRouter);

  initTodoApi({
    apiRouter,
    todoController,
  });

  return apiRouter;
};

export { initApi };
