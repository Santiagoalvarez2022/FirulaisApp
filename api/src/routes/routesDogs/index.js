const { Router } = require('express');
const express = require('express')
// Importar todos los routers;

const get_all = require('./route_getAll')
const post_dog= require('./route_postDog')
const get_dataApi =require('./route_getDataApi')
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/api",get_dataApi )

router.use("/", get_all)

router.use("/", post_dog)


//DogsRoutes esta importado en app.js todas las rutas de dogs

module.exports = router;
