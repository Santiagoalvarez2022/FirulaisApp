const express = require('express');
const router = express.Router()

const controllers = require("../../controllers/index")


router.get("/", async (req, res)=>{
    res.send("temperaments")
})


module.exports = router
