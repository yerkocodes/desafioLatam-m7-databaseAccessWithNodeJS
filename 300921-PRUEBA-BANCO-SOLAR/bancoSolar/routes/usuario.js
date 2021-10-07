const controladorUsuario = require('../controllers/usuario');

module.exports = {
  routes: (req, res) => {
    const { method } = req;

    if ( method === 'GET' ) {
      controladorUsuario.getUsers(req, res);
    };

    if ( method === 'DELETE' ) {
      controladorUsuario.deleteUser(req, res);
    };

    if ( method === 'POST' ) {
      controladorUsuario.postUser(req, res);
    };

    if ( method === 'PUT' ) {
      controladorUsuario.putUser(req, res)
    };
  }
};
