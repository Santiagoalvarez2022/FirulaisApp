const  axios  = require("axios");
require("dotenv").config
const{API_KEY} =process.env 

//MODULARIZO EN UNA FUNCION LA PETICION A LA API y FILTRADO DE LAS PROPIEDADES NECESARIAS, PARA NO REPETIR CODIGO EN LOS CONTROLLERS

const get_data_api = async () => {
    const result = await  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    
    //retorno un nuevo array con los datos filtrados y ordenados de manera similar a la base de datos
    return dogs = result.data.map(obj =>{
        let {id,name,height,weight,life_span,image,temperament} = obj
        let min = undefined
        let max = undefined
        if(weight.metric){
          let promedio = weight.metric.split("-")
  
          if(promedio[1]){ 
            max = parseInt(promedio[1].trim() );
            
          } 
  
          if(promedio[0]){
            min = parseInt(promedio[0].trim());
  
          }
        }
        return {
            id,name,
            Altura : height.metric,
            min,
            max,
            Años_de_vida: life_span,
            image :image.url,
            temperament,
            type:"api"
        }
    }) 


    
}



    
module.exports = get_data_api;
/*       */