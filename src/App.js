import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
// import Homepage from './components/Homepage'
import CharacterForm from './components/CharacterForm'
import Login from './components/Login'
import logo from './logo.png'
import miniLogo from './miniLogo.png'
import './App.css';
// Route, NavLink, Switch, Redirect

class App extends Component {
  state = {
    userExists: false
  }

  render(){
  return (
    this.state.userExists?
    <div className="loggedIn">
      <img src={miniLogo} alt="logooo" className="minilogo"></img>
      <Router>
        <CharacterForm />
      </Router>
    </div>
    :
    <div className="App">
      <img src={logo} alt="logoo" className="logo"></img>
      <Login className="login"/>
    </div>
  );
  }
}

export default App;
