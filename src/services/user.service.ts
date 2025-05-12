import { store } from '../store';
import { User } from '../store/type';

export class UserService {
  getUser(userId: string) {
    return store.get(userId);
  }

  getUsers() {
    return store.getAll();
  }

  createUser(user: User) {
    return store.new(user);
  }

  updateUser(userId: string, user: Partial<User>) {
    return store.set(userId, user);
  }

  deleteUser(userId: string) {
    return store.delete(userId);
  }
}
