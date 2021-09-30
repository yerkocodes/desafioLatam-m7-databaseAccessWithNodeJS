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
  idletimeoutmillis: IDLETIMEOUTMILLIS,
  connectiontimeoutmillis: CONNECTIONTIMEOUTMILLIS,
};

module.exports = config;
