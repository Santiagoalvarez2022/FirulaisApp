const { Router } = require('express');
const express = require('express')
// Importar todos los routers;

const get_temperaments = require('./route_getTemperaments.js')

// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", get_temperaments)

//DogsRoutes esta importado en app.js todas las rutas de dogs

module.exports = router;
