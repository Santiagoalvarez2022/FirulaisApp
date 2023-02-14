import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { detail_dog, reset_detail_dog } from "../../redux/actions";
import style from "./Detail.module.css"
import Loanding from '../loanding/Loading'
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
            <img src={selector.image} alt="" />
          </div>
          <div className={style.info} >
            <h3>Altura aproximada entre {selector.Altura} cm.</h3>
            <h3>Rango aproximado de su peso es de {selector.Peso}kg.</h3>
            <h3>Estimativo de vida {años} años.</h3>
            <h3>Temperamentos que los caracterizan: "{selector.temperament}".</h3>
          </div>
        </div>
        </div>
      )
  }
}
export default Detail;

/*
[ .] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[. ] Altura
[ .] Peso
[. ] Años de vida
*/