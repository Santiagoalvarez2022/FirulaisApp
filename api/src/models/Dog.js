const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    alturaMax: {
      type: DataTypes.STRING,
      allowNull :false,
    },
    alturaMin: {
      type: DataTypes.STRING,
      allowNull :false,
    },

    pesoMax: {
      type: DataTypes.STRING,
      allowNull :false,
    },
    pesoMin: {
      type: DataTypes.STRING,
      allowNull :false,
    },
 
    vidaMax: {
      type: DataTypes.STRING,
      allowNull :false,
    },
    vidaMin: {
      type: DataTypes.STRING,
      allowNull :false,
    },

    image : {
      type : DataTypes.STRING,
    },
  },
  {timestamps: false}//elimina las propiedades de fecha de creacion y de modificacion
  );
};

