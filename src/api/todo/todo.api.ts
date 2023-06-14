import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ApiPath, TodoApiPath } from '../../common/enums/api';
import { TodoController } from '../../controllers/todo.controller';

type Args = {
  apiRouter: Router;
  todoController: TodoController;
};

const initTodoApi = ({ apiRouter, todoController }: Args): Router => {
  const todosRouter = Router();

  apiRouter.use(ApiPath.TODOS, todosRouter);
  todosRouter.post(
    TodoApiPath.ROOT,
    asyncHandler(todoController.create.bind(todoController)),
  );

  todosRouter.get(
    TodoApiPath.ROOT,
    asyncHandler(todoController.getAll.bind(todoController)),
  );

  todosRouter.get(
    TodoApiPath.$ID,
    asyncHandler(todoController.getById.bind(todoController)),
  );

  todosRouter.put(
    TodoApiPath.$ID,
    asyncHandler(todoController.update.bind(todoController)),
  );

  todosRouter.delete(
    TodoApiPath.$ID,
    asyncHandler(todoController.delete.bind(todoController)),
  );

  return todosRouter;
};

export { initTodoApi };
