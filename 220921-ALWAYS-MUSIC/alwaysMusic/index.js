require('dotenv').config();

const { Client } = require('pg');
//console.log(Client);

const {
  USER_DB,
  HOST,
  DATABASE,
  PASSWORD,
  PORT,
} = process.env;

const config = {
  user: USER_DB,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
};
console.log(config);
