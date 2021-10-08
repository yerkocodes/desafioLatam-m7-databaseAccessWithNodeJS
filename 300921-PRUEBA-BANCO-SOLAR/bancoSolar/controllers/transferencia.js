const pool = require('../db/init').getPoolInstance();

module.exports = {

  newTransaction: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      let body = ""

      req.on('data', (data) => {
        body = JSON.parse(data);
      });

      req.on('end', async () => {

        console.log(body.emisor);
        console.log(body.receptor);
        console.log(body.monto);

        try {

          client.query("BEGIN"); // Inicio de transaccion

          const cuentaOrigen = body.emisor;
          const cuentaDestino = body.receptor;
          const cantidadTransferir = body.monto;

          const descontar = `update usuarios set balance = balance - 10000 where nombre = "libertad" returning *`;
          const descuento = await client.query(descontar);

          const acreditar = `update usuarios set balance = balance + 10000 where nombre = "Cortes" returning *`;
          const acreditacion = await client.query(acreditar);

          const mensaje = `Se transfirio ${cantidadTransferir}, desde el usuario: ${cuentaOrigen} al usuario: ${cuentaDestino}.`;

          console.log(mensaje);

          const fecha = new Date();
          const comprobante = {
            //text: 'insert into transferencias (emisor, receptor, monto, fecha) values ($1, $2, $3, $4) returning *;',
            text: 'insert into transferencias (emisor, receptor, monto, fecha) values ((select id from usuarios where nombre = $1;), (select id from usuarios where nombre = $2;), $3, $4) returning *;',
            values: [ 'libertad', 'Cortes', 10000, fecha ],
          };
          const response = await client.query(comprobante);
          console.log(response);
          res.end(JSON.stringify(response));

          await client.query("COMMIT");

        } catch ( err ) {

          console.log('PERDON');
          await client.query("ROLLBACK");
          console.log('****' + err.message);

        } finally {
          release();
          //client.end();
          //pool.end();
        };

      });

    });

  },

  getTransaction: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      if (err_connect) {
        console.log(err_connect);
      };

      const SQLQuery = {
        rowMode: 'array',
        text: 'select * from transferencias;',
        values: [],
      };

      try {
        const response = await client.query(SQLQuery);
        //console.log(JSON.stringify(response.rows));
        res.end(JSON.stringify(response.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
        //client.end();
        //pool.end();
      };

    });

  },

};
