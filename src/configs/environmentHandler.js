import express      from 'express';
import path         from 'path';
import renderer     from 'react-engine';
import favicon      from 'serve-favicon';
import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';

import userModule   from '../modules/userModule';

export default (app) => {
  /**
   * view engine setup
   */

  // create the view engine with `react-engine`
  const engine = renderer.server.create();

  // set the engine
  app.engine('.jsx', engine);

  // set the view directory
  app.set('views', path.join(__dirname, '..', 'views'));

  // set js as the view engine
  app.set('view engine', 'jsx');

  // finally, set the custom view
  app.set('view', renderer.expressView);

  /**
   * serve static files
   */
  app.use(express.static(path.join(__dirname, '..', 'assets')));
  app.use(favicon(path.join(__dirname, '..', 'assets', 'favicon.ico')));

  // @ifndef TEST
  /**
   * logger
   */
  app.use(morgan(
    ':remote-addr\t' +
    ':status ' +
    ':method ' +
    ':url\t' +
    ':res[content-length] - ' +
    ':response-time ms'
  ));
  // @endif

  /**
   * parser
   */

  // form value parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  // cookie parser
  app.use(cookieParser());

  // token parser
  app.use(userModule.middleware.tokenParser());
};