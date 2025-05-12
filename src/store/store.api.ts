import { v4 as uuidV4 } from 'uuid';
import { User, UserData } from './type';

export class Store {
  private data: User[];

  constructor() {
    this.data = [];
  }

  private getUserIndex(userId: string): number {
    return this.data.findIndex(({ id }) => id === userId);
  }

  private getUserData(userId: string): User | null {
    const user = this.data.find(({ id }) => id === userId);

    return user || null;
  }

  get(userId: string): User | null {
    return this.getUserData(userId);
  }

  getAll(): User[] {
    return [...this.data];
  }

  new(value: UserData): User {
    const id = this.data.push({ id: uuidV4(), ...value }) - 1;

    return this.data[id];
  }

  set(userId: string, { username, age, hobbies }: Partial<UserData>): User | null {
    const index = this.getUserIndex(userId);

    if (index === -1) return null;

    const newData: User = { ...this.data[index] };

    if (username) newData.username = username;

    if (age) newData.age = age;

    if (hobbies) newData.hobbies = hobbies;

    this.data[index] = newData;

    return this.getUserData(userId);
  }

  delete(userId: string): boolean {
    const initLength = this.data.length;
    this.data = this.data.filter(({ id }) => id !== userId);

    return this.data.length < initLength;
  }
}
