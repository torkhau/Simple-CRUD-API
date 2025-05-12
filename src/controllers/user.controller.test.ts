import { UserService } from '../services';
import { User, UserData } from '../store/type';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let mockService: jest.Mocked<UserService>;

  beforeEach(() => {
    controller = new UserController();

    mockService = {
      getUser: jest.fn(),
      getUsers: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    Object.defineProperty(controller, 'service', {
      value: mockService,
    });
  });

  test('GET with userId returns user if found', () => {
    const mockUser: User = {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      username: 'john',
      age: 30,
      hobbies: ['reading'],
    };
    mockService.getUser.mockReturnValue(mockUser);

    const response = controller.handle('GET', mockUser.id);

    expect(response.statusCode).toBe(200);
    expect(response.body?.data).toEqual(mockUser);
  });

  test('POST creates user with valid data', () => {
    const userData: UserData = {
      username: 'alice',
      age: 25,
      hobbies: ['music'],
    };
    const user: User = {
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      ...userData,
    };
    mockService.createUser.mockReturnValue(user);

    const response = controller.handle('POST', undefined, userData);

    expect(response.statusCode).toBe(201);
    expect(response.body?.data).toEqual(user);
  });

  test('DELETE returns 404 if user not found', () => {
    mockService.deleteUser.mockReturnValue(false);

    const response = controller.handle('DELETE', 'd290f1ee-6c54-4b01-90e6-d701748f0851');

    expect(response.statusCode).toBe(404);
    expect(response.body?.message).toBe('User not found');
  });
});
