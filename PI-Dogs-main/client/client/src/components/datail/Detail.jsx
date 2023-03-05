import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { detail_dog, reset_detail_dog } from "../../redux/actions";
import style from "./Detail.module.css"
import Loanding from '../loanding/Loading'

import image_respaldo from './fotoRespaldo.jpg' 

const Detail = () =>{
    const selector = useSelector((state)=>state.detaildog)
    const dispatch = useDispatch()
    const {id} = useParams()


    useEffect(()=>{
      dispatch(detail_dog(id))
      return ()=>{ 
        dispatch(reset_detail_dog())
      }
    },[])

    console.log(selector);
    const años = Object.keys(selector).length? selector.Años_de_vida.replace(" years","") : null

    if(!Object.keys(selector).length){
      return(
        <Loanding />
      )
    } else {
      return(
        <div className={style.conteiner} >
        <div>
          <div className={style.title}>
            <h1>{selector.name}</h1>
            <img src={selector.image ||image_respaldo } alt="" />
          </div>
          <div className={style.info} >
            <h3 className={style.Altura}>Altura aproximada entre {selector.Altura} cm.</h3>
            <h3 className={style.Peso}>Rango aproximado de su peso es de {selector.Peso}kg.</h3>
            <h3 className={style.Vida}>Estimativo de vida {años} años.</h3>
            <h3 className={style.Vida}>Color de la Raza {selector.color}.</h3>

            <div className={style.Temperaments}>
              <h3 className={style.Temperaments}>Temperamentos que los caracterizan:</h3> {typeof(selector.temperament) === "string"
              ? <h4>{selector.temperament}</h4>
              : selector.temperaments.map((t)=>{
                return <h4
                
                >{t.name }</h4>
              })
            }
            </div>
          </div>
        </div>
        </div> 
      )
  }
}
export default Detail;

