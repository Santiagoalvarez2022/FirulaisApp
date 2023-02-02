const { Router } = require('express');
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();
const index_Router_Dogs = require('./routesDogs/index')
const index_Router_Temperaments = require('./routesTemperaments/index') 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs",index_Router_Dogs )
router.use("/temperaments",index_Router_Temperaments )


module.exports = router;
