const pool = require('../db/init').getPoolInstance();
const URL = require('url');

module.exports = {

  getUsers: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      if (err_connect) {
        console.log(err_connect)
      };

      const SQLQuery = {
        text: 'select * from usuarios;',
        values: [],
      };

      try {
        const response = await client.query(SQLQuery);
        //console.log(response.rows);
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

  postUser: (req, res) => {

    pool.connect( async (err_connect, client, release) => {
      console.log('Metodo: "POST". Ingresando un nuevo usuario.');
      
      let body = "";

      req.on('data', (data) => {
        //body += data;
        body = JSON.parse(data);
      });

      req.on('end', async () => {

        const SQLQuery = {
          text: 'insert into usuarios (nombre, balance) values ($1, $2) returning *;',
          values: [body.nombre, body.balance],
        };

        try {
          const response = await client.query(SQLQuery);
          res.end(JSON.stringify(response));
          console.log('Nuevo usuario registrado: ' + JSON.stringify(response.rows[0]));
        } catch ( err ) {
          console.log(err.message);
        } finally {
          release();
          //client.end();
          //pool.end();
        };
      
      });

    });

  },

  putUser: (req, res) => {
    
    pool.connect( async (err_connect, client, release) => {
       console.log('Metodo: "PUT". Ingresando modificar un usuario.');
      
      let body = "";

      req.on('data', (data) => {
        //body += data;
        body = JSON.parse(data);
      });

      req.on('end', async () => {

        const SQLQuery = {
          text: 'update usuarios set nombre = $1, balance = $2 where id = $3 returning *',
          values: [ body.name, body.balance, URL.parse(req.url, true).query.id ],
        };

        try {
          const response = await client.query(SQLQuery);
          res.end(JSON.stringify(response));
          console.log('Usuario modificado: ' + JSON.stringify(response.rows));
        } catch ( err ) {
          console.log(err.message);
        } finally {
          release();
          //client.end();
          //pool.end();
        };
      
      });
     
    });

  },

  deleteUser: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      if (err_connect) {
        console.log(err_connect)
      };

      const SQLQuery = {
        text: `delete from usuarios where id = $1 returning *;`,
        values: [ URL.parse(req.url, true).query.id ],
      };

      try {
        const response = await client.query(SQLQuery);
        res.end(JSON.stringify(response))
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
