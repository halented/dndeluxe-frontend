import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CharacterContainer extends Component {
    state = {
        characters: []
    }

    render() {
        return (
            <>
                <div className='pageBoxes'>
                    iterate over characters list
                </div>
                    <NavLink to='/new-character'><button id='newCharBtn'>Make a new Character! =></button>
                    </NavLink>
            </>
        );
    }
}

export default CharacterContainer;
