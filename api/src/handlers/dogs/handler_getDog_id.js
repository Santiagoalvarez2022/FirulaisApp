const {get_by_Id}= require("../../controllers/index")

const handler_getDog_id = async (req,res) =>{
    const {id} = req.params; 
    //si isNaN da true, significa que debo buscar el dog en la base de dato, si es false significa que debo buscarlo en la api
    const sourse = isNaN(id) ? "bdd":"api"
    try {
            const dog = await get_by_Id(id, sourse)
            return res.status(200).json(dog)
    } catch (error) {
            return res.status(400).send({error : error.message})
    }

}

module.exports = handler_getDog_id;
