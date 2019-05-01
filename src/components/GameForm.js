import React, { Component } from 'react';

class GameForm extends Component {
    state = {
        groupName: '',
        location: '',
        details: ''
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }
    
    postGame = (ev) => {
        ev.preventDefault()
        let postData = {}
        postData['group_name'] = document.getElementById('groupName').value
        postData['location'] = document.getElementById('location').value
        postData['details'] = document.getElementById('details').value
        fetch(`http://localhost:3000/games`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(response=>response.json())
        .then(console.log)
        alert("Game Saved! Navigate to the game's homepage to view.")
    }

    render() {
        return (
            <form className='characterForm' onSubmit={this.postGame}>
                <label id='gameLabel'>Game details:</label>
                <input type='text' name='groupName' id='groupName' className='allGameInputs' value={this.state.groupName} onChange={this.onChange} placeholder='Group or Campaign Name'></input>
                <input className='allGameInputs' type='text' name='location' id='location' value={this.state.location} onChange={this.onChange} placeholder='Meetup Location'></input>
                <textarea className='allGameInputs' type='textarea' name='details' id='details' value={this.state.details} onChange={this.onChange} placeholder='Additional Details'></textarea>
                <button className='allGameInputs'id='gameSubmit' stype='submit'>Submit</button>
            </form>
        );
    }
}

export default GameForm;
