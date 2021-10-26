const pool = require('../db/init').getPoolInstance();

module.exports = {

  newTransaction: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      let body;

      req.on('data', (data) => {
        body = JSON.parse(data);
      });

      req.on('end', async () => {

        try {

          client.query("BEGIN"); // Inicio de transaccion

          const descontar = {
            text: `update usuarios set balance = balance - $1 where nombre = $2 returning *`,
            values: [ cantidadTransferir, cuentaOrigen ],
          };
          const descuento = await client.query(descontar);

          const acreditar = {
            text: `update usuarios set balance = balance + $1 where nombre = $2 returning *`,
            values: [ cantidadTransferir, cuentaDestino ],
          };
          const acreditacion = await client.query(acreditar);

          const mensaje = `Se transfirio ${cantidadTransferir}, desde el usuario: ${cuentaOrigen} al usuario: ${cuentaDestino}.`;

          console.log(mensaje);

          const fecha = new Date();

          const comprobante = {
            text: 'insert into transferencias (emisor, receptor, monto, fecha) values ((select id from usuarios where nombre = $1), (select id from usuarios where nombre = $2), $3, $4) returning *',
            values: [ cuentaOrigen, cuentaDestino, cantidadTransferir, fecha ],
          };
          const response = await client.query(comprobante);

          console.log(response.rows[0]);

          res.end(JSON.stringify(response));

          await client.query("COMMIT");
          res.statusCode = 201;

        } catch (err) {

          await client.query("ROLLBACK");

        } finally {
          release();
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
        res.end(JSON.stringify(response.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };

    });

  },

};
