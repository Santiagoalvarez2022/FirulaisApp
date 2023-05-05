const {Dog, Temperament} = require('../../../db')

const post_dog = async (data) =>{
    //validation of required fields
    let {name,  alturaMax ,alturaMin, pesoMax ,pesoMin, vidaMax ,vidaMin,image,temperaments} = data;

    if(!name || !alturaMax || !alturaMin || !pesoMax || !pesoMin || !vidaMax || !vidaMin  || !temperaments) throw Error("Incomplete data to create the Breed")
    
    //record creation
    const newrace = await Dog.create({name,  alturaMax ,alturaMin, pesoMax ,pesoMin, vidaMax ,vidaMin,image })

    //array creation with each temperament
    let arr_temperaments = temperaments.split(" ");

    for (let index = 0; index < arr_temperaments.length; index++) {
        const element = arr_temperaments[index];
       try {
          const [row, created] = await Temperament.findOrCreate({
            where : {name : element}
          })

          newrace.addTemperament(row)
       } catch (error) {
       }

    }
  
    return {...newrace.dataValues, ...{temperaments}}
}

module.exports = post_dog;





















    // const find_dog = await Dog.findOne({
    //     where : {name : "santiagp"},
    //     include : Temperament
    // })
    // console.log(find_dog);


    // { front
    //     name: 'pepe',
    //     alturaMax: '',
    //     alturaMin: '',
    //     pesoMax: '',
    //     pesoMin: '',
    //     temperaments: ' Wild Bold',
    //     vidaMax: '4',
    //     vidaMin: '3'
    //   }
    /*
    necesito
    {
    "id": 1,
    "name": "Affenpinscher",
    "Altura": "23 - 29",
    "Peso": "3 - 6",
    "Años_de_vida": "10 - 12 years",
    "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
}
     */  /*
    modelo bd
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
    }, */