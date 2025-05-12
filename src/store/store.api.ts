import { v4 as uuidV4 } from 'uuid';
import { User, UserDTO } from './type';

export class Store {
  private data: Record<string, User>;

  constructor() {
    this.data = {};
  }

  get(userId: string): UserDTO | null {
    if (!this.data[userId]) return null;

    return {
      id: userId,
      ...this.data[userId],
    };
  }

  getAll(): UserDTO[] {
    return Object.entries(this.data).map(([id, user]) => ({
      id,
      ...user,
    }));
  }

  new(value: User): UserDTO {
    const userId = uuidV4();
    this.data[userId] = value;

    return {
      id: userId,
      ...this.data[userId],
    };
  }

  set(userId: string, { username, age, hobbies }: Partial<User>): UserDTO | null {
    const user = this.get(userId);

    if (!user) return null;

    const newData: User = { age: user.age, hobbies: user.hobbies, username: user.username };

    if (username) newData.username = username;

    if (age) newData.age = age;

    if (hobbies) newData.hobbies = hobbies;

    this.data[userId] = newData;

    return {
      id: userId,
      ...this.data[userId],
    };
  }

  delete(userId: string): UserDTO | null {
    const user = this.get(userId);

    if (user) delete this.data[userId];

    return user;
  }
}
