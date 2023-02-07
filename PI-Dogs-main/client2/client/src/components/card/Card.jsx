import React from "react";
import {Link} from "react-router-dom"
import style from './Card.module.css'
//de prueba 
import fakeimage from './dog.png'


const Card = (props) =>{

    const {id,name,Peso,image,temperament} = props
    console.log("este el card",props)

    return(
      <Link to= {`/detail${id}`} className={style.all} >
      
          <div className={style.title}>
            <p>{name}</p>
          </div>
          
          <div className={style.subcontent}>
            <div className={style.imagen}>
              <img src={image || fakeimage} alt="" />

            </div>
            <div className={style.temperamentos}>
              <p>Sus temperamentos : </p>
              <p >{temperament}</p>
            </div>

          </div>

      
      </Link>
      
    )
}
/*Imagen
Nombre
Temperamento
Peso */

export default Card;
/*name: "Affenpinscher", Altura: "23 - 29", … }
​​​
Altura: "23 - 29"
​​​
"Años_de_vida": "10 - 12 years"
​​​
Peso: "3 - 6"
​​​
id: 1
​​​
image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
​​​
name: "Affenpinscher"
​​​
temperament: "Stubborn, Curious, Playful, Adventurous,  */