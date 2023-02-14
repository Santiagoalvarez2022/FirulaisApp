const {post_dog} = require("../../controllers/index")


/*{ //evio del front
      name : "",
      Altura : "",
      pesoMax : "",
      pesoMin : "",
      temperaments : "",
      años_de_vida : ""
    } */      

const handler_postDog = async (req, res) =>{
    console.log(req.body);
    let {name, Altura, pesoMax,pesoMin, Años_de_vida,temperaments} = req.body;
    try {
        //validaciones : solo validos los campos obligatorio
        if(!name || !Altura || !pesoMax || !pesoMin) throw Error("Faltan datos")
        else{
            //creo nueva raza con 
            const newRace = await post_dog(name ,Altura, pesoMax ,pesoMin ,Años_de_vida ,temperaments);
            res.status(200).json(newRace)
        }
    } catch (error) {
        console.log("hubo un error");
        
        res.status(400).json({error: error.message})
    }
    
}

module.exports = handler_postDog;