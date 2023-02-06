import React from "react";
import style from './Login.module.css'
import {Link} from "react-router-dom"


//hacer funcion que valla cambiando entre 4 o 5 imagense de fondo

const Login = () =>{
    return(
      <div className={style.all}>
          <h1 className={style.title}> Firulais </h1>
          
        <div className={style.sub}>
        <h2 className={style.subtitle}>Dog lovers</h2>
          <Link to= '/home' >
            <div className={style.button}>
              <h3>Login</h3> 
            </div> 
          </Link>
        </div>
    
      </div>
    )
}

export default Login;