const usuario = require('../routes/usuario');
const usuarios = require('../routes/usuarios');
const transferencia = require('../routes/transferencia');
const transferencias = require('../routes/transferencias');

module.exports = {

  routeApi: ( req, res ) => {
    const { url } = req;

    if ( url.startsWith('/usuario') ) {
      usuario.routes(req, res);
    };

    if ( url.startsWith('/usuarios') ) {
      usuarios.routes(req, res);
    };

    if ( url.startsWith('/transferencia') ) {
      transferencia.routes(req, res);
    };

    if ( url.startsWith('/transferencias') ) {
      transferencias.routes(req, res);
    };


  }

};
