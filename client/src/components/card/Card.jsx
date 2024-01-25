import React from "react";
import {Link} from "react-router-dom"
import style from './Card.module.css'
//de prueba 
import imgBackup from "./dog.jpg"

const Card = ({id,image,name}) =>{

    //funcion que al hacer onClivk en el link se guarde en redux el estado global la info de la raza pedida


    return(
      <Link to= {`/detail/${id}`} className={style.all}  > 
        <div className={style.imagen}>
          <img src={image ||imgBackup } alt="" />
        </div>
        <div className={style.name}>
          <p>{name}</p>

        </div>
      </Link>
      
    )
}


export default Card;
