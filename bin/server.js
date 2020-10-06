import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import DB from '../src/helpers/db';
import Routes from '../src/routes';
import { authMiddleWare } from '../src/helpers/middlewares';

class Server {
  app;
  db;

  async initServer() {
    try {
      this.app = await express();
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cookieParser());

      this.app.use(express.static(path.join(__dirname, '../', 'public')));

      this.app.use(cors({
        exposeHeaders: ['date', 'content-type', 'content-length', 'connection', 'server',
          'x-powered-by', 'access-control-allow-origin', 'authorization', 'x-final-url'],
        allowHeaders: ['content-type', 'accept', 'authorization']
      }));
      this.app.use(helmet());
      this.app.use(authMiddleWare);

      this.db = new DB();
      await this.db.init();

      await this.configureRoutes(this.db);

      return this.app;
    }
    catch (err) {
      throw err;
    }
  }

  async configureRoutes(db) {
    this.router = express.Router();
    const routes = new Routes(this.router,db);
    await routes.register();
    this.app.use(this.router);
  }

}

export default Server;
