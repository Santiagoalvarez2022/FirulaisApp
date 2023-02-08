import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { sumar, dataApi, get_dogs } from "../../redux/actions";


const Pages =  () =>{
    
    //susbcripcion al store
    let total = useSelector((state)=> state.dogs)
    
    //defino estados
    const [cantidadDogs, setCantidad] = useState()
    const [indice, setIndice] = useState([])

    function defino_cantidad(){
      setCantidad(total.length)
    }

    useEffect(()=>{
      defino_cantidad()
      console.log()
    },[])
  

    const IndiceHandler = (num) =>{
      let cantd_indices = []
      while(num > 0){
        cantd_indices.unshift(num)
        num--
      }
      setIndice(cantd_indices)
    }
    //creo estado del indice que se renderizara en la pag para mover las paginas

    //cantidad de paginas necesarias
  
    return(
     <>
     {cantidadDogs}
 
     </>
    )
    
}

export default Pages;



   //necesito pasar al slice los indices de comienzo y fin de un array que quiero renderizar  
   /*  numro        indices       perros
         1           0,7      =>   1 2 3 4 5 6 7 8
         2           8,15  
   */