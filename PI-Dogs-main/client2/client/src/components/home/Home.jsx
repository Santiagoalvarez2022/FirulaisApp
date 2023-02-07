import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from 'axios'
import Card from "../card/Card";
import {connect} from 'react-redux'
//importo las actions que voy a despachar
import { get_dogs } from "../../redux/actions";

const Home = (props) =>{
    console.log(props)
    //hago el pedido a la api al montarse el component
    const [dogs,setdogs] = useState([])

    useEffect(()=>{
      async function getdata(){
        const data = await props.get_dogs()
      } 
      let result = getdata()
      setdogs(result)
      console.log(dogs)
    }
    ,[])



    return(
      <div>
          <h1>soy el componete Home</h1>
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