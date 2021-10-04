const controladorUsuarios = require('../controllers/usuarios');

module.exports = {

  routes: ( req, res ) => {
    //console.log('Obteniendo usuarios');

    const { method } = req;

    if ( method === 'GET' ) {
      controladorUsuarios.getUsers(req, res);
    }

  }

};
