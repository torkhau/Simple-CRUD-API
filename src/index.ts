import { CRUDServer } from './server';

const server = new CRUDServer();

try {
  server.start();
} catch (error) {
  console.error('Error starting the server:', error);
  process.exit(1);
}
