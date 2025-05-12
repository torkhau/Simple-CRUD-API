import 'dotenv/config';
import { CRUDServer } from './server';
import { Store } from './store/store.api';

export const store = new Store();

try {
  const port = parseInt(process.env.PORT || '3000', 10);
  const server = new CRUDServer(port);
  server.start();
} catch (error) {
  console.error('Error starting the server:', error);
  process.exit(1);
}
