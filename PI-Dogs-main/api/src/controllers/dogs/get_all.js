const {Dog, Temperament} = require('../../db');
//los controllers son funciones que realizan la logixa de las peticiones
const DATA_API = require('../get_all_data_api.js');


const get_all = async () =>{
 
    const  dogs_api = await DATA_API()
    const  dogs_db  = await Dog.findAll({
      include : {
        model :Temperament,
        attributes : ['name'],
        trougth :{
          attributes : []
        }
      }
    })
    
    //sacar propiedades inecesarias a los datos de la api
  
    
    const all_dogs = dogs_api.concat(dogs_db)
    
    // return dogs_api.data
    return all_dogs

}


module.exports = get_all;

