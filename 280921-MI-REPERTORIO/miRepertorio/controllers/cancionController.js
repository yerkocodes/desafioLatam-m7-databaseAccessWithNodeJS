const pool = require('../db/init').getPoolInstance();
const URL = require('url');

module.exports = {

  getSongs: (req, res) => {
    pool.connect( async (err_connect, client, release) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: 'select * from repertorio;',
        values: [],
      };

      //console.log('Entrando en getSongs');
      try {
        const response = await client.query(SQLQuery);
        //console.log(response);
        res.end(JSON.stringify(response.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  postSong: ( req, res ) => {
    pool.connect( async (err_connect, client, release) => {

      console.log('Entrando en postSong');

      if ( err_connect ) {
        console.log(err_connect);
      };

      let body;
      req.on("data", async (data) => { // req.on 
        body = JSON.parse(data);
        //console.log(typeof(data))
        //console.log('Hola probando desde req.on data: ' + data)
        //console.log('Hola probando desde req.on body: ' + data)

        const SQLQuery = {
          text: 'insert into repertorio (cancion, artista, tono) values ($1, $2, $3) returning *',
          values: [ body.cancion, body.artista, body.tono ],
        };

        try {
          const response = await client.query(SQLQuery);
          //console.log(response);
          res.end(JSON.stringify(response));
          console.log('Nuevo canción agregada: ' + JSON.stringify(response.rows[0]));
        } catch ( err ) {
          console.log(err.message);
        } finally {
          release();
        };
      }); // req.on end
    });
  },

  putSong: ( req, res ) => {
    pool.connect( async (err_connect, client, release) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      let body = "";
      req.on('data', (data) => {
        body = JSON.parse(data);
      });

      const SQLQuery = {
        text: 'update repertorio set cancion = $1, artista = $2, tono = $3 where id = $4 retunrning *',
        values: [ body.cancion, body.artista, body.tono, URL.parse(req.url, true).query.id ],
      };

      try {
        const resonse = await client.query(SQLQuery);
        res.end(JSON.stringify(response));
        console.log('Cancion modificada con éxito: ' + JSON.stringify(response.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

  deleteSong: ( req, res ) => {
    pool.connect( async (err_connect, client, release) => {
      if ( err_connect ) {
        console.log(err_connect);
      };

      const SQLQuery = {
        text: 'delete from repertorio where id = $1 returning *',
        values: [ URL.parse(req.url, true).query.id ],
      };

      try {
        const response = await client.query(SQLQuery);
        res.end(JSON.stringify(response));
        console.log('Cancion eliminada con éxito: ' + JSON.stringify(resonse.rows));
      } catch ( err ) {
        console.log(err.message);
      } finally {
        release();
      };
    });
  },

};
