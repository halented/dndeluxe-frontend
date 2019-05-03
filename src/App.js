import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { login, populateCharacters } from './actions/appActions'
import Homepage from './components/Homepage'
import GameContainer from './components/GameContainer'
import GameForm from './components/GameForm'
import CharacterContainer from './components/CharacterContainer'
import CharacterForm from './components/CharacterForm'
import Character from './components/Character'
import Profile from './components/Profile';
import Logout from './components/Logout'
import NoMatch from './components/NoMatch'
import Login from './components/Login'
import logo from './logo.png'
import miniLogo from './miniLogo.png'
import './App.css';


class App extends Component {

  componentDidMount = () => {
    if(this.props.userExists || localStorage.getItem('token')){
    this.props.populateCharacters()
    }
  }

  render(){
  return (
    <Router>
      <>
        {this.props.userExists || localStorage.getItem('token') ?
        <div className="loggedIn">
          <div className='navBar'>
            <img src={miniLogo} alt="logooo" className="minilogo"></img>
            <NavLink to="/home" className='navItem'>Home</NavLink>
            <NavLink to='/games' className='navItem'>Games</NavLink>
            <NavLink to='/characters' className='navItem'>Characters</NavLink>
            <NavLink to='/profile' className='navItem'>Profile</NavLink>
            <NavLink to='/logout' className='navItem'>Logout</NavLink>
          </div>
          <Switch>
            <Route exact path='/home' component={Homepage}/>
            <Route exact path='/games' component={GameContainer}/>
            <Route exact path='/characters'component={CharacterContainer}/>
            <Route exact path='/profile'component={Profile}/> 
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/new-character' component={CharacterForm}/>
              {this.props.characters.map(character => {          
                return <Route key={character.id} exact path={`/character/${character.id}`} 
                              render={(props)=> (
                                  <Character {...props} char={character}/>
                                )}/>
                    })
              }
            <Route exact path='/new-game' component={GameForm}/>
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
const mapPropsToState = state => {
  return {
    userExists: state.loginReducer.userExists,
    characters: state.populateCharactersReducer.characters
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
    populateCharacters: () => dispatch(populateCharacters())
  }
}
export default connect(mapPropsToState, mapDispatchToProps)(App);

