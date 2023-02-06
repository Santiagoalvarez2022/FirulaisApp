const {Dog} = require('../../db')
const DATA_API = require('../get_all_data_api.js')

//los controllers son funciones que realizan la logixa de las peticiones


const get_allForName = async (name) =>{
    name = name.toLowerCase()
    const api = await DATA_API()
    const db = await Dog.findAll()
    const alldogs = await api.concat(db)


    //array con coincidencias
    const coincidencias = [];

    
    alldogs.forEach(obj => {
        //declaro variable que guarda el nombre de la raza y lo paso todo a mayusculas
        let name_of_race = obj.name;
        name_of_race = name_of_race.toLowerCase()
        //valido si alguno de ellos incluye el string pasado por paramatro
        if(name_of_race.includes(name)){
            coincidencias.push(obj)
        }
    });
    if(coincidencias.length === 0) throw Error("No se encontraron coincidencias")
    else{
        return coincidencias;
    }
    
    
    
}


module.exports = get_allForName;