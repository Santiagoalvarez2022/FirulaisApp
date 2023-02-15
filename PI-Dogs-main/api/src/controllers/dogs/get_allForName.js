const {Dog} = require('../../db')
const DATA_API = require('../get_all_data_api.js')

//los controllers son funciones que realizan la logixa de las peticiones


const get_allForName = async (name) =>{
    console.log(name);
    name = name.toLowerCase()
    const  dogs_api = await DATA_API()
    const a  = dogs_api.map(dog =>{
      const {id, name, Altura, Peso, Años_de_vida,image,temperament} = dog;
      let min = undefined
      let max = undefined
      if(Peso){
        let promedio = Peso.split("-")

        if(promedio[1]){ 
          max = parseInt(promedio[1].trim() );
          
        } 

        if(promedio[0]){
          min = parseInt(promedio[0].trim());

        }
      }
      return{
        id,
        name,
        Altura,
        min,
        max,
        Años_de_vida,
        image,
        temperament
      }
    }
    )
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

    const alldogs = await a.concat(dogs_db)


    //array con coincidencias
    const coincidencias = [];

    
    alldogs.forEach(obj => {
        //declaro variable que guarda el nombre de la raza y lo paso todo a mayusculas
        let name_of_race = obj.name;
        name_of_race = name_of_race.toLowerCase()
        //valido si alguno de ellos incluye el string pasado por paramatro
        if(name_of_race.includes(name)){
            coincidencias.push(obj)
        }
    });
    if(coincidencias.length === 0) throw Error("No se encontraron coincidencias")
    else{
        return coincidencias;
    }
    
    
    
}


module.exports = get_allForName;