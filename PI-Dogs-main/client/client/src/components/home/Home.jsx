import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from 'react-redux'
import { handler_indices, get_dogs, change_page } from "../../redux/actions";
import style from './Home.module.css'
import Loanding from "../loanding/Loading";
import CardData from "./Card_data";





const Home = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.dogs)
  const page = useSelector((state)=> state.page)
  const inicio = useSelector((state)=> state.inicio)
  const fin = useSelector((state)=> state.fin)

  useEffect(() => {
    dispatch(get_dogs())
  }, [])

  //si cambia el array de dog cuando seleciono un fitro se resetea el indice 
  useEffect(()=>{
    setOne(1)
    setTwo(2)
    setTrhee(3)
  },[selector])




  //paginado 

  const [finDogs, setFinDogs] = useState(8) // VALOR INCIAL DE CANTIDAD DE PERROSS

  //total pages es el numero de la cantidad de paginas que deberia haber, en este caso con 172 perros es 22
  const totalPages = Math.ceil(selector.length/finDogs)
  //variable de los indices

  

  let [ one , setOne ]= useState(1)


  let [ two, setTwo  ]= useState(2)


  let [ trhee, setTrhee] = useState(3)


  function next(){
    setOne(one+3)
    setTwo(two+3)
    setTrhee(trhee+3)
  }




  function back(){
    setOne(one-3)
    setTwo(two-3)
    setTrhee(trhee-3)
  }



  function handler_indice(value){
    //despacho action que cambia la pagina
    dispatch(handler_indices(value))
  
  }

  function handler_page(e){

    let {id} = e.target
    if(id === "next"){
      //si estoy en la ultima hoja no avanzar
     if( page === totalPages) return
      let num = page +1
      // handler_indice(num)
      dispatch(  handler_indices(num))

      
    }else if(id === "back"){
      if(page === 1) return
      let num = page - 1 
      // handler_indice(num)
      dispatch(  handler_indices(num))

    }

  }



  if(!Object.keys(selector).length){
    return(
      <Loanding />
    )
  } else {
    return (
      <div className={style.all}>
        <div className={style.paginado}>
          <button onClick={handler_page} id="back">-</button>
          <button onClick={handler_page} id="next">+</button>
        </div>
       
        <div className={style.conteiner_page}>
          <h2>pagina N {page}</h2>
            {selector[0].error 
              ? <div className={style.error}>
                  <h3>{selector[0].error}</h3>
                  <form action=""><button>Ver todos</button></form>
                </div> 
            
              : <div className={style.conteiner}>
                  { selector.length > 0 
                      ? selector.slice(inicio,fin).map((dog) => {
                        const { name, id,  image, temperament, max ,min } = dog
                        return <Card
                            indice={selector.indexOf(dog)}
                            name={name}
                            key={id}
                            id={id}
                            image={image}
                            temperament={temperament}
                            max = {max} 
                            min= {min}
                            
                          />
                        }) 

                      : null  }
          </div>}
        </div>      
        <div className={style.indice}>
          <button className={style.button_directions} disabled={one === 1 ? true : false}  onClick={()=> back()}>atras</button>
            <button className={style.button_indice}   disabled={one > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{one}</button>
            <button className={style.button_indice}   disabled={two > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{two}</button>
            <button className={style.button_indice} disabled={trhee > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{trhee}</button>
          <button className={style.button_directions} disabled={one=== totalPages || two === totalPages || trhee === totalPages ? true : false }  onClick={()=> next()}>adelante</button>
        </div>
      </div>
    )
  }
}
//se encarga de proposionarle el store de redux a las props de este componente props ahora es un obj con la propiedad dogs = valor global del store

export default Home;
