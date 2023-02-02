const {Dogs} = require('../../db');
//los controllers son funciones que realizan la logixa de las peticiones
const DATA_API = require('../get_all_data_api.js')


const get_all = async () =>{
 
    const  dogs_api = await DATA_API()
    const  dogs_db  = await Dogs.findAll()
    
    //sacar propiedades inecesarias a los datos de la api
  
    
    const all_dogs = dogs_api.concat(dogs_db)
    
    // return dogs_api.data
    return all_dogs

}


module.exports = get_all;

/*
id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Altura: {
      type: DataTypes.STRING,
      allowNull :false,
    },
    Peso: {
      type: DataTypes.STRING,
      allowNull :false,
    },
    Años_de_vida:{
      type: DataTypes.STRING,
    },
    image : {
      type : DataTypes.STRING,
      
    }

vienen estos datos como response{
      weight: [Object],
      height: [Object],
      id: 22,
      name: 'Australian Kelpie',
      country_code: 'AU',
      bred_for: 'Farm dog, Cattle herding',
      breed_group: 'Herding',
      life_span: '10 - 13 years',
      temperament: 'Friendly, Energetic, Alert, Loyal, Intelligent, Eager',
      reference_image_id: 'Hyq1ge9VQ',
      image: [Object]
    }, */