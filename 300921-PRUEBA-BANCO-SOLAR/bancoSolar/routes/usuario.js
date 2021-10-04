//  "/usuario" POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
//  "/usuario" PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
//  "/usuario" DELETE: Recibe el id de un usuario registrado y lo elimina .

const controladorUsuario = require('../controllers/usuario');

module.exports = {

  routes: ( req, res ) => {
    //console.log('Obteniendo usuario');
    const { method } = req;

    if ( method === 'POST' ) {
      controladorUsuario.addNewUser(req, res);
    };

    if ( method === 'PUT' ) {
      controladorUsuario.updateUser(req, res);
    };

    if ( method === 'DELETE' ) {
      controladorUsuario.deleteUser(req, res);
    };

  }

};
