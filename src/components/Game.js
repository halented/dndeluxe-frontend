import React, { Component } from 'react';
import trash from '../trash_icon.png'
import toaster from 'toasted-notes'

class Game extends Component {

    delete = () => {
        if(window.confirm("Permanently remove this game? This action cannot be reversed."))
        fetch(`https://dndluxe-backend.herokuapp.com/${this.props.game.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=> response.json())
        .then(json => {
            console.log(json)
            if(json.success){
                this.success()
            }
            else {
                toaster.notify("network error. please try again")
            }
        })
    }
    success = () => {
        window.location.href='/games'
    }

    render() {
        return (
            <div className='pageBoxes'>
                <h1 className='topGreetGame'>For this game...</h1>
                <h3 id='rem' onClick={()=>this.delete(this.props.game.id)}>remove</h3>
                <img src={trash} onClick={()=>this.delete(this.props.game.id)} alt='delete button' className='deleteBtn2'></img>
                <p id='gs1' className='oneGameLink'>Saved location: "{this.props.game.game.location}"</p>
                <p id='gs2' className='oneGameLink'>Name: "{this.props.game.game.group_name}"</p>
                <p id='gs3' className='oneGameLink'>Details: "{this.props.game.game.details}"</p>
                <img src="/static/media/logo.6ce4d46c.png" alt="DnDeluxe Logo" className="profLogo"></img>
            </div>
        );
    }
}

export default Game;
