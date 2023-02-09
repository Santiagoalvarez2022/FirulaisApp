import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import style from './NavBar.module.css'
import { get_by_name , get_temperaments } from "../../redux/actions";
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
  

  console.log(selectorTemps)
  


    return(
      <div className={style.all}>
        <form  onSubmit={(e)=>{handlerSubmit(e)}}  className={style.form}>
          <label htmlFor="search"> Busqueda </label>
          <input onChange={(e)=>changeHandler(e)} name="search" type="text" value={stateForm}/>
          <button>BUSCAR</button>
        </form>
        <div className={style.filtros}>
          <div onClick={()=>{}} >
            <p >TEMPERAMENTOS</p>
            <form >
              <select name="temperamentos" id="temp">
                {selectorTemps.length ? selectorTemps.map((temp)=>{
                  return <option
                  key={temp.id}
                  >                    
                  {temp.name}</option>

                })  :null}
              </select>
            </form>
          
          </div>
          <div onClick={()=>{}} ><p>RAZA</p></div>
          <div onClick={()=>{}} ><p>PESO</p></div>
          <div onClick={()=>{}} ><p>ALFABETO</p></div>
        
          
        </div>
        <div className={style.routes}>
          <Link className={style.link} to='/create' >CREATE</Link>
          <Link className={style.link} to='/about' >about</Link>
          <Link className={style.link}  to= '/' ><button>Salir</button> </Link> 
        </div>
      </div>
    )
}

export default Navbar;