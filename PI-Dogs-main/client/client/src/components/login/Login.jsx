import React from "react";
import style from './Login.module.css'
import {Link} from "react-router-dom"
import img from "./dogPresentacion.png"

//hacer funcion que valla cambiando entre 4 o 5 imagense de fondo

const Login = () =>{
    return( 
      <div className={style.all}>
        
        <div className={style.conteiner_title} >
          <h1 className={style.title}> FiruApp </h1>  
        </div>

        <div className={style.body}>
          <div className={style.getIn}>     
            <div className={style.sub}>
              <div className={style.enunciado}>
                <h3 className={style.subtitle}>Conocé a tus mascostas</h3>
                <p>y aprendé más de ellas</p>
              </div>
              <div  className={style.button}>
                <Link to= '/home' >
                  <div>
                    <h3>Entrar</h3> 
                  </div> 
                </Link>
              </div>
            </div>
          </div>

          <div className={style.imagen}>
              <img src={img} alt="" />
          </div>
        </div>
    
      </div>
    )
}

export default Login;