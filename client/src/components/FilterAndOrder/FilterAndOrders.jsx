import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket,faAnglesRight, faAnglesLeft, faArrowDownAZ, faArrowUpZA, faDog, faCircleArrowRight, faCircleArrowLeft,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import style from "./FilterAndOrders.module.css"
import { get_by_name , get_temperaments, filter_temperament, order_races , order_alfabet, order_peso, change_page, handler_indices, clear_dogs} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../navbar/NavBar'




export default function FilterAndOrders() {
    useEffect(()=>{
        dispatch(get_temperaments())
    
    },[])


    const [orderAZ, setOrderAZ] = useState(true)
    const {temperaments,dogs,copy_dogs }= useSelector((state)=>state)

    console.log("state",temperaments,dogs,copy_dogs);    

    const [stateForm, setForm] = useState("")
    const dispatch = useDispatch()

    const changeHandler = ({target}) =>{
        let {value} = target; 
        setForm(value)
        let result = copy_dogs.filter(dog=> dog.name.toLowerCase().includes(value.toLowerCase()))
        console.log("este es result ", result); 
        if (!result.length) {
            //si no encuentra nada mando un msg
            result = [{msg:"No se encontro una raza con este nombre, revisa lso filtros que has colocado para mejorar tu busqueda"}]

        }
        dispatch(get_by_name(result))
    }
        
  
    //elimino er refresh defaull de la accion submit
    const handlerSubmit = (event) =>{
        event.preventDefault()
        // dispatch(clear_dogs())
        setForm("")
    } 
    

    const handlerOrderAz = ()=>{
        setOrderAZ(!orderAZ)
    }









    
    const selectTemperament = (event) => {
        //delaro una variable que contien el temperamento seleccionado
        let temperament = event.target.value.trim()
        dispatch(handler_indices())
        dispatch(filter_temperament(temperament))
    
    }
    



  return (
    <div className={style.container}>

            <div className={style.temperaments}>
                <form  onSubmit={(e)=>{handlerSubmit(e)}}  className={style.form}>
                    <label htmlFor='search' className={style.iconSearch}> 
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat />
                    </label>
                    <input id='search' onChange={(e)=>changeHandler(e)} name="search" type="text" value={stateForm}/>
                </form>





                <form action="#"> 
                    <select onChange = {selectTemperament}  name="temperamentos" id="temp" >
                        <option >TODOS LOS PERROS</option>
                                    {temperaments.length ? temperaments.map((temp)=>{
                                    return <option
                                    value={temp.name}
                                    key={temp.id}
                                    name = {temp}

                                    >                    
                                    {temp.name}
                                    </option>
                                })  :null}
                    </select>
                </form>        
            </div>
       


        <div className={style.container_order}>
            <div className={style.order}>
                <div className={style.order_height} >
                    <label htmlFor="check_altura">Altura</label>
                    <input id='check_altura' className={style.check_altura} type='checkbox' /> 
                
                    <ul className={style.ul}>
                        <li>Mayor a menor</li>
                        <li>Menor a mayor</li>
                    </ul>
                </div>
            </div>

            <div className={style.order_width}> 
                <label htmlFor="check_peso">Peso</label>
                    <input id='check_peso' className={style.check_peso} type='checkbox' /> 
                
                    <ul className={style.ul2}>
                        <li>Mayor a menor</li>
                        <li>Menor a mayor</li>
                    </ul>
            </div>
          

            <div className={style.alfabeth} onClick={()=>handlerOrderAz()} > 
            { orderAZ 
                ? <FontAwesomeIcon icon={faArrowDownAZ} />     
                : <FontAwesomeIcon icon={faArrowUpZA}  /> 
            }
            </div>
           
        </div>

    </div>
  )
}
/*     <div><FontAwesomeIcon icon={faArrowAltCircleDown} /> </div>
        <div><FontAwesomeIcon icon={faDog} />  </div>


        <div><FontAwesomeIcon icon={faCircleArrowLeft} />  </div>
        <div><FontAwesomeIcon icon={faCircleArrowRight} />  </div>
        <div><FontAwesomeIcon icon={faAnglesRight} />  </div>
        <div><FontAwesomeIcon icon={faAnglesLeft} />  </div>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />   */