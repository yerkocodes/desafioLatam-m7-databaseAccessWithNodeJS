const songController = require('../controllers/cancionController');

module.exports = {
  routeApi: ( req, res ) => {
    const { url, method } = req;

    if ( url === '/cancion' && method === 'POST' ) {
      songController.postSong(req, res);
    };

    if ( url === '/canciones' &&  method === 'GET' ) {
      songController.getSong(req, res);
    };

    if ( url === '/cancion' &&  method === 'PUT' ) {
      songController.putSong(req, res);
    };

    if ( url === '/cancion' &&  method === 'DELETE' ) {
      songController.deleteSong(req, res);
    };

  },
};
