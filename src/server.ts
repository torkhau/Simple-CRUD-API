import { Server } from 'http';

export class CRUDServer extends Server {
  private readonly PORT = 3000;

  constructor() {
    super();
  }

  start() {
    this.listen(this.PORT, () => {
      console.log(`Server started at http://localhost:${this.PORT}`);
    });
  }
}
