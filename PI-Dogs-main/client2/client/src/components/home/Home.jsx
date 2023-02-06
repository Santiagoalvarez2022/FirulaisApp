import React from "react";
import {Link} from "react-router-dom"


const Home = () =>{
    return(
      <div>
          <h1>soy el componete Home</h1>
        <Link to= '/' ><button>Ir al Home</button> </Link>
    
      </div>
    )
}

export default Home;