const {get_temperaments} = require("../../controllers/index")


const handler_getTemperaments = async(req,res) =>{
    try {
        const result = await get_temperaments()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}
module.exports = handler_getTemperaments;