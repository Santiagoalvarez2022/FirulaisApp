const axios = require('axios')
console.log("hola");

const  filter_temperament = async (temperament)  =>{
   let result = await axios.get(`http://localhost:3001/dogs`)

   let filter = result.data.filter((dog) => {
    //el problema es que no todos los dogs tiene esta propiedad
    console.log(dog.temperament.includes(temperament));


   })
    console.log(filter);
}
filter_temperament('Stubborn')

