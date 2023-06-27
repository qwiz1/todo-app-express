import { AppDataSource } from '../config/database';
import AuthService from './auth.service';
import TodoService from './todo.service';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import UserService from './user.service';

const todo = new TodoService({
  todoRepository: AppDataSource.getRepository<Todo>(Todo.name),
});

const auth = new AuthService({
  userRepository: AppDataSource.getRepository<User>(User.name),
});

const user = new UserService({
  userRepository: AppDataSource.getRepository<User>(User.name),
});

export { todo, auth, user };
