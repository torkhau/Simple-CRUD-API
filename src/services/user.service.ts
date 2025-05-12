import { store } from '..';
import { UserData } from '../store/type';

export class UserService {
  getUser(userId: string) {
    return store.get(userId);
  }

  getUsers() {
    return store.getAll();
  }

  createUser(user: UserData) {
    return store.new(user);
  }

  updateUser(userId: string, user: Partial<UserData>) {
    return store.set(userId, user);
  }

  deleteUser(userId: string) {
    return store.delete(userId);
  }
}
