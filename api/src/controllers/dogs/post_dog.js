const {Dog, Temperament} = require('../../db')

const post_dog = async (name, color, alturaMax ,alturaMin, pesoMax ,pesoMin, vidaMax ,vidaMin,image,temperaments) =>{

    let Altura = `${alturaMin} - ${alturaMax}`
    let Peso = `${pesoMin} - ${pesoMax}`
    let temperament = temperaments.trim()
    let Años_de_vida = `${vidaMin} - ${vidaMax} years`

    //validaciones : solo validos los campos obligatorio
    if(!name ) throw Error("Faltan datos")
    //creo registro de Dog
    const newrace = await Dog.create({name,Altura,Peso,Años_de_vida, color})

    //creo array con cada temperamento
    let arr_temperaments = temperament.split(" ");

    for (let index = 0; index < arr_temperaments.length; index++) {
        const element = arr_temperaments[index];
        //creo  registros de Temperament
       try {
          // let newTemp = await Temperament.create({name : element})
          //row obj devuelto created boolean que determina si lo creo o ya existia 
          const [row, created] = await Temperament.findOrCreate({
            where : {name : element}
          })
          console.log("este es el elemento ", element );
          console.log("este es el row ", row );
          console.log("este es el created ", created );

          newrace.addTemperament(row)
       } catch (error) {
          console.log(error.message);
       }

    }
    console.log(newrace);
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