const axios = require('axios');
const {Dogs} = require('../../db')
const apikey = 'live_4BgY3mqBuJriRz3s7vIp5vNLBJ0bqZBIXqeJn5L0SP3AUHepxHvP01TiahMvVUPN'
//los controllers son funciones que realizan la logixa de las peticiones


const get_temperaments = async () =>{
  try {
    const api = await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`)
    const db = await Dogs.findAll()
    const alldogs = await api.data.concat(db)
    return alldogs;
  
  } catch (error) {
    throw  Error(error.message)
  }
}


module.exports = get_temperaments;
