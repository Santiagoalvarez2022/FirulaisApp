import React from "react";
import {Link} from "react-router-dom"


const Navbar = () =>{
    return(
      <div>
          <h1>soy el componete Navbar</h1>
        <Link to= '/' ><button>Ir al Home</button> </Link>
    
      </div>
    )
}

export default Navbar;