import mysql from 'mysql';
import config from 'config';
import Logger from 'util/Logger';

const log = new Logger('models/database');

const pool = mysql.createPool({
  connectionLimit: config.mysql.connLimit,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.db,
});

export default {
  getConnection: (callback) => {
    pool.getConnection((error, connection) => {
      callback(error, connection);
    });
  },

  executeQueryWithParams: (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          log.error('executeQueryWithParams', 'error getting db connection', { error });
          return reject(error);
        }

        connection.query(sql, params, (err, results) => {
          connection.release();
          if (err)
            return reject(err);

          return resolve(results);
        });
      });
    });
  },

  executeQuery: (sql, callback) => {
    pool.getConnection((error, connection) => {
      if (error) {
        log.error('executeQueryWithParams', 'error getting db connection', { error });
        return callback(error);
      }

      connection.query(sql, (err, results) => {
        connection.release();

        return callback(err, results);
      });
    });
  },
};
