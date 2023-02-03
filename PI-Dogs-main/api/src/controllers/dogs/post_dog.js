const {Dogs} = require('../../db')

const post_dog = async (name,Altura,Peso,Años_de_vida) =>{
    const newrace = await Dogs.create({name,Altura,Peso,Años_de_vida})
    return newrace
}

module.exports = post_dog;