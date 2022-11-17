
import express, { RequestHandler, } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { init } from './utils/mariadb.connector';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import adminRouter from './routes/admin';
import gamesRouter from './routes/games';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
  }

  private config() {

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    init();
  }

  private routerSetup() {
    this.app.use('/', indexRouter);
    this.app.use('/users', usersRouter);
    this.app.use('/admin', adminRouter);
    this.app.use('/games', gamesRouter)
  }

}

export default new App().app;

