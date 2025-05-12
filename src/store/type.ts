export interface User {
  username: string;
  age: number;
  hobbies: string[];
}

export const isUserData = (userData: unknown): userData is User => {
  if (typeof userData !== 'object' || userData === null) return false;

  const { username, age, hobbies } = userData as User;

  if (
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies) ||
    !hobbies.every((hobby) => typeof hobby === 'string')
  ) {
    return false;
  }

  return true;
};

export const isPartialUserData = (userData: unknown): userData is Partial<User> => {
  if (typeof userData !== 'object' || userData === null) return false;

  const partialUser = userData as Partial<User>;
  const { username, age, hobbies } = partialUser;

  if (username !== undefined && typeof username !== 'string') return false;
  if (age !== undefined && typeof age !== 'number') return false;
  if (hobbies !== undefined) {
    if (!Array.isArray(hobbies) || !hobbies.every((hobby) => typeof hobby === 'string')) {
      return false;
    }
  }

  return true;
};

export interface UserDTO extends User {
  id: string;
}
