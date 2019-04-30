import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'

class Homepage extends Component {

    render() {
        return (
            <div className="pageBoxes">
                <h1 id='greeting'>Welcome, {localStorage.getItem('username')}!</h1>
                <div id='homeChars'> {console.log(this.props.characters[0])}
                {this.props.characters[0] ? 
                        <>
                            <h3>Most recent character:</h3>
                            <img src={this.props.characters[0].image} alt='most recent character' id='homepageChar'></img>
                            <h2>{this.props.characters[0].name}!</h2>
                        </>
                    :
                    <h3>No characters yet. Click the link below to begin!</h3>
                }
                </div>
                <NavLink to='/characters' id='charBtn'>
                <button>All Characters</button>
                </NavLink>
                <div id="gameBox">
                    game
                </div>
                <NavLink to='/games' id='gamesBtn'>
                <button>All Games</button>
                </NavLink>
                <img src={localStorage.getItem('avatar')} alt='avatar' className='avatar'></img>
                <NavLink to='/profile' id='profieBtn'>
                <button>Full Profile</button>
                </NavLink>
            </div>
        );
    }
}
const mapPropsToState = (state) => {
   return{characters: state.populateCharactersReducer.characters}
}
export default connect(mapPropsToState)(Homepage);
