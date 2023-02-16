import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detail_dog, reset_detail_dog } from "../../redux/actions";
import style from "./about.module.css"
import image from './cargando.gif'
const About = () =>{


    return(
      <div className={style.conteiner} >
        <img src={image}  alt="" />
      </div>
    )
}

export default About;
