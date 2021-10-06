require('dotenv').config();
const { Pool } = require('pg');

const {
  USER_DB,
  HOST,
  DATABASE,
  PASSWORD,
  PORT_DB,
  MAX,
  MIN,
  IDLETIMEOUTMILLIS,
  CONNECTIONTIMEOUTMILLIS,
} = process.env;

const config = {
  user:USER_DB,
  host:HOST,
  database:DATABASE,
  password:PASSWORD,
  port:PORT_DB,
  max:MAX,
  min:MIN,
  idleTimeOutMillis:IDLETIMEOUTMILLIS,
  connectionTimeOutMillis:CONNECTIONTIMEOUTMILLIS,
};

//module.exports = config;

//console.log(config)
////console.log(process.env)

//// Singleton --------------------------------------
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
