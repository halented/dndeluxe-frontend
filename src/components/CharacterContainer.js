import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CharacterContainer extends Component {
    state = {
        characters: []
    }
    componentDidMount(){
        fetch("http://localhost:3000/characters", 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then(response=>response.json())
        .then(json=> {
            this.setState({characters: json})
        })
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.state.characters.length>0 ?
                <ul id='charBox'>
                {this.state.characters.map(char=> {
                    return (
                    <>
                    <li>{char.name}</li>
                    <img  className='charListItem'alt="character profile pic" src={char.image}></img>
                    </>
                    )
                })}
                </ul>
                :
                <div>No characters yet. Click the button below to make one!</div>
                }
                <NavLink to='/new-character' id='newCharBtn'>
                <button >Make a new Character! =></button>
                </NavLink>
            </div>
        );
    }
}

export default CharacterContainer;
