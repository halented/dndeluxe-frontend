import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div className="pageBoxes">
                <h1 id='greeting'>Welcome, {localStorage.getItem('username')}!</h1>
                <div className="gameBox">
                    render most recently visited Game
                    <br/>
                    <NavLink to='/games'>
                    <button>All Games</button>
                    </NavLink>
                </div>
                <img src={localStorage.getItem('avatar')} alt='avatar' className='avatar'></img>
                <NavLink to='/profile' id='profieBtn'>
                <button>Full Profile</button>
                </NavLink>
                <p id='oneLiner'>render most recently visited Character</p>
                <NavLink to='/characters' id='charBtn'>
                <button>All Characters</button>
                </NavLink>
            </div>
        );
    }
}

export default Homepage;
