const  axios  = require("axios");
const apikey = 'live_4BgY3mqBuJriRz3s7vIp5vNLBJ0bqZBIXqeJn5L0SP3AUHepxHvP01TiahMvVUPN'

//MODULARIZO EN UNA FUNCION LA PETICION A LA API y FILTRADO DE LAS PROPIEDADES NECESARIAS, PARA NO REPETIR CODIGO EN LOS CONTROLLERS

const DATA_API = async () => {
    const result = await  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
    
    //retorno un nuevo array con los datos filtrados y ordenados de manera similar a la base de datos
    return dogs = result.data.map(obj =>{
        let {id,name,height,weight,life_span,image,temperament} = obj
        return {
            id,name,
            Altura : height.metric,
            Peso : weight.metric,
            Años_de_vida: life_span,
            image :image.url,
            temperament
        }
    }) 
}
    
module.exports = DATA_API;
