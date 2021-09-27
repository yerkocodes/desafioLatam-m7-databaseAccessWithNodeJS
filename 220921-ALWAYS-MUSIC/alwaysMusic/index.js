require('dotenv').config();

const { Client } = require('pg');

const addStudent = require('./modules/addStudent');
const deleteStudent = require('./modules/deleteStudent');
const getStudentBtRut = require('./modules/getStudentByRut');
const getStudents = require('./modules/getStudents');
const updateStudent = require('./modules/updateStudent');

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

const client = new Client(config);
