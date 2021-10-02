require('dotenv').config();

const { Client } = require('pg');
const config = require('./modules/envConfig');
const arguments = process.argv.slice(2);

//const addStudent = require('./modules/addStudent');
//const deleteStudent = require('./modules/deleteStudent');
//const getStudentBtRut = require('./modules/getStudentByRut');
//const getStudents = require('./modules/getStudents');
//const updateStudent = require('./modules/updateStudent');

const client = new Client(config);

client.connect();

const option = arguments[0];

switch ( option ) {
  case 'rut':
    const consultarRut = async (rut) => {
      try {
        const res = await client.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
        console.log(res.rows);
      } catch (err) {
        console.log(err.message);
      } finally {
        client.end();
      };
    };
    consultarRut(arguments[1]);
    break;

  case 'consulta':
    const consulta = async () => {
      const res = await client.query(`select * from estudiantes;`);
      console.log(res.rows);
      client.end();
    };
    consulta();
    break;

  case 'nuevo':
    const addStudent = async (nombre, rut, curso, nivel) => {
      try {
        const res = await client.query(`insert into estudiantes values ('${nombre}','${rut}','${curso}',${Number(nivel)})`);
        console.log(`Estudiante ${nombre} agregado con exito!`);
      } catch(err) {
        console.log(err.message);
      } finally {
        client.end();
      };
    };
    addStudent(arguments[1],arguments[2],arguments[3],arguments[4]);
  break;

  case 'editar':
    const updateStudent = async (nombre, rut, curso, nivel) => {
      try {
        const res = await client.query(`update estudiantes set nombre = '${nombre}', curso = '${curso}', nivel = ${Number(nivel)} where rut = '${rut}'`);
        console.log(`Estudiante ${nombre} editado con exito.`);
      } catch (err) {
        console.log(err.message);
      } finally {
        client.end();
      };
    };
    updateStudent(arguments[1],arguments[2],arguments[3],arguments[4])
  break;

  case 'eliminar':
    const deleteStudent = async (rut) => {
      try {
        const res = await client.query(`delete from estudiantes where rut = '${rut}';`)
        console.log(`Registro de estudiante con rut ${rut} eliminado.`);
      } catch(err) {
        console.log(err.message);
      } finally {
        client.end();
      };
    };
    deleteStudent(arguments[1]);
  break;

  default:
    console.log('Debe ingresar una instruccion valida.');
    client.end();
  break;
};
