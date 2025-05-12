import { IncomingMessage, ServerResponse } from 'node:http';
import { userController } from '../controllers';

export async function routeHandler(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const pathParts = url.split('?')[0].split('/').filter(Boolean);

  if (pathParts[0] === 'api' && pathParts[1] === 'users') {
    return userController.handle(req, res, pathParts);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
}
