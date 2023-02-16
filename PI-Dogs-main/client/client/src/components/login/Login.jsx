import React from "react";
import style from './Login.module.css'
import {Link} from "react-router-dom"


//hacer funcion que valla cambiando entre 4 o 5 imagense de fondo

const Login = () =>{
    return( 
      <div className={style.all}>
          <h1 className={style.title}> Firulais </h1>
          
        <div className={style.sub}>
        <h3 className={style.subtitle}>Conocé a tus mascostas</h3>
          <Link className={style.button} to= '/home' >
            <div>
              <h3>Entrar</h3> 
            </div> 
          </Link>
        </div>
    
      </div>
    )
}

export default Login;