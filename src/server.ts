import { Server } from 'http';
import 'dotenv/config';

export class CRUDServer extends Server {
  private readonly PORT = parseInt(process.env.PORT || '3000', 10);

  constructor() {
    super();
  }

  start() {
    this.listen(this.PORT, () => {
      console.log(`Server started at http://localhost:${this.PORT}`);
    });
  }
}
