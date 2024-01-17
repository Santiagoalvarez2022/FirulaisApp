const { default: axios } = require("axios");

const organizedApiList= async (data)=>{
    //etorno u  nuevo array con los datos filtrados y ordenados de manera similar a la base de datos
    let res = data.map( obj =>{
        let {id, name,height,weight,life_span,reference_image_id, temperament} = obj
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
            reference_image_id,
            type:"api"
        }
    }) 

    return res 

    
}



module.exports = organizedApiList;

