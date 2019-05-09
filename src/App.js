import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login, populateCharacters, populateSpells, populateGames } from './actions/appActions';
import Homepage from './components/Homepage';
import GameContainer from './components/GameContainer';
import GameForm from './components/GameForm';
import Game from './components/Game'
import CharacterContainer from './components/CharacterContainer';
import CharacterForm from './components/CharacterForm';
import CharacterEdit from './components/CharacterEdit';
import Character from './components/Character';
import Profile from './components/Profile';
import SpellSearch from './components/SpellSearch';
import Spell from './components/Spell'
import Logout from './components/Logout';
import NoMatch from './components/NoMatch';
import Loading from './components/Loading'
import Login from './components/Login';
import logo from './logo.png';
import miniLogo from './miniLogo.png';
import './App.css';


class App extends Component {

  componentDidMount = () => {
    if(this.props.userExists || localStorage.getItem('token')){
    this.props.populateCharacters()
    this.props.populateSpells()
    this.props.populateGames()
    }
  }

  render(){
  return (
    <Router>
      <>
        {this.props.userExists || localStorage.getItem('token') ?
        <div className="loggedIn">
          <div className='navBar'>
            <NavLink to="/home"><img src={miniLogo} alt="logooo" className="minilogo"></img></NavLink>
            <NavLink to="/home" className='navItem' id='n1'>Home</NavLink>
            <NavLink to='/games' className='navItem' id='n2'>Games</NavLink>
            <NavLink to='/characters' className='navItem' id='n3'>Characters</NavLink>
            <NavLink to='/profile' className='navItem' id='n4'>Profile</NavLink>
            <NavLink to='/spell-search' className='navItem' id='n5'>Spells</NavLink>
            <NavLink to='/logout' className='navItem' id='n6'>Logout</NavLink>
          </div>
          <Switch>
            <Route exact path='/home' component={Homepage}/>
            <Route exact path='/games' component={GameContainer}/>
            <Route exact path='/characters'component={CharacterContainer}/>
            <Route exact path='/profile'component={Profile}/> 
            <Route exact path='/logout' component={Logout}/>
            <Route exact path='/new-character' component={CharacterForm}/>
            <Route exact path='/edit-character' component={CharacterEdit}/>
              {this.props.characters.map(character => {          
                return <Route key={character.id} exact path={`/character/${character.id}`} 
                              render={(props)=> (
                                  <Character {...props} char={character}/>
                                )}/>
                    })
              }
              {this.props.spells.map(spell => {    
                return <Route key={spell.id} exact path={`/spell/${spell.id}`} 
                              render={(props)=> (
                                  <Spell {...props} spell={spell}/>
                                )}/>
                    })
              }
              {this.props.games.map(game => {          
                return <Route key={game.id} exact path={`/game/${game.id}`} 
                              render={(props)=> (
                                  <Game {...props} game={game}/>
                                )}/>
                    })
              }
            <Route path='/spell/*' component={Loading}/>
            <Route exact path='/new-game' component={GameForm}/>
            <Route exact path='/spell-search'component={SpellSearch}/>
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
    characters: state.populateCharactersReducer.characters,
    spells: state.populateSpellsReducer.spells,
    games: state.populateGamesReducer.games
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
    populateCharacters: () => dispatch(populateCharacters()),
    populateSpells: () => dispatch(populateSpells()),
    populateGames: () => dispatch(populateGames())
  }
}
export default connect(mapPropsToState, mapDispatchToProps)(App);

