require('dotenv').config();

const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const config = require('./modules/envConfig');

const argumentos = process.argv.slice(2);

const pool = new Pool(config);

pool.connect( async (err_connect, client, release) => {

  /* 2. Realizar una función asíncrona que consulte la tabla de transacciones y retorne
  máximo 10 registros de una cuenta en específico. Debes usar cursores para esto. */
  /* # node index.js consulta nombre_tabla */
  if (argumentos[0] == 'consulta') {

    const consulta = new Cursor(`SELECT * FROM ${argumentos[1]};`);
    const cursor = await client.query(consulta);

    cursor.read(10, (err, rows) => {
      console.log(rows);
      cursor.close();
      release();
      pool.end();
    })

    /* 1. Crear una función asíncrona que registre una nueva transacción utilizando valores
      * ingresados como argumentos en la línea de comando. Debe mostrar por consola la
      * última transacción realizada.*/
  /* # node index.js nuevaTransaccion IDcuentaOrigen IDcuentaDestino cantidadTransferir */
  } if ( argumentos[0] == 'nuevaTransaccion' ) {
    try {
      await client.query("BEGIN");

      const cuentaOrigen = Number(argumentos[1]);
      const cuentaDestino = Number(argumentos[2]);
      const cantidadTransferir = Number(argumentos[3]);

      const descontar = `update cuentas set saldo = saldo - ${cantidadTransferir} where id = ${cuentaOrigen} returning *`;
      const descuento = await client.query(descontar);

      const acreditar = `update cuentas set saldo = saldo + ${cantidadTransferir} where id = ${cuentaDestino} returning *`;
      const acreditacion = await client.query(acreditar);

      const mensaje = `Se transfirio ${cantidadTransferir}, desde la cuenta ${cuentaOrigen} a la cuenta ${cuentaDestino}.`;

      console.log(mensaje);

      //const fecha = new Date();
      //const comprobante = `INSERT INTO transacciones VALUES (${mensaje}, '2021', ${cantidadTransferir}, ${cuentaOrigen})`;

      //await client.query(comprobante);

      await client.query("COMMIT");
      release();
      pool.end();

    } catch (err) {
      await client.query("ROLLBACK");
      console.log(err);
    };

    /* 3. Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
ejecutada con valores ingresados como argumentos en la línea de comando. Debes
usar cursores para esto. */
    /* # node index.js consultaSaldo IDnumeroCuenta */
  } if ( argumentos[0] == 'consultaSaldo' ) {
    try{

      const numeroCuenta = argumentos[1]; 
      const consulta = new Cursor(`select * from cuentas where id = ${numeroCuenta}`) 
      const cursor = client.query(consulta);

      cursor.read(1, (err, rows) => {
        console.log(`Numero de cuenta: ${rows[0].id} - Saldo disponible: $${rows[0].saldo}`);
        cursor.close();
        release();
        pool.end();
      })

    } catch(err) {
      console.log(err.message);
    };
  } else {
    console.log('ERROR: Debe pasar como parametro una orden correcta');
    client.end();
  }
});
