import * as mongoose from 'mongoose';

import logger from './logger';

(<any>mongoose).Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

mongoose.connection.on('error', err => {
  logger.error(err);
});

export const connect = () =>
  mongoose.connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

export const closeConnection = (cb: () => void) => {
  mongoose.connection.close(() => {
    cb();
  });
};
