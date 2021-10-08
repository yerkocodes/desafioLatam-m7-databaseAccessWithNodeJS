const controladorTransferencia = require('../controllers/transferencia');

module.exports = {
  routes: (req, res) => {
    const { method } = req;

    if ( method === 'POST' ) {
      controladorTransferencia.newTransaction(req, res);
    };

    if ( method === 'GET' ) {
      controladorTransferencia.getTransaction(req, res);
    };

  }
};
