const pool = require('../db/init').getPoolInstance();

module.exports = {
  getUsers: (req, res) => {
    //res.end('USUARIOOO method desde controllers');
    pool.connect( async (err_connect, client, release) => {
      if (err_connect) {
        console.log(err_connect)
      }
      try {
        const response = await client.query('select * from usuarios;')
        res.end(JSON.stringify(response.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
        client.end();
        pool.end();
      };
    } )
  }
};
