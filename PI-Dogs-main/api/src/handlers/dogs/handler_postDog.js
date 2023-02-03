const {post_dog} = require("../../controllers/index")


const handler_postDog = async (req, res) =>{
    let {Nombre, Altura, Peso, Años_de_vida} = req.body;
    try {
        //validaciones : solo validos los campos obligatorio
        if(!Nombre || !Altura || !Peso) throw Error("Faltan datos")
        else{
            //creo nueva raza con
            let name = Nombre
            const newRace = await post_dog(name,Altura,Peso,Años_de_vida);
            res.status(200).json(newRace)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = handler_postDog;