export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface User extends UserData {
  id: string;
}

export const isUserData = (userData: unknown): userData is UserData => {
  if (typeof userData !== 'object' || userData === null) return false;

  const allowedKeys: Array<keyof User> = ['username', 'age', 'hobbies'];
  const keys = Object.keys(userData);

  if (keys.some((key) => !allowedKeys.includes(key as keyof User))) return false;

  const { username, age, hobbies } = userData as UserData;

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

export const isPartialUserData = (userData: unknown): userData is Partial<UserData> => {
  if (typeof userData !== 'object' || userData === null) return false;

  const allowedKeys: Array<keyof User> = ['username', 'age', 'hobbies'];
  const keys = Object.keys(userData);

  if (keys.some((key) => !allowedKeys.includes(key as keyof User))) return false;

  const partialUser = userData as Partial<UserData>;
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
