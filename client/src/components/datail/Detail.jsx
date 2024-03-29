import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom"
import { detail_dog, get_dogs, reset_detail_dog } from "../../redux/actions";
import style from "./Detail.module.css"
import Loanding from '../loanding/Loading'
import image_respaldo from '../card/dog.jpg' 
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse} from "@fortawesome/free-solid-svg-icons"







const Detail = () =>{
  const dispatch = useDispatch();
  const {id} = useParams()
  const selector = useSelector((state)=>state.detaildog )
  
  
  useEffect(()=>{
    //si copy_dogs es undefined o [] depacho la action get all para traer todos
    dispatch(detail_dog(id))
    return ()=>{
      dispatch(reset_detail_dog())
    }
  },[])
 if(selector.error) {
    return(
    <>
    No se encontro esta raza 
    </>) }
    else {
      const {name,alturaMax,alturaMin,pesoMax,pesoMin,vidaMax,vidaMin,temperaments} = selector;
      
      
      return(
        <div className={style.all} >
          <h1>DETAIL</h1>
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
                  <h1>{name}</h1>
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
                        <h3 className={style.Peso}>{`${pesoMin} - ${pesoMax}`}  Kg</h3>
                      </div>

                      <div>
                        <h3> {`${alturaMin} - ${alturaMax}`} cm</h3>
                      </div>

                      <div>
                        <h3 className={style.Vida}> {`${vidaMin ? vidaMin.replace("years"," ") : ""} - ${vidaMax ? vidaMax.replace("years"," ") : ""}`} Años</h3>

                      </div>

                      <div>
                            <h3>{temperaments}</h3>                                  
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

export default Detail;




/*   const selector = useSelector((state)=>state.detaildog)
    const dispatch = useDispatch()

    const location = useLocation()
    const {id} = useParams()

    //busco las el value de las querys que paso por la url
    //declaro instancia de URLSearchParama pasandole como parametro el string con todo el valos de la url despues del endpoint, estos valores se encuentran en el objeto location que instancie antes

    let query  = new URLSearchParams(location.search)
    //tomo el valor pasando el nombre de la query que busco puedo usar .get(query) si busco un solo valor o -getAll() si busco mas de un valor con la misma query . Por ejemplo type=${type}&&type=banana => resultado  ['api', 'banana']
    let type = query.getAll("type")

    console.log();



    const {name,alturaMax,alturaMin,pesoMax,pesoMin,vidaMax,vidaMin,temperaments} = selector;

    useEffect(()=>{

      //manejar un estado local es mejor en este componente


      dispatch(detail_dog(id,type[0]))
      return ()=>{ 
        dispatch(reset_detail_dog())
      }
    },[])

 
    console.log("esto en el detalle");
    if(!Object.keys(selector).length){
      return(
        <Loanding />
      )
    } else if(selector.error) {
      return(
      <>
      No se encontro esta raza 
    </>)
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
                  <h1>{name}</h1>
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
                        <h3 className={style.Peso}>{`${pesoMin} - ${pesoMax}`}  Kg</h3>
                      </div>

                      <div>
                        <h3> {`${alturaMin} - ${alturaMax}`} cm</h3>
                      </div>

                      <div>
                        <h3 className={style.Vida}> {`${vidaMin ? vidaMin.replace("years"," ") : ""} - ${vidaMax ? vidaMax.replace("years"," ") : ""}`} Años</h3>

                      </div>

                      <div>
                            <h3>{temperaments}</h3>                                  
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

export default Detail; */