const server = require('./src/app.js');
const { conn } = require('./src/db.js'); 

require("dotenv").config()//COMO HACEMOS ESTO EN LA RAIZ NO DEBEMOS REPETIRLO
const {PORT} = process.env

// Syncing all the models at alter
conn.sync({alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log("http://localhost:3001");
    console.log('%s listening at',PORT); // eslint-disable-line no-console
  });
});
    