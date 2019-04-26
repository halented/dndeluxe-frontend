import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage'
import GameContainer from './components/GameContainer'
import CharacterContainer from './components/CharacterContainer'
import Profile from './components/Profile';
import Logout from './components/Logout'
import NoMatch from './components/NoMatch'
import Login from './components/Login'
import logo from './logo.png'
import miniLogo from './miniLogo.png'
import './App.css';


class App extends Component {

  render(){
  return (
    <Router>
      <>
        {localStorage.getItem("token") ?
        <div className="loggedIn">
        <img src={miniLogo} alt="logooo" className="minilogo"></img>
          <ul className='navBar'>
            <li className='navItem'><NavLink to="/home">Home</NavLink></li>
            <li className='navItem'><NavLink to='/games'>Games</NavLink></li>
            <li className='navItem'><NavLink to='characters'>Characters</NavLink></li>
            <li className='navItem'><NavLink to='profile'>Profile</NavLink></li>
            <li className='navItem'><NavLink to='/logout'>Logout</NavLink></li>
            <Switch>
              <Route exact path='/home' component={Homepage}/>
              <Route exact path='/games' component={GameContainer}/>
              <Route exact path='/characters'component={CharacterContainer}/>
              <Route exact path='/profile'component={Profile}/> 
              <Route exact path='/logout' component={Logout}/>
              <Route path="/login" render={()=> (<Redirect to='/home'/>)}/>
              <Route exact path="/" render={()=> (<Redirect to='/home'/>)}/>
              <Route component={NoMatch}/>
            </Switch>
          </ul>
        </div>
        :
        <div className="App">
          <img src={logo} alt="logoo" className="logo"></img>
          <Login className="login"/>
        </div>
        }
      </>
    </Router>
  );
  }
}

export default App;
