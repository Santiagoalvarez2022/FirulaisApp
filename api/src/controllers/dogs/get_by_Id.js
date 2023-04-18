const { Dog, Temperament} = require('../../db')
const DATA_API = require('../get_all_data_api.js')

//los controllers son funciones que realizan la logixa de las peticiones


const get_by_Id = async (id, sourse) => {
  if(sourse === "bdd"){
    let dog = await Dog.findOne({
      where : {id : id },
      include : {
        model :Temperament,
        attributes : ['name'],
        trougth :{
          attributes : ["dog_temperament"]
        }
      }
    }) 
    if(!dog) throw Error("No se encontro esta raza en la base de datos")
    return dog
  } else if(sourse === "api") {
    let dogs = await DATA_API()
    let dog = dogs.find(obj => obj.id === parseInt(id))
    return dog;
  }

}


module.exports = get_by_Id;

/*include : {
         model :Temperament,
         attributes : ['name'],
         trougth :{
           attributes : ["dog_temperament"]
         }
       }*/