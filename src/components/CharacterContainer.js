import React, { Component } from 'react';

class CharacterContainer extends Component {
    state = {
        characters: []
    }
    componentDidMount(){
        console.log("check the local storage", localStorage.getItem('userInfo'))
        debugger;
        fetch("http://localhost:3000/users/${}characters")
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
