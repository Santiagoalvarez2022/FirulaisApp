const  axios  = require("axios");
require("dotenv").config
const{API_KEY} =process.env 

//MODULARIZO EN UNA FUNCION LA PETICION A LA API y FILTRADO DE LAS PROPIEDADES NECESARIAS, PARA NO REPETIR CODIGO EN LOS CONTROLLERS

const get_data_api = async () => {
  const {data} = await  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  // let data = [{
  //       weight: {
  //           imperial : "1 - 2 ",
  //           metric: "1 - 2"
  //       },
  //       height: {
  //           imperial: "9 - 11.5",
  //           metric: "23 - 29"
  //       },
  //         id: 1,
  //         name: "A",
  //         bred_for: "Small rodent hunting, lapdog",
  //         breed_group: "Toy",
  //         life_span: "10 - 12 years",
  //         temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  //         origin: "Germany, France",
  //         reference_image_id: "BJa4kxc4X",
  //       image: {
  //           id: "BJa4kxc4X",
  //           width: 1600,
  //           height: 1199,
  //           url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  //         }
  //      },
  //      {
  //       weight: {
  //           imperial : "116 - 13",
  //           metric: "3 - 4"
  //       },
  //       height: {
  //           imperial: "119 - 11.5",
  //           metric: "23 - 29"
  //       },
  //         id: 11,
  //         name: "b",
  //         bred_for: "Small rodent hunting, lapdog",
  //         breed_group: "Toy",
  //         life_span: "110 - 12 years",
  //         temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  //         origin: "Germany, France",
  //         reference_image_id: "BJa4kxc4X",
  //       image: {
  //           id: "BJa4kxc4X",
  //           width: 1600,
  //           height: 1199,
  //           url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  //         }
  //      },{
  //       weight: {
  //           imperial : "11116 - 13",
  //           metric: "5- 6"
  //       },
  //       height: {
  //           imperial: "1119 - 11.5",
  //           metric: "2311 - 29"
  //       },
  //         id: 111,
  //         name: "c",
  //         bred_for: "Small rodent hunting, lapdog",
  //         breed_group: "Toy",
  //         life_span: "101 - 12 years",
  //         temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  //         origin: "Germany, France",
  //         reference_image_id: "BJa4kxc4X",
  //       image: {
  //           id: "BJa4kxc4X",
  //           width: 1600,
  //           height: 1199,
  //           url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  //         }
  //      },{
  //       weight: {
  //           imperial : "6 - 13",
  //           metric: "7 - 8"
  //       },
  //       height: {
  //           imperial: "119 - 11.5",
  //           metric: "23 - 29"
  //       },
  //         id: 1111,
  //         name: "d",
  //         bred_for: "Small rodent hunting, lapdog",
  //         breed_group: "Toy",
  //         life_span: "1011 - 12 years",
  //         temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  //         origin: "Germany, France",
  //         reference_image_id: "BJa4kxc4X",
  //       image: {
  //           id: "BJa4kxc4X",
  //           width: 1600,
  //           height: 1199,
  //           url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  //         }
  //      },]        
    //etorno u  nuevo array con los datos filtrados y ordenados de manera similar a la base de datos
    return data__ = data.map(obj =>{
        let {id, name,height,weight,life_span,image,temperament} = obj
        let pesoMax =undefined;
        let pesoMin = undefined;
        let alturaMax = undefined; 
        let alturaMin = undefined;
        let vidaMax = undefined;
        let vidaMin = undefined;


        if(weight.metric){
          let promedioWeight = weight.metric.split("-")
  
          if(promedioWeight[1]){ 
            pesoMax = promedioWeight[1].trim() ;
            
          } 
  
          if(promedioWeight[0]){
            pesoMin = promedioWeight[0].trim();
          }
        }

        if(height.metric){
          let promedioHeight = height.metric.split("-")
  
          if(promedioHeight[1]){ 
            alturaMax = promedioHeight[1].trim();           
          } 
  
          if(promedioHeight[0]){
            alturaMin = promedioHeight[0].trim();
          }
        }
        
        if(life_span){
          let promedioLifeSpan = life_span.split("-")
  
          if(promedioLifeSpan[1]){ 
            vidaMax = promedioLifeSpan[1].trim();           
          } 
  
          if(promedioLifeSpan[0]){
            vidaMin = promedioLifeSpan[0].trim();
          }
        }

        
        return {
            id,
            name,
            alturaMax,
            alturaMin,
            pesoMax,
            pesoMin,
            vidaMax,
            vidaMin,
            temperaments : temperament,
            image:image.url,
            type:"api"
        }
    }) 

}



    
module.exports = get_data_api;
/*       */