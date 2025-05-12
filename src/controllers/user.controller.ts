import { validate } from 'uuid';
import { RequestMethod, Response } from '../routes/type';
import { UserService } from '../services';
import { isPartialUserData, isUserData, UserData } from '../store/type';

export class UserController {
  private readonly service = new UserService();

  handle(method: RequestMethod, param?: string, user?: UserData): Response {
    switch (method) {
      case 'GET':
        return this.getUser(param);
      case 'POST':
        return this.createUser(user);
      case 'PUT':
        return this.updateUser(param, user);
      case 'DELETE':
        return this.deleteUser(param);
      default:
        return { statusCode: 405, body: { message: `Method "${method}" not allowed` } };
    }
  }

  private getUser(userId?: string): Response {
    if (userId) {
      if (!validate(userId)) return { statusCode: 400, body: { message: 'Invalid user ID' } };

      const user = this.service.getUser(userId);

      if (!user) return { statusCode: 404, body: { message: 'User not found' } };

      return { statusCode: 200, body: { message: 'OK', data: user } };
    }

    return { statusCode: 200, body: { message: 'OK', data: this.service.getUsers() } };
  }

  private createUser(user?: UserData): Response {
    if (!isUserData(user)) return { statusCode: 400, body: { message: 'Invalid user data' } };

    return { statusCode: 201, body: { message: 'User created', data: this.service.createUser(user) } };
  }

  private updateUser(userId?: string, userData?: Partial<UserData>): Response {
    if (!userId || !validate(userId)) return { statusCode: 400, body: { message: 'Invalid user ID' } };

    if (!isPartialUserData(userData)) return { statusCode: 400, body: { message: 'Invalid user data' } };

    const user = this.service.updateUser(userId, userData);

    if (!user) return { statusCode: 404, body: { message: 'User not found' } };

    return { statusCode: 200, body: { message: 'User updated', data: user } };
  }

  private deleteUser(userId?: string): Response {
    if (!userId || !validate(userId)) return { statusCode: 400, body: { message: 'Invalid user ID' } };

    const result = this.service.deleteUser(userId);

    if (!result) return { statusCode: 404, body: { message: 'User not found' } };

    return { statusCode: 204 };
  }
}
