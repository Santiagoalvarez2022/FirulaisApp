import logo from './logo.svg';
import './App.css';
import Card from './components/card/Card';
import Create from './components/create/Create';
import Detail from './components/datail/Detail';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Navbar from './components/navbar/NavBar';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
      
      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/create">
        <Create />
      </Route>

      <Route exact path="/detail">
        <Detail />
      </Route>

  
      <Route exact path="/">
        <Navbar />
      </Route>
    </div>
  );
}

export default App;
