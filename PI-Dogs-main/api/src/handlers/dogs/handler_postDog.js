const {post_dog} = require("../../controllers/index")


/*{ //evio del front
      name : "",
      Altura : "",
      pesoMax : "",
      pesoMin : "",
      temperaments : "",
        vidaMax: '4',
        vidaMin: '3
    } */      

const handler_postDog = async (req, res) =>{
    let {name, alturaMax ,alturaMin, pesoMax ,pesoMin, vidaMax ,vidaMin,image,temperaments} = req.body;
    try {
        //creo nueva raza con 
        const newRace = await post_dog(name, alturaMax ,alturaMin, pesoMax ,pesoMin, vidaMax ,vidaMin,image,temperaments);
        res.status(200).json(newRace)
        
    } catch (error) {
        console.log("hubo un error"); 
        res.status(400).json({error: error.message})
    }

  
     
}

module.exports = handler_postDog;