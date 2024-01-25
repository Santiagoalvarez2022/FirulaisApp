import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_createdRaces, search_created_races } from '../../redux/actions'
import {Link} from "react-router-dom"
import imgBackup from "../card/dog.jpg"
import style from "./CreatedRaces.module.css"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { faHouse} from "@fortawesome/free-solid-svg-icons"

export default function CreatedRaces() { 
    let {createdRaces,copy_createdRaces} = useSelector(state=> state);


    
    const [form, SetForm] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_createdRaces())
    },[])


    //manejador del input
    //si hago unacfuction donde le paso por paramentro el array filtrado y ahi modifica el store 
    const handlerForm = ({target}) =>{
        let {value} = target;
        SetForm(value)
        let result = copy_createdRaces.filter(dog=> dog.name.toLowerCase().includes(value.toLowerCase()))

       dispatch(search_created_races(result))
        
    }


  return (
    <div   className={style.container}>
        <div className={style.navbar}>
                <div className={style.icon}>
                    <Link to="/home">
                        <FontAwesomeIcon className={style.icon_a} icon={faHouse} style={{ height:"2.1rem"}} /> 
                    </Link>
                </div>
                <div className={style.searched}>

                </div>
                <form   className={style.SearchBar}>
                    <input onChange={handlerForm}
                    id='search' name="search" type="text"  value={form}/>
                    <label  htmlFor='search' className={style.iconInput}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat />

                    </label>
                </form>
        </div>
            

        <div className={style.container_card}>
            {createdRaces.length 
                ? createdRaces.map(dog=>{
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

