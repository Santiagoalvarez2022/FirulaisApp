import React from 'react'
import { Link } from 'react-router-dom'
import style from "./Nav.module.css"

export default function Nav() {
  return (
    <nav className={style.container}>
       <div className={style.nav} >
            <div className={style.links}>
              <a href="#dogs">Dogs</a>
            </div>
            <div className={style.links}>
              <a href='#create'>Crear mi Raza</a>
              
            </div>
            <div className={style.links}>
              <Link to="/createdraces">Razas Creadas</Link>            
            </div>
       </div>
    </nav>
  )
}
