import React, { Component } from 'react';
import logo from '../logo.png'

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
        postData['user_id'] = localStorage.getItem('userID')
        fetch(`https://dndluxe-backend.herokuapp.com/games`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(response=>response.json())
        .then(json=>{
            localStorage.setItem('game', json)
            this.postUserGame(json)
        })
    }

    postUserGame = (json)=> {
        let postData = {}
        postData['user_id'] = localStorage.getItem('userID')
        postData['game_id'] = json.id
        fetch(`https://dndluxe-backend.herokuapp.com/user_games`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({user_game: postData})
        })
        .then(response => response.json())
        .then(json => {
            if(json.game.id)
            {window.location.href='/games'}
            else
            alert(json.errors)
        })
    }

    render() {
        return (
            <>
                <form className='characterForm' onSubmit={this.postGame}>
                    <label id='gameLabel'>Game details:</label>
                    <label className='g1'>Name:</label>
                    <input type='text' name='groupName' id='groupName' className='allGameInputs' value={this.state.groupName} onChange={this.onChange} placeholder='Group or Campaign Name'></input>
                    <label className='g2'>Meetup location:</label>
                    <input className='allGameInputs' type='text' name='location' id='location' value={this.state.location} onChange={this.onChange} placeholder='location'></input>
                    <label className='g3'>Additional details:</label>
                    <textarea className='allGameInputs' type='textarea' name='details' id='details' value={this.state.details} onChange={this.onChange} placeholder='details'></textarea>
                    <button className='allGameInputs'id='gameSubmit' stype='submit'>Submit</button>
                    <img src={logo} alt="DnDeluxe Logo" className='gameLogo'></img>
                </form>
            </>
        );
    }
}

export default GameForm;
