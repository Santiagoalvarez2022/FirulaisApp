import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { detail_dog, reset_detail_dog } from "../../redux/actions";
import style from "./Detail.module.css"
import Loanding from '../loanding/Loading'
import image_respaldo from './fotoRespaldo.jpg' 
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"



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
        <div className={style.all} >
          <div className={style.contaiener}>
            <div className={style.icon}>
              <Link to="/home">
                <FontAwesomeIcon className={style.icon_a} icon={faHouse} style={{  height:"2.1rem"}} /> 

              </Link>
            </div>
            <div className={style.card}>
          
              <div className={style.boxOne}>
                <div className={style.container_image}>
                  <img src={selector.image ||image_respaldo } alt="" />
                </div>
                <div className={style.contaiener_name}>
                  <h1>{selector.name}</h1>
                </div>
              </div>


              <div className={style.boxTwo}>
                <div className={style.header} ></div>
                
                  <div className={style.info} >
                    <div className={style.info_boxOne}>
                      <div>
                        <h3>PESO</h3>
                      </div>
                      <div>
                        <h3>ALTURA</h3>
                      </div>
                      <div>
                        <h3>AÑOS DE VIDA</h3>
                      </div>
                      <div>
                        <h3>TEMPERAMENTOS</h3>
                      </div>
                    </div>
                    <div className={style.info_boxTwo}>
                      <div>
                        <h3 className={style.Peso}>{selector.Peso} Kg</h3>
                      </div>

                      <div>
                        <h3> {selector.Altura} cm</h3>
                      </div>

                      <div>
                        <h3 className={style.Vida}>{años} Años</h3>

                      </div>

                      <div>
                       
                        {typeof(selector.temperament) === "string"
                          ? <h4>{selector.temperament}</h4>
                          : selector.temperaments.map((t)=>{
                            return <h4
                            
                        >{t.name }</h4>
                      })
                    }
                      
                      </div>
                    </div>
                  </div>

                <div className={style.footer} ></div>
                
              </div>
            </div>
            

            
         
          </div>
        </div> 
      )
  }
}


/*  <h3 className={style.Altura}>Altura aproximada {selector.Altura} cm.</h3>
                    <h3 className={style.Peso}>Rango aproximado de su peso es de {selector.Peso}kg.</h3>
                    <h3 className={style.Vida}>Estimativo de vida {años} años.</h3>

                    <div className={style.Temperaments}>
                      <h3 className={style.Temperaments}>Temperamentos que los caracterizan:</h3> {typeof(selector.temperament) === "string"
                      ? <h4>{selector.temperament}</h4>
                      : selector.temperaments.map((t)=>{
                        return <h4
                        
                        >{t.name }</h4>
                      })
                    }
                    </div>*/
export default Detail;

