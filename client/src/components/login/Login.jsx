import React from "react";
import style from './Login.module.css'
import {Link} from "react-router-dom"
import img from "./dogPresentacion.png"

//hacer funcion que valla cambiando entre 4 o 5 imagense de fondo

const Login = () =>{
    return( 
      <div className={style.all}>
        <h1 className={style.firulais} >FIRULAIS</h1>
        <h1 className={style.app_title} >APP</h1>
        <div className={style.container_button}>
          <Link to="/home">
            <button className={style.btnLogin}>Entrar</button>
          </Link>

        </div>
      </div>

    )
}

export default Login;