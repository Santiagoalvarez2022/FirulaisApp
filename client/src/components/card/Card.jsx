import React from "react";
import {Link} from "react-router-dom"
import style from './Card.module.css'
//de prueba 
import fakeimage from './dog.jpg'

const Card = ({id,image,name}) =>{

    //funcion que al hacer onClivk en el link se guarde en redux el estado global la info de la raza pedida


    return(
      <Link to= {`/detail/${id}`} className={style.all}  > 
        <div className={style.imagen}>
          <img src={image} alt="" />
        </div>
        <div className={style.name}>
          <p>{name}</p>

        </div>
      </Link>
      
    )
}
/*Imagen
Nombre
Temperamento
Peso */

export default Card;
/*         <div className={style.title}>
            <p>{name}</p>
            <p>{indice}</p>
          </div>  
          
          <div className={style.subcontent}>
            <div className={style.imagen}>
              <img src={image || fakeimage} alt="" />
            </div>

            <div className={style.temperamentos}>
              <h3>Temperamentos : </h3>
              <p >{temperament}</p>
            </div>

            <div className={style.peso} >
              <h3>Peso :  </h3> 
              <div>
                <p>min : {min} kg</p>
                <p>max : {max} kg</p>
              </div>
            </div>
          </div> */