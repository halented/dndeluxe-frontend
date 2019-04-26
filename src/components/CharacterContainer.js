import React, { Component } from 'react';

class CharacterContainer extends Component {
    state = {
        characters: []
    }
    componentDidMount(){
        fetch("http://localhost:3000/characters")
        .then(response=>response.json())
        .then(console.log)
    }
    render() {
        return (
            <div className='charaContainer'>
                iterate over characters list
            </div>
        );
    }
}

export default CharacterContainer;
