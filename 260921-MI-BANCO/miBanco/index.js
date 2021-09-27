require('dotenv').config();

const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const config = require('./modules/envConfig');

const argumentos = process.argv.slice(2);

const pool = new Pool(config);

pool.connect( async (err_connect, client, release) => {

  if (argumentos[0] == 'consulta') {

    const consulta = new Cursor(`SELECT * FROM ${argumentos[1]};`);
    const cursor = await client.query(consulta);

    cursor.read(10, (err, rows) => {
      console.log(rows);
      cursor.close();
      release();
      pool.end();
    })

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

  } /*if (  ) {

  } */else {
    console.log('ERROOOOOOR');
  }

});
