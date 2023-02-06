const {Dog, Temperament} = require('../../db')

const post_dog = async (name,Altura,Peso,Años_de_vida,temperaments) =>{
    
    const newrace = await Dog.create({name,Altura,Peso,Años_de_vida})
    
    
    //creo array con cada temperamento
    let arr_temperaments = temperaments.split(" ");

    for (let index = 0; index < arr_temperaments.length; index++) {
        const element = arr_temperaments[index];

        let newTemp = await Temperament.create({name : element})

        newrace.addTemperament(newTemp)
    }
    return {...newrace.dataValues, ...{temperaments}}
}

module.exports = post_dog;


    // const find_dog = await Dog.findOne({ 
    //     where : {name : "santiagp"},
    //     include : Temperament
    // })
    // console.log(find_dog);