import 'dotenv/config';
import { CRUDServer } from './server';

try {
  const port = parseInt(process.env.PORT || '3000', 10);
  const server = new CRUDServer(port);
  server.start();
} catch (error) {
  console.error('Error starting the server:', error);
  process.exit(1);
}
