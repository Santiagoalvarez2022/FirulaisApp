const express = require('express');
const router = express.Router();
const controllers = require("../../controllers/index")

router.post( "/" , async (req, res) =>{
    //obtengo los datos del body
    let {Nombre, Altura, Peso, Años_de_vida} = req.body;
    try {
        //validaciones : solo validos los campos obligatorio
        if(!Nombre || !Altura || !Peso) throw Error("Faltan datos")
        else{
            //creo nueva raza con
            let name = Nombre
            const newRace = await controllers.post_dog(name,Altura,Peso,Años_de_vida);
            console.log(newRace);
            res.status(200).json(newRace)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }


})


module.exports = router

// ID *
// Nombre *
// Altura *
// Peso *
// Años de vida