const {Dogs} = require('../../db')
//hace con que el id de la nueva raza sea una digito mas que el ultimo de la api, para hacer una llamada, y un push desestructurando el id y colocarlo como valor inical del id

const post_dog = async (name,Altura,Peso,Años_de_vida) =>{
    const newrace = await Dogs.create({name,Altura,Peso,Años_de_vida})
    return newrace
}

// sequelize.define('dogs', {
//     ID: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true 
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     Altura: {
//       type: DataTypes.STRING,
//       allowNull :false,
//     },
//     Peso: {
//       type: DataTypes.STRING,
//       allowNull :false,
//     },
//     Años_de_vida:{
//       type: DataTypes.STRING,
//       allowNull :false,
//     }
//   });
module.exports = post_dog;