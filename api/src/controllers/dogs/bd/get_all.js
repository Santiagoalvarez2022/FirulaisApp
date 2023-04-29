const {Dog, Temperament} = require('../../../db');
//los controllers son funciones que realizan la logixa de las peticiones

const get_all = async () =>{

    //TRAE DATOS DEL MODELO 
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
         temperament :dog.temperaments.map((t)=> t.name).join(", "),
         type:"bd"
        }

    })
    
    return dogs_db;

}

 
module.exports = get_all;
