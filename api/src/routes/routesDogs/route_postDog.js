const express = require('express');
const router = express.Router();
const {handler_postDog} = require('../../handlers/index')


router.post( "/" ,handler_postDog)


module.exports = router

// ID *
// Nombre *
// Altura *
// Peso *
// Años de vida