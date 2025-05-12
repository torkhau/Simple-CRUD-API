import { UserData } from '../store/type';
import { UserService } from './user.service';

describe('UserService', () => {
  const service = new UserService();

  test('createUser → should store and return new user', () => {
    const user: UserData = {
      username: 'Alice',
      age: 25,
      hobbies: ['chess'],
    };

    const createdUser = service.createUser(user);
    expect(createdUser).toMatchObject(user);

    const fetched = service.getUser(createdUser.id);
    expect(fetched).toEqual(createdUser);
  });

  test('updateUser → should update existing user', () => {
    const user: UserData = {
      username: 'Bob',
      age: 30,
      hobbies: ['cycling'],
    };

    const createdUser = service.createUser(user);

    const updated = service.updateUser(createdUser.id, { age: 35 });
    expect(updated?.age).toBe(35);
    expect(updated?.username).toBe('Bob');
  });

  test('deleteUser → should delete the user by ID', () => {
    const user: UserData = {
      username: 'Charlie',
      age: 40,
      hobbies: [],
    };

    const createdUser = service.createUser(user);

    const deleted = service.deleteUser(createdUser.id);
    expect(deleted).toBe(true);

    const shouldBeNull = service.getUser(createdUser.id);
    expect(shouldBeNull).toBeNull();
  });
});
