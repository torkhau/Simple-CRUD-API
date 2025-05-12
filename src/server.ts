import { Server } from 'http';
import { routeHandler } from './routes';

export class CRUDServer extends Server {
  private readonly port: number;

  constructor(port: number) {
    super(routeHandler);
    this.port = port;
  }

  start() {
    this.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}
