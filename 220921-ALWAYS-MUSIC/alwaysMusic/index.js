require('dotenv').config();

const { Client } = require('pg');
const config = require('./modules/envConfig');

//const addStudent = require('./modules/addStudent');
//const deleteStudent = require('./modules/deleteStudent');
//const getStudentBtRut = require('./modules/getStudentByRut');
//const getStudents = require('./modules/getStudents');
//const updateStudent = require('./modules/updateStudent');

const client = new Client(config);
