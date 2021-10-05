const { Pool } = require('pg');

const {
  USER_DB,
  HOST,
  DATABASE,
  PASSWORD,
  PORT,
  MAX,
  MIN,
  IDLETIMEOUTMILLIS,
  CONNECTIONTIMEOUTMILLIS,
} = process.env;

const config = {
  user_db:USER_DB,
  host:HOST,
  database:DATABASE,
  password:PASSWORD,
  port:PORT,
  max:MAX,
  min:MIN,
  idleTimeOutMillis:IDLETIMEOUTMILLIS,
  connectionTimeOutMillis:CONNECTIONTIMEOUTMILLIS,
};

// Singleton --------------------------------------
class CustomPool {
  constructor() {
    if ( !CustomPool.instance ) {
      CustomPool.instace = this;
    };
    return CustomPool.instace;
  };

  getPoolInstance() {
    if ( !CustomPool.poolInstance ) {
      CustomPool.poolInstance = new Pool(config);
    };
    return CustomPool.poolInstance;
  };
};

const instance = new CustomPool();

Object.freeze(instance);

module.exports = instance;
