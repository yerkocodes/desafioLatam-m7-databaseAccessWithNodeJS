// "/transferencias" GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo.

const controladorTransferencias = require('../controllers/transferencias');

module.exports = {

  routes: ( req, res ) => {
    //console.log('Obteniendo transferencias');

    const { method } = req;

    if ( method === 'GET' ) {
      controladorTransferencias.getTransfers(req, res);
    };

  }

};
