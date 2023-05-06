const {Temperament} = require('../../db')
//creo registro
const  axios  = require("axios");
const apikey = 'live_4BgY3mqBuJriRz3s7vIp5vNLBJ0bqZBIXqeJn5L0SP3AUHepxHvP01TiahMvVUPN'

//modularizo para dar claridad al controller

const func_arrayOftemperaments = (data) =>{
  //defino un nuevo array que almacena un array por cada perro guardado por elemento sus temperamentos
  const arrayOftemperaments = data.map(dog =>{
    const {temperament} = dog
    //si no tiene un temperamento registrado paso al siguiente
    if(!temperament) return;

    //genero un nuevo array donde cada elemento es un temperamento diferente
    let arr_temps = temperament.split(",")
    return arr_temps
  })

  return arrayOftemperaments

}

const func_all_temperaments = (arrayOftemperaments) =>{
  // //recorro el array de arrays y guardo todo los elementos de cadad uno en un array nuevo
  const final = []
  arrayOftemperaments.forEach(arrOfTemp=>{
    if(arrOfTemp){
      arrOfTemp.forEach(temp=>{
      final.push(temp.trim())
      })
    }
  })
  return final
}


//controller
const get_temperaments = async () =>{
  //peticion a la api
  const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
 
  const arrayOftemperaments =  func_arrayOftemperaments(data)

  const all_temperaments = func_all_temperaments(arrayOftemperaments)

  // //utilizo un filter para eliminar temperamentos repetidos
  const temps_sin_repetir = all_temperaments.filter((temp, index)=>{
    return all_temperaments.indexOf(temp) === index;
  })

   // creo los registros en la base de dato
   temps_sin_repetir.forEach(temp =>{
     Temperament.findOrCreate({
       where : {name :temp}
     })
   })

   
  //busco temperamentos de la base de datos
  const temps_db = await Temperament.findAll()
  console.log(temps_db);
  return temps_db
}



module.exports = get_temperaments;
