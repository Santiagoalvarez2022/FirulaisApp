const express = require('express');
const router = express.Router()
const {handler_getTemperaments} = require('../../handlers/index')

router.get("/",handler_getTemperaments)


module.exports = router
