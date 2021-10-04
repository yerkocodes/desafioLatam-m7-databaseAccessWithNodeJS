// "/transferencia" POST: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos.

const controladorTransferencia = require('../controllers/transferencia');

module.exports = {

  routes: ( req, res ) => {
    //console.log('Obteniendo transferencia');

    const { method } = req;

    if ( method === 'POST' ) {
      controladorTransferencia.addNewTransfer(req, res);
    };

  }

};
