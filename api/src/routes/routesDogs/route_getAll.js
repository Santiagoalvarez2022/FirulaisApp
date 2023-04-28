const express = require('express');
const router = express.Router()
const {handler_getDogs, handler_getDog_id} = require('../../handlers/index')

router.get("/:id", handler_getDog_id)
router.get("/",handler_getDogs)


module.exports = router
