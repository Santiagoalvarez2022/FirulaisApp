import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from 'react-redux'
import { handler_indices, get_dogs, change_page } from "../../redux/actions";
import style from './Home.module.css'
import Loanding from "../loanding/Loading";

import FilterAndOrders from "../FilterAndOrder/FilterAndOrders";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong,faArrowRightFromBracket,faAnglesRight, faAnglesLeft, faArrowDownAZ, faArrowUpZA, faDog, faCircleArrowRight, faCircleArrowLeft,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import logo from "../../assests/log2.png"
import Create from "../create/Create";
import { Link } from "react-router-dom";


 
const Home = (props) => {
  const dispatch = useDispatch()
  const {dogs, copy_dogs} = useSelector((state) => state)
  // const  = useSelector((state) => state.dogs)

  const page = useSelector((state)=> state.page)
  const inicio = useSelector((state)=> state.inicio)
  const fin = useSelector((state)=> state.fin)

  useEffect(() => {

    if (Boolean(dogs.length)) {
      
    } else {
      dispatch(get_dogs())   
      
    }
  }, [])



  //si cambia el array de dog cuando seleciono un fitro se resetea el indice 
  useEffect(()=>{
    setOne(1)
    setTwo(2)
    setTrhee(3) 
  },[dogs])
  //paginado 
  const [finDogs, setFinDogs] = useState(4) // VALOR INCIAL DE CANTIDAD DE PERROSS

  //total pages es el numero de la cantidad de paginas que deberia haber, en este caso con 172 perros es 22
  const totalPages = Math.ceil(dogs.length/finDogs)
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

  if(!Object.keys(dogs).length){ 
    return(
      <Loanding />
    )
  } else {
    return (
      <div className={style.all}>
        <div className={style.conteiner_page}>
          <div className={style.homepage}>

            <div className={style.logo}>
              <img src={logo} alt="" />
            </div>

            <div id="dogs" className={style.nav}>
              <FilterAndOrders />
            </div>

            <div className={style.content}>
            {dogs[0].msg
              ? <div className={style.error}>
                  <h3>{dogs[0].msg}</h3>
                  <button onClick={()=>dispatch(get_dogs(copy_dogs))} >Ver todas las razas</button>
                </div> 
            
              : <div className={style.conteiner}>
                  <div className={style.carrucel}> 
                    <div className={style.paginado_button} onClick={handler_page} id="back" > {"<"}</div>
                    <div className={style.cardcontainer}>
                    { dogs.length > 0 
                        ? dogs.slice(inicio,fin).map((dog) => {
                          const { name, id,  image, temperament, max ,min,type } = dog
                          return <Card
                                className={style.Card}
                                indice={dogs.indexOf(dog)}
                                name={name}
                                key={id}
                                id={id}
                                image={image}
                                temperament={temperament}
                                max = {max} 
                                min= {min}
                                type = {type}                                   
                                />})                                
                          : null  }
                    </div>
                    <div className={style.paginado_button}  onClick={handler_page} id="next"  >
                        {">"}
                    </div>
                  </div>
                  

                  <div className={style.paginado}>
                    <div className={style.indice}>
                      <button className={style.button_directions_b} disabled={one === 1 ? true : false}  onClick={()=> back()}><FontAwesomeIcon icon={faAnglesLeft} /> </button>
                        <button className={style.button_indice}   disabled={one > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{one}</button>
                        <button className={style.button_indice}   disabled={two > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{two}</button>
                        <button className={style.button_indice} disabled={trhee > totalPages ? true : false} onClick={(e)=>handler_indice(e.target.innerHTML)} >{trhee}</button>
                      <button className={style.button_directions_n} disabled={one=== totalPages || two === totalPages || trhee === totalPages ? true : false }  onClick={()=> next()}><FontAwesomeIcon icon={faAnglesRight} /> </button>
                    </div>
                  </div>

                </div>
              }
            </div>

            </div>

            <div id="create"   className={style.createpage}>
              <Create  />
            </div>
             
             <div className={style.CreatedRacesLink}>
              <Link to="/createdraces">
                <h2> Ver razas creadas por la Comunidad <FontAwesomeIcon className={style.icon} style={{color:"white"}} beat icon={faDog}/> </h2>       
              </Link>
             </div>

            </div>
        </div>      
    )
  }
}
//se encarga de proposionarle el store de redux a las props de este componente props ahora es un obj con la propiedad dogs = valor global del store

export default Home;
