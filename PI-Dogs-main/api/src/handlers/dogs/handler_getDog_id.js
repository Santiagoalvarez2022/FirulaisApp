const {get_by_Id}= require("../../controllers/index")

const handler_getDog_id = async (req,res) =>{
    const {id} = req.params; 
    try {
            const dog = await get_by_Id(id)
            return res.status(200).send(dog)
    } catch (error) {
            return res.status(400).send(error.message)
    }

}

module.exports = handler_getDog_id;
