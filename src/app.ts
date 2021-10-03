import express, { Application } from 'express';
import httpStatus from 'http-status';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as http from 'http';
import cors from 'cors';
import paginate from 'express-paginate';
import { Server } from 'socket.io';

import configs from './configs';
import connectToDb from './configs/mongoose';
import errorMiddleware from './middlewares/error';
import routesV1 from './routes/v1';
import log from './utils/logger';

const app: Application = express();
const httpServer = http.createServer(app);
morgan('tiny');

/** Parser the request **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Cors **/
app.use(cors());

/** Pagination **/
app.use(paginate.middleware(10, 50));

/** Rules of our API **/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE PATCH');
    return res.status(httpStatus.OK).end();
  }

  return next();
});

/** Logging the request **/
app.use(morgan(':remote-addr :method :url :status :response-time ms'));

/** Routes **/
app.use('/v1', routesV1);

/** Error handling **/
app.use(errorMiddleware.routeNotFound);
app.use(errorMiddleware.handler);

/** Socket IO **/
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
app.set('socketio', io);

/** Create the server **/
httpServer.listen(configs.server.port, async () => {
  log.info(
    `Server is running on port: ${configs.server.hostname}:${configs.server.port}`,
  );

  await connectToDb();
});
