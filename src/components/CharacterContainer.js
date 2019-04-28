import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CharacterContainer extends Component {
    state = {
        characters: []
    }

    render() {
        return (
            <div className='pageBoxes'>
                iterate over characters list
            
                <NavLink to='/new-character' id='newCharBtn'>
                <button >Make a new Character! =></button>
                </NavLink>
            </div>
        );
    }
}

export default CharacterContainer;
