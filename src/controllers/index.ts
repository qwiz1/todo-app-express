import { todo as todoService } from '../services';
import { TodoController } from './todo.controller';

const todoController = new TodoController({
  todoService,
});

export { todoController };
