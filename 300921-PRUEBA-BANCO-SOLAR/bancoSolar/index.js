const http = require('http');
const fs = require('fs');
const { routeApi } = require('./routes/api');
const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {

    // Return html on Client Side
    if ( req.url === '/' && req.method === 'GET' ) {
      //console.log('CONECTADO');
      fs.readFile('./public/index.html', (err, html) => {
        res.setHeader( 'Content-type', 'text/html' );
        res.end(html);
      });
    } else {
      routeApi(req, res);
    };

  })
  .listen(PORT, () => {
    console.log('Listening Server on port ' + PORT);
  })
