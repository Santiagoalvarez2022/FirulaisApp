import React from "react";
import {Link} from "react-router-dom"


const Card = () =>{
    return(
      <div>
          <h1>soy el componete Card</h1>
        <Link to= '/' ><button>Ir al Home</button> </Link>
    
      </div>
    )
}

export default Card;