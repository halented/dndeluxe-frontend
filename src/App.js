import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import Homepage from './components/Homepage'
import GameContainer from './components/GameContainer'
import CharacterContainer from './components/CharacterContainer'
import CharacterForm from './components/CharacterForm'
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
        {this.props.userExists ?
        <div className="loggedIn">
          <img src={miniLogo} alt="logooo" className="minilogo"></img>
          <NavLink to="/home" className='navItem'>Home</NavLink>
          <NavLink to='/games' className='navItem'>Games</NavLink>
          <NavLink to='characters' className='navItem'>Characters</NavLink>
          <NavLink to='profile' className='navItem'>Profile</NavLink>
          <NavLink to='/logout' className='navItem'>Logout</NavLink>
          <Switch>
            <Route exact path='/home' component={Homepage}/>
            <Route exact path='/games' component={GameContainer}/>
            <Route exact path='/characters'component={CharacterContainer}/>
            <Route exact path='/profile'component={Profile}/> 
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/new-character' component={CharacterForm}/>
            <Route path="/login" render={()=> (<Redirect to='/home'/>)}/>
            <Route exact path="/" render={()=> (<Redirect to='/home'/>)}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
        :
        <div className="App">
          <img src={logo} alt="logoo" className="logo"></img>
          <Login className="login"/>
          <Route path='/logout' render={()=> (<Redirect to='/login'/>)}/>
        </div>
        }
      </>
    </Router>
  );
  }
}
const mapStateToProps = state => {
  return {
    userExists: state.loginReducer.userExists
  }
}
export default connect(mapStateToProps)(App);
