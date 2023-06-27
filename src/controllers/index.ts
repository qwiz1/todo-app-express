import { auth as authService, todo as todoService } from '../services';
import { AuthController } from './auth.controller';
import { TodoController } from './todo.controller';

const todoController = new TodoController({
  todoService,
});

const authController = new AuthController({
  authService,
});

export { todoController, authController };
