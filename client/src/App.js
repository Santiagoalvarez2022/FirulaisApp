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
import Favicon from "react-favicon"
import favicon from "./assests/favicon.png"
import CreatedRaces from './components/createdRaces/CreatedRaces';
import Nav from './components/nav/Nav';

 const url = process.env.REACT_APP_URL_BACKEND
 axios.defaults.baseURL = url
//axios.defaults.baseURL = "http://localhost:3001/api"




function App() {
  
  const location = useLocation()
  
  return (
    <div className="App">

      <Favicon url={favicon}></Favicon>

      <Route exact path="/">
        <Login />
      </Route>
      {/* Condiciono que la barra de navegacion para que no aparezca cuando esta el llogin */}
      {location.pathname === "/home" ? <Nav /> :null} 


      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/detail/:id">
        <Detail />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>
      
      <Route exact path="/createdraces">
        <CreatedRaces />
      </Route>
      <Route  path="/">
        <Footer />
      </Route>

    </div>
  );
}

export default App;
