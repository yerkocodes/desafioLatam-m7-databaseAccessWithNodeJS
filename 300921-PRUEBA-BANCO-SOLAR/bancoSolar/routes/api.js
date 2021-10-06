const usuario = require('../routes/usuario');
const transferencia = require('../routes/transferencia');

module.exports = {
  routeApi: ( req, res ) => {
    const { url, method } = req;

    if ( url.startsWith('/usuario') ) {
      usuario.routes(req, res);
    };

    if ( url.startsWith('/usuarios') ) {
      usuario.routes(req, res);
    };

    if ( url.startsWith('/transferencia') ) {
      transferencia.routes(req, res);
    };

    if ( url.startsWith('/transferencias') ) {
      transferencia.routes(req, res);
    };

  }
};
