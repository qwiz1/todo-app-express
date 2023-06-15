import { AppDataSource } from '../config/database';
import { Todo } from '../entities/todo.entity';
import TodoService from './todo.service';

const todo = new TodoService({
  todoRepository: AppDataSource.getRepository<Todo>(Todo.name),
});

export { todo };
