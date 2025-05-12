import { IncomingMessage, ServerResponse } from 'node:http';
import { UserService } from '../services';

export class UserController {
  private readonly userService = new UserService();

  async handle(req: IncomingMessage, res: ServerResponse, pathParts: string[]) {
  }
}