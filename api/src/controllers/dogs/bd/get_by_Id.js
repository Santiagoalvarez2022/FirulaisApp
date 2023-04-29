const { Dog, Temperament} = require('../../../db')


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