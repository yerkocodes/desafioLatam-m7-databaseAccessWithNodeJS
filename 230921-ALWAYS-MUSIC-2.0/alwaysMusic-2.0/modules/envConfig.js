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
  user: USER_DB,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
  max: MAX,
  min: MIN,
  idleTimeOutMillis: IDLETIMEOUTMILLIS,
  connectionTimeOutMillis: CONNECTIONTIMEOUTMILLIS,
};

module.exports = config;
