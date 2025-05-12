import { User } from '../store/type';

export interface Response {
  statusCode: number;
  body?: ResponseBody;
}

interface ResponseBody {
  message: string;
  data?: User | User[];
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const isRequestMethod = (method: string): method is RequestMethod =>
  ['GET', 'POST', 'PUT', 'DELETE'].includes(method);
