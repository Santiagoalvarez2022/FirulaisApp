const {get_temperaments} = require("../../controllers/index")


const handler_getTemperaments = async(req,res) =>{
    const result = await get_temperaments()
    res.json(result)
}
module.exports = handler_getTemperaments;