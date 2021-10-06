const controladorUsuario = require('../controllers/usuario');

module.exports = {
  routes: (req, res) => {
    const { method } = req;

    if ( method === 'GET' ) {
      controladorUsuario.getUsers(req, res);
    };
  }
};
