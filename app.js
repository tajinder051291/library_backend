import http from 'http';
import os from 'os';
import config from 'config';
import Server from './bin/server';

class Application {

  app;
  address; bind;
  port;
  server;
  serverObj;

  async initApp() {
    this.port = config.port;
    this.serverObj = new Server();
    this.app = await this.serverObj.initServer();
    this.app.set('port', this.port);
    await this.initAppServer();
  }

  async initAppServer() {
    try {
      this.server = await http.createServer(this.app);
      this.server.listen(this.port);
      await this.server.on('listening', () => {
        this.address = this.server.address();
        this.bind = typeof this.address === 'string' ? `pipe ${this.address}` : `port ${this.address.port}`;
        console.log(`Listening On: ${this.bind}`);
        console.log(`Server running on: ${this.port}`);
      });
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }
}

const app = new Application();

(async () => {
  await app.initApp();
})();
