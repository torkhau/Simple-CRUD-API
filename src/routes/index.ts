import { IncomingMessage, ServerResponse } from 'node:http';
import { userController } from '../controllers';
import { User } from '../store/type';
import { isRequestMethod, RequestMethod, Response } from './type';

const getBody = (req: IncomingMessage): Promise<undefined | User> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

const sendResponse = (res: ServerResponse, { body, statusCode }: Response): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

export async function routeHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = req.url || '';
  const pathParts = url.split('/').filter(Boolean);
  const response: Response = { statusCode: 404, body: { message: 'Not found' } };

  if (pathParts[0] === 'api' && pathParts[1] === 'users') {
    let user: User | undefined;
    let reqMethod: RequestMethod;

    if (req.method) {
      const method = req.method.toUpperCase();

      if (isRequestMethod(method)) {
        reqMethod = method;
      } else {
        response.statusCode = 405;
        response.body.message = `Method "${method}" not allowed`;

        return sendResponse(res, response);
      }
    } else {
      response.statusCode = 400;
      response.body.message = 'Bad request';

      return sendResponse(res, response);
    }

    try {
      user = await getBody(req);
    } catch (error) {
      return sendResponse(res, response);
    }

    const { statusCode, body } = userController.handle(reqMethod, pathParts[2], user);
    response.statusCode = statusCode;
    response.body = body;
  }

  sendResponse(res, response);
}
