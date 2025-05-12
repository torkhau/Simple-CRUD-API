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

  set(value: User): UserDTO {
    const userId = crypto.randomUUID();
    this.data[userId] = value;

    return {
      id: userId,
      ...this.data[userId],
    };
  }

  delete(key: string): void {
    delete this.data[key];
  }
}
