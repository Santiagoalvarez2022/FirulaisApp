const {Dog, Temperament} = require('../../db');
//los controllers son funciones que realizan la logixa de las peticiones
const DATA_API = require('../get_all_data_api.js');


const get_all = async () =>{
 
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
      let promedio = Peso.split("-")
      let min = parseInt(promedio[0].trim());
      let max = parseInt(promedio[1].trim());
      return{
        id,
        name,
        Altura,
        max,
        min,
        Años_de_vida,
        image,
        temperament :dog.temperaments.map((t)=> t.name).join(", ")
      }

    })
    
    const all_dogs = a.concat(dogs_db)

    return all_dogs

}

get_all()

module.exports = get_all;

/*const array = [ 
      {id:1, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:2, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:3, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:4, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:5, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:6, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:7, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:8, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:1, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:2, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:3, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:4, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:5, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:6, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:7, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
      {id:8, name:"santaigo",Peso :12, Años_de_vida : 1, image : "./dog.png",temperament:"calmado"},
  ] */