import React from "react";
import {Link} from "react-router-dom"
import style from './Card.module.css'
//de prueba 
import fakeimage from './dog.png'


const Card = (props) =>{

    const {id,name,Peso,image,temperament, indice} = props

    return(
      <Link to= {`/detail${id}`} className={style.all} > 
      
          <div className={style.title}>
            <p>{name}</p>
            <p>{indice}</p>
          </div>  
          
          <div className={style.subcontent}>
            <div className={style.imagen}>
              <img src={image || fakeimage} alt="" />

            </div>
            <div className={style.temperamentos}>
              <p>Sus temperamentos : </p>
              <p >{temperament}</p>
            </div>

          </div>

      
      </Link>
      
    )
}
/*Imagen
Nombre
Temperamento
Peso */

export default Card;
