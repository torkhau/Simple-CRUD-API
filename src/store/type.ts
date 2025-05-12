export interface User {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UserDTO extends User {
  id: string;
}
