const express = require('express');
const router = express.Router()
const {handler_getDogs, handler_getDog_id} = require('../../handlers/index')


router.get("/",handler_getDogs)

router.get("/:id", handler_getDog_id)


module.exports = router
