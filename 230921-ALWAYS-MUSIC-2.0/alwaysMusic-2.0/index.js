require('dotenv').config();

const { Pool } = require('pg');
const config = require('./modules/envConfig');
const arguments = process.argv.slice(2);

//const addStudent = require('./modules/addStudent');
//const deleteStudent = require('./modules/deleteStudent');
//const getStudentBtRut = require('./modules/getStudentByRut');
//const getStudents = require('./modules/getStudents');
//const updateStudent = require('./modules/updateStudent');

const pool = new Pool(config);

pool.connect( async ( err_connect, client, release ) => {
  const option = arguments[0];
  try {
    // Obtener estudiante mediante el rut
    if ( option == 'rut' ) {
      const getStudentByRut = async (rut) => {
        const SQLQuery = {
          name: 'fetch-user',
          text:"select * from estudiantes where rut = $1;",
          values: [rut],
        };
        const res = await client.query(SQLQuery);
        release();
        console.log(res.rows[0]);
      };
      getStudentByRut(arguments[1]);
    };

    if ( option == 'consulta' ) {
      try {
        const consultaEstudiantes = async () => {
          const SQLQuery = {
            rowMode: 'array',
            text: "select * from estudiantes",
          };
          //const SQLQuery = 'select * from estudiantes;';
          const res = await client.query(SQLQuery);
          //release();
          console.log(res.rows);
        };
      consultaEstudiantes();
      } catch (err) {
        console.log(err);
      }
    };

  } catch ( err ) {
    console.log(err.message);
  } finally {
    //client.end();
    pool.end();
  };

});


//switch ( option ) {

//case 'consulta':
//break;

//case 'nuevo':
//const addStudent = async (nombre, rut, curso, nivel) => {
//try {
//const res = await client.query(`insert into estudiantes values ('${nombre}','${rut}','${curso}',${Number(nivel)})`);
//console.log(`Estudiante ${nombre} agregado con exito!`);
//} catch(err) {
//console.log(err.message);
//} finally {
//client.end();
//};
//};
//addStudent(arguments[1],arguments[2],arguments[3],arguments[4]);
//break;

//case 'editar':
//const updateStudent = async (nombre, rut, curso, nivel) => {
//try {
//const res = await client.query(`update estudiantes set nombre = '${nombre}', curso = '${curso}', nivel = ${Number(nivel)} where rut = '${rut}'`);
//console.log(`Estudiante ${nombre} editado con exito.`);
//} catch (err) {
//console.log(err.message);
//} finally {
//client.end();
//};
//};
//updateStudent(arguments[1],arguments[2],arguments[3],arguments[4])
//break;

//case 'eliminar':
//const deleteStudent = async (rut) => {
//try {
//const res = await client.query(`delete from estudiantes where rut = '${rut}';`)
//console.log(`Registro de estudiante con rut ${rut} eliminado.`);
//} catch(err) {
//console.log(err.message);
//} finally {
//client.end();
//};
//};
//deleteStudent(arguments[1]);
//break;

//default:
//console.log('Debe ingresar una instruccion valida.');
//client.end();
//break;
//};
