import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Homepage extends Component {

    render() {
        return (
            <div className="pageBoxes">
                <h1 id='greeting'>Welcome, {localStorage.getItem('username')}!</h1>
                <div id='homeChars'>
                    character
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

export default Homepage;
