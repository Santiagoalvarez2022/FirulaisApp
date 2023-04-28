const express = require('express');
const router = express.Router()
const {handler_getDogs_api} = require('../../handlers/index')


// router.get("/api",handler_getDogs_api)

// router.get("/:id", handler_getDog_id)
router.get("/",handler_getDogs_api)


module.exports = router
