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
    if( err_connect ) {
      throw new Error(error_conexion);
    };
    //--------------------------------------------------------
    // Obtener estudiante mediante el rut
    if ( option == 'rut' ) {
      const getStudentByRut = async (rut) => {
        const SQLQuery = {
          name: 'fetch-user',
          text:"select * from estudiantes where rut = $1;",
          values: [rut],
        };
        try {
          const res = await client.query(SQLQuery);
          release();
          console.log(res.rows[0]);
        } catch ( err ) {
          console.log(err.message);
        } finally {
          client.end();
        };
      };
      getStudentByRut(arguments[1]);
    };

    // Consultar todos los estudiantes registrados
    if ( option == 'consulta' ) {
      const consultaEstudiantes = async () => {
        const SQLQuery = {
          rowMode: 'array',
          text: 'select * from estudiantes',
        };
        try {
          //const SQLQuery = 'select * from estudiantes;';
          const res = await client.query(SQLQuery);
          release();
          console.log(res.rows);
        } catch ( err ) {
          console.log(err.message);
        } finally {
          client.end();
        };
      };
      consultaEstudiantes();
    };

    // Registrar un nuevo estudiante
    if ( option == 'nuevo' ) {
      const addStudent = async (nombre, rut, curso, nivel) => {
        const SQLQuery = {
          name: 'fetch-user',
          text: 'insert into estudiantes values ($1,$2,$3,$4) RETURNING *',
          values: [nombre, rut, curso, nivel],
        };
        try {
          const res = await client.query(SQLQuery);
          release();
          console.log(`Estudiante ${nombre} agregado con exito!`);
          console.log(res.rows[0]);
        } catch(err) {
          console.log(err.message);
        } finally {
          client.end();
        };

      };
      addStudent(arguments[1],arguments[2],arguments[3],arguments[4]);
    };

    // Editar un estudiante existente mediante su nombre
    if ( option == 'editar' ) {
      const updateStudent = async ( rut, curso, nivel, nombre ) => {
        const SQLQuery = {
          name: 'fetch-user',
          text: 'update estudiantes set rut = $1, curso = $2, nivel = $3 where nombre = $4 RETURNING *',
          values: [ rut, curso, nivel, nombre ],
        };
        try {
          const res = await client.query(SQLQuery);
          release();
          console.log(`Estudiante ${nombre} editado con exito.`);
          console.log(res.rows[0]);
        } catch (err) {
          console.log(err.message);
        } finally {
          client.end();
        };
      };
      updateStudent(arguments[1],arguments[2],arguments[3],arguments[4])
    };

    // Eliminar un estudiante mediante su rut
    if ( option == 'eliminar' ) {
      const deleteStudent = async (rut) => {
        const SQLQuery = {
          name: 'fetch-user',
          text: 'delete from estudiantes where rut = $1;',
          values: [ rut ],
        };
        try {
          const res = await client.query(SQLQuery);
          release();
          console.log(`Registro de estudiante con rut ${rut} eliminado.`);
        } catch(err) {
          console.log(err.message);
        } finally {
          client.end();
        };
      };
      deleteStudent(arguments[1]);

    };
    //--------------------------------------------------------
  } catch ( err ) {
    console.log(err.message);
  } finally {
    pool.end() ;
  };

});
