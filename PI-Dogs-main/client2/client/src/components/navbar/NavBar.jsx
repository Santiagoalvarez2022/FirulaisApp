import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import style from './NavBar.module.css'
import { get_by_name , get_temperaments, filter_temperament, order_races , order_alfabet, order_peso} from "../../redux/actions";
const Navbar = () =>{
  //selectorTemps esta subscirptos al store
  const selectorTemps = useSelector((state)=>state.temperaments)
  const [stateForm, setForm] = useState("")
  const dispatch = useDispatch()
  //elimino er refresh defaull de la accion submit
  const handlerSubmit = (event) =>{
    event.preventDefault()
    dispatch(get_by_name(stateForm))
  
  }
  
  const changeHandler = (event) =>{
    setForm(event.target.value)
    dispatch(get_by_name(stateForm))
  }

  useEffect(()=>{
    dispatch(get_temperaments())

  },[])
  
  const selectTemperament = (event) => {
    let tempermant = event.target.value
    dispatch(filter_temperament(tempermant))
  }

  //orders 
  
  const handlerRaceOrder =(event) =>{
   dispatch(order_races(event.target.id))
  }
  const handlerAlfabetOrder =(event) =>{
    console.log(event.target.id)
    dispatch(order_alfabet(event.target.id))
  }
  const handlerPesoOrder =(event) =>{
    dispatch(order_peso(event.target.id))
  }




    return(
      <div className={style.all}>
        <div className={style.logout} >
          <Link className={style.link}  to= '/' >Salir </Link> 
        </div>
        <div className={style.menu} >
          <ul className={style.menu_ul}> 
            <li className={style.menu_li}>Menu 
                <ul className={style.depliegemenu} >
                    <li><Link className={style.link} to='/create' >CREATE</Link></li>
                    <li> <Link className={style.link} to='/about' >about</Link></li>
                </ul>
            </li>

            <li className={style.filtros_li}>Filtros
                <ul>
                  <li>Peso<ul>
                    <li id="AD" onClick={(event)=>handlerPesoOrder(event)} >A-D</li>
                    <li id="DA" onClick={(event)=>handlerPesoOrder(event)} >D-A</li>
                    </ul></li>    
                  <li>Raza <ul>
                    <li id="ALL" onClick={(event)=>handlerRaceOrder(event)} >TODOS</li>
                    <li id="API" onClick={(event)=>handlerRaceOrder(event)} >API</li>
                    <li id="BDD" onClick={(event)=>handlerRaceOrder(event)} >MIS PERROS</li>
                    </ul> </li>
                  <li>Aldabeticamente <ul>
                    <li id="AZ" onClick={(event)=>handlerAlfabetOrder(event)} >A-Z</li>
                    <li id="ZA" onClick={(event)=>handlerAlfabetOrder(event)} >Z-A</li>
                    <li id="ALL" onClick={(event)=>handlerAlfabetOrder(event)}>Normal</li>
                    </ul> </li>
                </ul> 
            </li>
          </ul>
        </div>
        <div className={style.temperaments}  >
          <form >
            <select name="temperamentos" id="temp" >
                  <option  >Elije por temperamentos</option>
                              {selectorTemps.length ? selectorTemps.map((temp)=>{
                              return <option
                              onClick={(event)=>selectTemperament(event)}
                              key={temp.id}
                              name = {temp}
                              >                    
                              {temp.name}
                              </option>
                           })  :null}
            </select>
          </form>        
        </div>

        <form  onSubmit={(e)=>{handlerSubmit(e)}}  className={style.form}>
          <input onChange={(e)=>changeHandler(e)} name="search" type="text" value={stateForm}/>
          <button>BUSCAR</button>
        </form>
        
        
      </div>
    )
}

export default Navbar;

/*
        <div className={style.filtros}>
          <div onClick={()=>{}} >
            <p >TEMPERAMENTOS</p>
           
          
          </div>
          <div onClick={()=>{}} ><p>RAZA</p></div>
          <div onClick={()=>{}} ><p>PESO</p></div>
          <div onClick={()=>{}} ><p>ALFABETO</p></div>
        
          
        </div>
        <div className={style.routes}>
          
          
        </div> */