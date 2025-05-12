import { RequestMethod, Response } from '../routes/type';
import { UserService } from '../services';
import { User } from '../store/type';

export class UserController {
  private readonly userService = new UserService();

  handle(method: RequestMethod, param?: string, user?: User): Response {
    const response: Response = { statusCode: 200, body: { message: 'OK' } };

    switch (method) {
      case 'GET':
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
    }

    return response
  }
}
