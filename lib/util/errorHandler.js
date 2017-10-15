import config from 'config';
import Logger from 'util/Logger';

const log = new Logger('errorHandler');

process.on('unhandledRejection', (error) => {
  log.error('errorHandler', 'caught unhandled promise rejection', { error });
});

export default (error, req, res, next) => {
  log.error('errorHandler', error.message, { error });

  const message = 'Something went wrong. Try again';
  const statusCode = error.statusCode || config.defaultStatusCode;
  const clientError = { error: { message, statusCode } };

  return res.json(clientError);
};
