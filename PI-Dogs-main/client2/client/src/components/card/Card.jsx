import React from "react";
import {Link} from "react-router-dom"


const Card = (props) =>{
    const {id,name,Altura,Peso,Años_de_vida,image,temperament} = props


    return(
      <div>
          <Link to= '/' ><button>Ir al Home</button> </Link>
          <h3>{id}</h3>
          <h3>{name}</h3>
          <h3>{Altura}</h3>
          <h3>{Peso}</h3>
          <h3>{Años_de_vida}</h3>
          <img src={image} alt="" />
          <h3>{temperament}</h3>
      </div>
    )
}

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