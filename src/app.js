'use strict';

// make `.jsx` file requirable by node
require('babel/register');

import express            from 'express';
import environmentHandler from './configs/environmentHandler';
import databaseHandler    from './configs/databaseHandler';
import routesHandler      from './configs/routesHandler';
import errorHandler       from './configs/errorHandler';
import serverHandler      from './configs/serverHandler';

const app = express();

// setup environment
environmentHandler(app);

// setup database connection and models
databaseHandler(app);

// setup routing
routesHandler(app);

// error handling
errorHandler(app);

// launch the server
serverHandler(app);

// exports the app for testing
export default app;