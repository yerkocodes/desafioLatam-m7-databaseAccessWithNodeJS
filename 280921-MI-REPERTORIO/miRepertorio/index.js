const http = require('http');
const fs = require('fs');
const { routeApi } = require('./routes/api');

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    const { url, method } = req;

    if ( url === '/' && method === 'GET' ) {
      res.writeHead(200, { 'Content-type': 'text/html' });
      fs.readFile('./public/index.html', 'utf8', ( err, html ) => {
        res.end(html);
      });
    } else {
      routeApi(req, res);
    };

  })
  .listen(PORT, () => {
    console.log('Listening Server on port ' + PORT);
  })
