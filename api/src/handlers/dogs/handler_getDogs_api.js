const {get_data_api} = require("../../controllers/index")

const handler_getDogs_api = async (req, res) =>{
    try {
        const result = await get_data_api()
        //envio los datos 
        return res.status(200).json(result)
            
    } catch (error) {
        res.status(400).json({error :error.message})
    }
}

module.exports = handler_getDogs_api