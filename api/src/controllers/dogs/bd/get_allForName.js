const {Dog,Temperament} = require('../../../db')

//los controllers son funciones que realizan la logixa de las peticiones


const get_allForName = async (name) =>{
    name = name.toLowerCase()
   
    let  dogs_db  = await Dog.findAll({
        include : {
            model :Temperament,
            attributes : ['name'],
            trougth :{
                attributes : ["dog_temperament"]
            }
        }
    })
    dogs_db = dogs_db.map(dog =>{
        const {id, name, Altura, Peso, Años_de_vida,image} = dog;
 
        let altura = Altura.split("-")
        let min_altura = parseInt(altura[0].trim());
        let max_altura = parseInt(altura[1].trim());
 
 
        let promedio = Peso.split("-")
        let min = parseInt(promedio[0].trim());
        let max = parseInt(promedio[1].trim());
        return{
          id,
          name,
          min_altura,
          max_altura,
          max,
          min,
          Años_de_vida,
          image,
          temperament :dog.temperaments.map((t)=> t.name).join(", ")
         }
 
    })

   


    // //array con coincidencias
    const coincidencias = [];

    dogs_db.forEach(obj => {
        //declaro variable que guarda el nombre de la raza y lo paso todo a mayusculas
        let name_of_race = obj.name;
        name_of_race = name_of_race.toLowerCase()
        //valido si alguno de ellos incluye el string pasado por paramatro
        if(name_of_race.includes(name)){
            coincidencias.push(obj)
        }
    });
    if(coincidencias.length === 0) {
        return [{error:"No se encontro ninguna raza que contenga el nombre pedido."}];
    }
    else{
        return coincidencias;
    }

}


module.exports = get_allForName;