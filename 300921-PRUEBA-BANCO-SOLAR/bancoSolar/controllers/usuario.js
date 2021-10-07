const pool = require('../db/init').getPoolInstance();
const URL = require('url');

module.exports = {

  getUsers: (req, res) => {

    //res.end('USUARIOOO method desde controllers');
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
        //client.end(); // ??????????????????????????
        //pool.end(); // ??????????????????????????

      };
    });

  },

  //postUser: (req, res) => {

  //},

  //putUser: (req, res) => {

  //},

  deleteUser: (req, res) => {

    pool.connect( async (err_connect, client, release) => {

      if (err_connect) {
        console.log(err_connect)
      };

      //const params = url.parse(req.url, true).query;
      //console.log(params.id);
      //console.log(URL.parse(req.url, true).query.id);

      const SQLQuery = {
        text: `delete from usuarios where id = $1 returning *;`,
        values: [ URL.parse(req.url, true).query.id ],
      };

      let response;
      try {
        response = await client.query(SQLQuery);
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
