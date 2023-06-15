import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { HttpCode } from '../common/enums/http';

type Constructor = {
  todoService: TodoService;
};

class TodoController {
  private todoService: TodoService;

  constructor({ todoService }: Constructor) {
    this.todoService = todoService;
  }

  async create(req: Request, res: Response) {
    const todo = await this.todoService.create(req.body);
    res.json(todo).status(HttpCode.CREATED);
  }

  async getAll(_req: Request, res: Response) {
    const todos = await this.todoService.getAll();
    res.json(todos).status(HttpCode.OK);
  }

  async getById(req: Request, res: Response) {
    const todo = await this.todoService.getById(Number(req.params.id));
    res.json(todo).status(HttpCode.OK);
  }

  async update(req: Request, res: Response) {
    const updatedTodo = await this.todoService.update(
      Number(req.params.id),
      req.body,
    );
    res.json(updatedTodo).status(HttpCode.OK);
  }

  async delete(req: Request, res: Response) {
    const deletedTodo = await this.todoService.delete(Number(req.params.id));
    res.json(deletedTodo).status(HttpCode.OK);
  }
}

export { TodoController };
