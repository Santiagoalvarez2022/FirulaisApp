import React from "react";
import {Link} from "react-router-dom"
import style from './NavBar.module.css'

const Navbar = () =>{
    return(
      <div className={style.all}>
        <form action="" className={style.form}>
          <label htmlFor="">b</label>
          <input type="text" />
          <button>BUSCAR</button>
        </form>

        <Link className={style.link} to='/create' >CREATE</Link>

        <Link className={style.link} to='/about' >about</Link>
        <Link className={style.link}  to= '/' ><button>Salir</button> </Link> 



      </div>
    )
}

export default Navbar;