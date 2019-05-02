import React, { Component } from 'react';
import Character from './Character'
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { populateCharacters, populateGames } from '../actions/appActions'

class Homepage extends Component {

    componentDidMount(){
        this.props.populateCharacters()
        this.props.populateGames()
      }

    render() {
        return (
            <div className="pageBoxes">
                <h1 id='greeting'>Welcome, {localStorage.getItem('username')}!</h1>
                <div id='homeChars'>
                {this.props.characters[0] ? 
                        <>
                            <h3>Most recent character:</h3>
                            <img src={this.props.characters[this.props.characters.length-1].image} alt='most recent character' id='homepageChar'></img>
                            <h2>{this.props.characters[this.props.characters.length-1].name}!</h2>
                        </>
                    :
                    <h3>No characters yet. Click the link below to begin!</h3>
                }
                </div>
                <NavLink to='/characters' id='charBtn'>
                <button>All Characters</button>
                </NavLink>
                <div id="gameBox">
                {this.props.games[0] ? 
                        <>
                            <h3>Most recent game:</h3>
                            <div className='oneGame'>{this.props.games[this.props.games.length-1].game.group_name}, being held at {this.props.games[this.props.games.length-1].game.location}!</div>
                        </>
                    :
                    <h3>No games yet. Click the link below to begin!</h3>
                }
                </div>
                <NavLink to='/games' id='gamesBtn'>
                <button>All Games</button>
                </NavLink>
                <img src={localStorage.getItem('avatar')} alt='avatar' className='avatar'></img>
                <NavLink to='/profile' id='profieBtn'>
                <button>Full Profile</button>
                </NavLink>
                {this.props.characters.map(character => {
                    return <Route exact path={`character/${character.name}`} render={()=> <Character char={character}/>}/>
                        })
                }
            </div>
        );
    }
}
const mapPropsToState = (state) => {
   return {
       characters: state.populateCharactersReducer.characters,
       games: state.populateGamesReducer.games,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        populateCharacters: () => dispatch(populateCharacters()),
        populateGames: () => dispatch(populateGames())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(Homepage);
