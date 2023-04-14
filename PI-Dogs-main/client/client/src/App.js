import './App.css';
import Detail from './components/datail/Detail';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import About from './components/about/about';
import Footer from './components/footer/Footer';
import axios from 'axios';
//declaro la ruta a la cual le va a pegar el front al back

axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  const location = useLocation()
  

  return (
    <div className="App">

      <Route exact path="/">
        <Login />
      </Route>
      {/* Condiciono que la barra de navegacion para que no aparezca cuando esta el llogin */}
      {/* {location.pathname === "/" ? null : <Navbar />} */}


      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/detail/:id">
        <Detail />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>
      
      <Route  path="/">
        <Footer />
      </Route>

    </div>
  );
}

export default App;
