import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_createdRaces } from '../../redux/actions'
import {Link} from "react-router-dom"
import imgBackup from "./dog.jpg"
import style from "./CreatedRaces.module.css"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { faHouse} from "@fortawesome/free-solid-svg-icons"

export default function CreatedRaces() {
    const dogs_complted = useSelector(state=> state.createdRaces)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(get_createdRaces())
    },[])

    const [form, SetForm] = useState("")
    //manejador del input
    const handlerForm = ({target}) =>{
        let {value} = target;
        
        SetForm(value)
    }

  return (
    <div className={style.container}>
        <div className={style.navbar}>
                <div className={style.icon}>
                    <Link to="/home">
                        <FontAwesomeIcon className={style.icon_a} icon={faHouse} style={{  height:"2.1rem"}} /> 

                    </Link>
                </div>
                <div className={style.searched}>

                </div>
                <form   className={style.SearchBar}>
                    <input onChange={handlerForm} name="search" type="text"  value={form}/>
                    <button> 
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat />
                    </button>
                </form>
        </div>
            

        <div className={style.container_card}>
            { dogs_complted.length 
                ?  dogs_complted.map(dog=>{
                    const { name, id, image,type } = dog

                    return  <Link
                    key={id} 
                    to= {`/detail/${id}?type=${type}`} 
                    className={style.card} > 
                    <div className={style.imagen}>

                    <img src={image||imgBackup} alt="" />
                    </div>
                    <div className={style.name}>
                    <p>{name}</p>
            
                    </div>
                </Link>
                    })
                : null 
            } 
        </div>    
    </div>
  )
}

