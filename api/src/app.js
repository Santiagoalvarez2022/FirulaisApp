const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mainRouter = require('./routes/index.js');
//importo lo que necesito de la db

const {Dog, Temperament } = require('./db')


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser()); 
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://firulais-app.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//redirecionamiento
server.use('/', mainRouter);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});





/*El error indica que el servidor no pudo encontrar el host que se está intentando conectarse. Específicamente, el mensaje de error indica que la función getaddrinfo no pudo encontrar la dirección IP correspondiente al nombre de host 'undefined'. Esto puede suceder por varias razones, incluyendo:

El nombre de
El servidor no está disponible.
La conexión a Internet no
El servidor PostgreSQL no está configurado correctamente.
Hay
Para

 */


module.exports = server;
