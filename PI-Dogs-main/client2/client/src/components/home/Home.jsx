import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import Card from "../card/Card";
import {connect} from 'react-redux'

import style from './Home.module.css'
//importo las actions que voy a despachar
import { get_dogs } from "../../redux/actions";


const Home = (props) =>{
   console.log("props del hpme ", props)
  //hago el pedido a la api al montarse el component
    useEffect(()=>{
      //get_dog es una funcion que despaña el action creator, que asu vex este depacha otra
      props.get_dogs()
    }
    ,[])


    return(
      <div className={style.all}>
          <div className={style.conteiner}>
          {props.dogs ? props.dogs.map((dog)=>{
            const {name,id,Peso,image,temperament} = dog
            return <Card 
              name = {name}
              key = {id}
              id = {id}
              Peso = {Peso}
              image = {image}
              temperament = {temperament}
            />
          }) :null }
          </div>
      </div>
    )
}
//se encarga de proposionarle el store de redux a las props de este componente props ahora es un obj con la propiedad dogs = valor global del store
const mapStateToProps = (state) =>{
  return{
    dogs : state.dogs
  }
}

//se encarga de proporcionar las funciones que usan el "dispatch" de las actions 
const mapDispatchToProps = (dispatch) =>{
  return {
    get_dogs :()=> dispatch(get_dogs())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home) ;